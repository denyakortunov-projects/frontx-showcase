export const themes = [
  {
    id: "fabric",
    name: "Fabric",
    description:
      "Crisp blue, cyan and violet. A clear default for analytical products.",
    colors: ["#3275f3", "#36b9dd", "#7770e8", "#24b69d", "#f1b349", "#d574b4"],
    darkColors: [
      "#82a0ff",
      "#5bd0c7",
      "#ae93ee",
      "#e9b765",
      "#e593ac",
      "#93a6c0",
    ],
  },
  {
    id: "editorial",
    name: "Editorial",
    description:
      "Terracotta, sage and warm neutrals, with serif headings and precise corners.",
    colors: ["#b74d31", "#d9845c", "#b0aa83", "#386959", "#dbb887", "#7d8699"],
    darkColors: [
      "#f7a37d",
      "#d9845c",
      "#b0aa83",
      "#72b298",
      "#dbb887",
      "#9aa6bd",
    ],
  },
  {
    id: "terminal",
    name: "Terminal",
    description:
      "Lime and mint on deep green. Monospace typography, always in dark mode.",
    colors: ["#b6f777", "#50c8a3", "#85a2c2", "#e3ce74", "#c897c2", "#7d9b75"],
    darkColors: [
      "#b6f777",
      "#50c8a3",
      "#85a2c2",
      "#e3ce74",
      "#c897c2",
      "#7d9b75",
    ],
  },
  {
    id: "iris",
    name: "Iris",
    description: "Violet, periwinkle and rose with soft lavender surfaces.",
    colors: ["#7654d9", "#a181ee", "#569cd6", "#db75a8", "#47ad9f", "#e8b65e"],
    darkColors: [
      "#b39aff",
      "#d0b7ff",
      "#7fc1f3",
      "#f296c0",
      "#69d0bf",
      "#f3cb7f",
    ],
  },
  {
    id: "lagoon",
    name: "Lagoon",
    description: "Ocean teal, azure and sea green, balanced by coral and sand.",
    colors: ["#168a93", "#428fdd", "#55bda6", "#eb9276", "#c6aa59", "#827aca"],
    darkColors: [
      "#58c7ca",
      "#83b8f5",
      "#80d7b9",
      "#f4ab90",
      "#e1c87d",
      "#b0a5ec",
    ],
  },
] as const;
export type ThemeName = (typeof themes)[number]["id"];
export function paletteFor(id: string, dark: boolean) {
  const theme = themes.find((t) => t.id === id) || themes[0];
  return dark || id === "terminal" ? theme.darkColors : theme.colors;
}
