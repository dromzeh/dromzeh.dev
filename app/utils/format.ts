export type FormatPreset = "raw" | "ms-s";

export function formatValue(value: number, preset: FormatPreset = "raw"): string {
  if (preset === "ms-s") return value >= 1000 ? `${(value / 1000).toFixed(1)} s` : `${value} ms`;
  return String(value);
}
