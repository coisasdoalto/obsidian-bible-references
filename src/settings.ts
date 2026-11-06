export type ThemeChoice = "obsidian" | "light" | "dark";

export interface BibleSettings {
  accentColor: string;
  theme: ThemeChoice;
}

export const DEFAULT_SETTINGS: BibleSettings = { accentColor: "#2f6f49", theme: "obsidian" };

/** Resolve the tooltip theme from the Obsidian window. Example: resolveTheme("obsidian", true). */
export function resolveTheme(choice: ThemeChoice, isDark: boolean): "light" | "dark" {
  if (choice === "obsidian") return isDark ? "dark" : "light";
  return choice;
}
