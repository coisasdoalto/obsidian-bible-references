import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, resolveTheme } from "../src/settings";

describe("tema do popup", () => {
  it("acompanha o tema do Obsidian por padrão", () => {
    expect(DEFAULT_SETTINGS.theme).toBe("obsidian");
    expect(resolveTheme("obsidian", true)).toBe("dark");
    expect(resolveTheme("obsidian", false)).toBe("light");
  });

  it("respeita a escolha explícita", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});
