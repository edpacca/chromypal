import type { RGBAColor } from "./types";

export function rgbaStr (rgba: RGBAColor) {
    return `rgba(${rgba.R ?? 0}, ${rgba.G ?? 0}, ${rgba.B ?? 0}, ${rgba.A ?? 0})`
}
