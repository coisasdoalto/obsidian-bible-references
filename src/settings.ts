export type ThemeChoice = "obsidian" | "light" | "dark";
export type WindowStyle = "standard" | "compact";

export interface BibleSettings {
  accentColor: string;
  theme: ThemeChoice;
  windowStyle: WindowStyle;
}

export const DEFAULT_SETTINGS: BibleSettings = { accentColor: "#2f6f49", theme: "obsidian", windowStyle: "standard" };

/** Resolve the tooltip theme from the Obsidian window. Example: resolveTheme("obsidian", true). */
export function resolveTheme(choice: ThemeChoice, isDark: boolean): "light" | "dark" {
  if (choice === "obsidian") return isDark ? "dark" : "light";
  return choice;
}
