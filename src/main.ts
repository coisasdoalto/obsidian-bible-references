import { MarkdownRenderChild, Plugin, PluginSettingTab, Setting, type App } from "obsidian";
import { mountBibleReferences, type BibleReferencesHandle } from "@coisasdoalto/bible-references";
import "@coisasdoalto/bible-references/style.css";
import { DEFAULT_SETTINGS, resolveTheme, type BibleSettings, type ThemeChoice } from "./settings";

class BibleReferenceChild extends MarkdownRenderChild {
  private handle?: BibleReferencesHandle;

  constructor(element: HTMLElement, private plugin: BibleReferencesPlugin) {
    super(element);
  }

  onload(): void {
    this.plugin.children.add(this);
    this.update();
  }

  update(): void {
    this.handle?.destroy();
    this.containerEl.style.setProperty("--br-accent", this.plugin.settings.accentColor);
    const isDark = this.containerEl.ownerDocument.body.classList.contains("theme-dark");
    const theme = resolveTheme(this.plugin.settings.theme, isDark);
    this.handle = mountBibleReferences(this.containerEl, { theme, container: this.containerEl });
  }

  onunload(): void {
    this.handle?.destroy();
    this.containerEl.style.removeProperty("--br-accent");
    this.plugin.children.delete(this);
  }
}

class BibleSettingsTab extends PluginSettingTab {
  constructor(app: App, private plugin: BibleReferencesPlugin) {
    super(app, plugin);
  }

  display(): void {
    this.containerEl.empty();
    new Setting(this.containerEl)
      .setName("Cor de destaque da janela")
      .addColorPicker((color) => color.setValue(this.plugin.settings.accentColor)
        .onChange(async (value) => this.plugin.updateSettings({ accentColor: value })));
    new Setting(this.containerEl)
      .setName("Tema da janela")
      .addDropdown((dropdown) => dropdown
        .addOption("obsidian", "Acompanhar o Obsidian")
        .addOption("light", "Claro")
        .addOption("dark", "Escuro")
        .setValue(this.plugin.settings.theme)
        .onChange(async (value) => this.plugin.updateSettings({ theme: value as ThemeChoice })));
  }
}

export default class BibleReferencesPlugin extends Plugin {
  settings: BibleSettings = { ...DEFAULT_SETTINGS };
  children = new Set<BibleReferenceChild>();

  async onload(): Promise<void> {
    this.settings = { ...DEFAULT_SETTINGS, ...await this.loadData() };
    this.addSettingTab(new BibleSettingsTab(this.app, this));
    this.registerEvent(this.app.workspace.on("css-change", () => {
      if (this.settings.theme === "obsidian") {
        for (const child of this.children) child.update();
      }
    }));
    this.registerMarkdownPostProcessor((element, context) => {
      context.addChild(new BibleReferenceChild(element, this));
    });
  }

  /** Save settings and refresh rendered notes. Example: await plugin.updateSettings({ accentColor: "#ff0000" }). */
  async updateSettings(changes: Partial<BibleSettings>): Promise<void> {
    Object.assign(this.settings, changes);
    await this.saveData(this.settings);
    for (const child of this.children) child.update();
  }

  onunload(): void {
    for (const child of this.children) child.unload();
  }
}
