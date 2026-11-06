import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, resolveTheme } from "../src/settings";

describe("configurações do popup", () => {
  it("usa o estilo padrão em novas instalações", () => {
    expect(DEFAULT_SETTINGS.windowStyle).toBe("standard");
  });

  it("mantém o estilo padrão para configurações antigas", () => {
    const savedSettings = { accentColor: "#ff0000", theme: "dark" as const };
    expect({ ...DEFAULT_SETTINGS, ...savedSettings }.windowStyle).toBe("standard");
  });


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
