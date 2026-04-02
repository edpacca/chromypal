import type { RGBAColor } from "./types";

export function rgbaStr (rgba: RGBAColor) {
    return `rgba(${rgba.R ?? 0}, ${rgba.G ?? 0}, ${rgba.B ?? 0}, ${rgba.A ?? 0})`
}

export function rgbaHexCode (rgba: RGBAColor) {
    const toHex = (n: number) => (n ?? 0).toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(rgba.R)}${toHex(rgba.G)}${toHex(rgba.B)}${toHex(Math.round(rgba.A * 255))}`;
}
