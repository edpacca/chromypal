import type { RGB, RGBAColor } from "./types";

export function rgbaStr(rgba: RGBAColor) {
    return `rgba(${rgba.R ?? 0}, ${rgba.G ?? 0}, ${rgba.B ?? 0}, ${rgba.A ?? 0})`;
}

export function rgbaHexCode(rgba: RGBAColor) {
    const toHex = (n: number) =>
        (n ?? 0).toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex(rgba.R)}${toHex(rgba.G)}${toHex(rgba.B)}${toHex(Math.round(rgba.A * 255))}`;
}

/** RGB (0–255) → HSV (h: 0–360, s: 0–1, v: 0–1) */
export function rgbToHsv(
    r: number,
    g: number,
    b: number,
): [number, number, number] {
    const rn = r / 255,
        gn = g / 255,
        bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    const v = max;
    const s = max === 0 ? 0 : delta / max;
    let h = 0;
    if (delta !== 0) {
        if (max === rn) h = ((gn - bn) / delta) % 6;
        else if (max === gn) h = (bn - rn) / delta + 2;
        else h = (rn - gn) / delta + 4;
        h = (h * 60 + 360) % 360;
    }
    return [h, s, v];
}

/** RGB (0–255) → HSL (h: 0–360, s: 0–100, l: 0–100) */
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (delta !== 0) {
        if (max === rn)      h = ((gn - bn) / delta) % 6;
        else if (max === gn) h = (bn - rn) / delta + 2;
        else                 h = (rn - gn) / delta + 4;
        h = (h * 60 + 360) % 360;
    }
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

/** HSV (h: 0–360, s: 0–1, v: 0–1) → RGB (0–255) */
export function hsvToRgb(
    h: number,
    s: number,
    v: number,
): RGB {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let rp = 0,
        gp = 0,
        bp = 0;
    switch (Math.floor(h / 60) % 6) {
        case 0:
            rp = c;
            gp = x;
            break; // R→Y
        case 1:
            rp = x;
            gp = c;
            break; // Y→G
        case 2:
            gp = c;
            bp = x;
            break; // G→C
        case 3:
            gp = x;
            bp = c;
            break; // C→B
        case 4:
            rp = x;
            bp = c;
            break; // B→M
        case 5:
            rp = c;
            bp = x;
            break; // M→R
    }
    return [
        Math.round((rp + m) * 255),
        Math.round((gp + m) * 255),
        Math.round((bp + m) * 255),
    ];
}

// Maps RGB → hue position [0, 1) for the gradient bar
export function rgbToHue(r: number = 0, g: number = 0, b: number = 0) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min; // color range; 0 means gray

    if (delta === 0) return 0; // no hue for grays

    // dominant channel sets the 60° sector (0–2, 2–4, 4–6);
    // fractional part interpolates within it
    const offset =
        max === r
            ? (g - b) / delta
            : max === g
              ? 2 + (b - r) / delta
              : 4 + (r - g) / delta;

    // double-mod handles negatives, /6 maps to [0, 1)
    const result = (((offset % 6) + 6) % 6) / 6;
    return result;
}

// Inverse of deriveLinearXValue: hue position → RGB, preserving current max
export function hueToRgb(hue: number, clamp: number): RGB {
    const offset = hue * 6;
    const sector = Math.floor(offset) % 6; // e.g. Red -> Yellow etc
    const frac = offset - Math.floor(offset);

    let r = 0;
    let g = 0;
    let b = 0;

    switch (sector) {
        case 0:
            r = clamp;
            g = Math.round(clamp * frac);
            b = 0;
            break; // R→Y
        case 1:
            g = clamp;
            r = Math.round(clamp * (1 - frac));
            b = 0;
            break; // Y→G
        case 2:
            g = clamp;
            b = Math.round(clamp * frac);
            r = 0;
            break; // G→C
        case 3:
            b = clamp;
            g = Math.round(clamp * (1 - frac));
            r = 0;
            break; // C→B
        case 4:
            b = clamp;
            r = Math.round(clamp * frac);
            g = 0;
            break; // B→M
        case 5:
            r = clamp;
            b = Math.round(clamp * (1 - frac));
            g = 0;
            break; // M→R
    }
    return [r, g, b];
}
