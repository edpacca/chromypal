import { describe, it, expect } from "vitest";
import {
    rgbaStr,
    rgbaHexCode,
    rgbToHsv,
    hsvToRgb,
    rgbToHue,
    hueToRgb,
} from "./utils";

describe("rgbaStr", () => {
    it("formats a fully opaque red", () => {
        expect(rgbaStr({ R: 255, G: 0, B: 0, A: 1 })).toBe("rgba(255, 0, 0, 1)");
    });

    it("formats a semi-transparent blue", () => {
        expect(rgbaStr({ R: 0, G: 0, B: 255, A: 0.5 })).toBe(
            "rgba(0, 0, 255, 0.5)",
        );
    });

    it("falls back to 0 for missing channels", () => {
        expect(rgbaStr({ R: undefined as unknown as number, G: undefined as unknown as number, B: undefined as unknown as number, A: undefined as unknown as number })).toBe(
            "rgba(0, 0, 0, 0)",
        );
    });
});

describe("rgbaHexCode", () => {
    it("encodes fully opaque white", () => {
        expect(rgbaHexCode({ R: 255, G: 255, B: 255, A: 1 })).toBe("#FFFFFFFF");
    });

    it("encodes fully transparent black", () => {
        expect(rgbaHexCode({ R: 0, G: 0, B: 0, A: 0 })).toBe("#00000000");
    });

    it("encodes a mid-grey at 50% alpha", () => {
        // Math.round(0.5 * 255) = 128 → 0x80
        expect(rgbaHexCode({ R: 128, G: 128, B: 128, A: 0.5 })).toBe("#80808080");
    });

    it("encodes pure red", () => {
        expect(rgbaHexCode({ R: 255, G: 0, B: 0, A: 1 })).toBe("#FF0000FF");
    });
});

describe("rgbToHsv", () => {
    it("converts pure red", () => {
        const [h, s, v] = rgbToHsv(255, 0, 0);
        expect(h).toBeCloseTo(0);
        expect(s).toBeCloseTo(1);
        expect(v).toBeCloseTo(1);
    });

    it("converts pure green", () => {
        const [h, s, v] = rgbToHsv(0, 255, 0);
        expect(h).toBeCloseTo(120);
        expect(s).toBeCloseTo(1);
        expect(v).toBeCloseTo(1);
    });

    it("converts pure blue", () => {
        const [h, s, v] = rgbToHsv(0, 0, 255);
        expect(h).toBeCloseTo(240);
        expect(s).toBeCloseTo(1);
        expect(v).toBeCloseTo(1);
    });

    it("converts white to saturation 0 and value 1", () => {
        const [h, s, v] = rgbToHsv(255, 255, 255);
        expect(s).toBeCloseTo(0);
        expect(v).toBeCloseTo(1);
    });

    it("converts black to saturation 0 and value 0", () => {
        const [, s, v] = rgbToHsv(0, 0, 0);
        expect(s).toBeCloseTo(0);
        expect(v).toBeCloseTo(0);
    });

    it("converts a mid-grey", () => {
        const [h, s, v] = rgbToHsv(128, 128, 128);
        expect(h).toBeCloseTo(0);
        expect(s).toBeCloseTo(0);
        expect(v).toBeCloseTo(128 / 255);
    });

    it("converts yellow (255, 255, 0)", () => {
        const [h, s, v] = rgbToHsv(255, 255, 0);
        expect(h).toBeCloseTo(60);
        expect(s).toBeCloseTo(1);
        expect(v).toBeCloseTo(1);
    });

    it("converts cyan (0, 255, 255)", () => {
        const [h] = rgbToHsv(0, 255, 255);
        expect(h).toBeCloseTo(180);
    });

    it("converts magenta (255, 0, 255)", () => {
        const [h] = rgbToHsv(255, 0, 255);
        expect(h).toBeCloseTo(300);
    });
});

describe("hsvToRgb", () => {
    it("converts hue 0 (red)", () => {
        expect(hsvToRgb(0, 1, 1)).toEqual([255, 0, 0]);
    });

    it("converts hue 120 (green)", () => {
        expect(hsvToRgb(120, 1, 1)).toEqual([0, 255, 0]);
    });

    it("converts hue 240 (blue)", () => {
        expect(hsvToRgb(240, 1, 1)).toEqual([0, 0, 255]);
    });

    it("converts hue 60 (yellow)", () => {
        expect(hsvToRgb(60, 1, 1)).toEqual([255, 255, 0]);
    });

    it("converts hue 180 (cyan)", () => {
        expect(hsvToRgb(180, 1, 1)).toEqual([0, 255, 255]);
    });

    it("converts hue 300 (magenta)", () => {
        expect(hsvToRgb(300, 1, 1)).toEqual([255, 0, 255]);
    });

    it("produces black at value 0", () => {
        expect(hsvToRgb(0, 1, 0)).toEqual([0, 0, 0]);
    });

    it("produces white at saturation 0 and value 1", () => {
        expect(hsvToRgb(0, 0, 1)).toEqual([255, 255, 255]);
    });

    it("produces a mid-grey at saturation 0, value 0.5", () => {
        const [r, g, b] = hsvToRgb(0, 0, 0.5);
        expect(r).toBe(g);
        expect(g).toBe(b);
        expect(r).toBeCloseTo(128, 0);
    });
});

describe("rgbToHsv / hsvToRgb round-trip", () => {
    const samples: [number, number, number][] = [
        [255, 0, 0],
        [0, 255, 0],
        [0, 0, 255],
        [255, 165, 0],
        [128, 64, 192],
        [10, 200, 50],
    ];

    samples.forEach(([r, g, b]) => {
        it(`round-trips rgb(${r}, ${g}, ${b})`, () => {
            const [h, s, v] = rgbToHsv(r, g, b);
            const result = hsvToRgb(h, s, v);
            expect(result[0]).toBeCloseTo(r, 0);
            expect(result[1]).toBeCloseTo(g, 0);
            expect(result[2]).toBeCloseTo(b, 0);
        });
    });
});

describe("rgbToHue", () => {
    it("returns 0 for grays (no hue)", () => {
        expect(rgbToHue(128, 128, 128)).toBe(0);
        expect(rgbToHue(0, 0, 0)).toBe(0);
        expect(rgbToHue(255, 255, 255)).toBe(0);
    });

    it("returns ~0 for pure red (start of hue wheel)", () => {
        expect(rgbToHue(255, 0, 0)).toBeCloseTo(0);
    });

    it("returns ~1/6 for yellow", () => {
        expect(rgbToHue(255, 255, 0)).toBeCloseTo(1 / 6);
    });

    it("returns ~2/6 for green", () => {
        expect(rgbToHue(0, 255, 0)).toBeCloseTo(2 / 6);
    });

    it("returns ~3/6 for cyan", () => {
        expect(rgbToHue(0, 255, 255)).toBeCloseTo(3 / 6);
    });

    it("returns ~4/6 for blue", () => {
        expect(rgbToHue(0, 0, 255)).toBeCloseTo(4 / 6);
    });

    it("returns ~5/6 for magenta", () => {
        expect(rgbToHue(255, 0, 255)).toBeCloseTo(5 / 6);
    });

    it("defaults missing channels to 0", () => {
        expect(rgbToHue()).toBe(0);
    });

    it("returns a value in [0, 1)", () => {
        const hue = rgbToHue(200, 100, 50);
        expect(hue).toBeGreaterThanOrEqual(0);
        expect(hue).toBeLessThan(1);
    });
});

describe("hueToRgb", () => {
    const MAX = 255;

    it("hue 0 → red", () => {
        expect(hueToRgb(0, MAX)).toEqual([255, 0, 0]);
    });

    it("hue 1/6 → yellow", () => {
        expect(hueToRgb(1 / 6, MAX)).toEqual([255, 255, 0]);
    });

    it("hue 2/6 → green", () => {
        expect(hueToRgb(2 / 6, MAX)).toEqual([0, 255, 0]);
    });

    it("hue 3/6 → cyan", () => {
        expect(hueToRgb(3 / 6, MAX)).toEqual([0, 255, 255]);
    });

    it("hue 4/6 → blue", () => {
        expect(hueToRgb(4 / 6, MAX)).toEqual([0, 0, 255]);
    });

    it("hue 5/6 → magenta", () => {
        expect(hueToRgb(5 / 6, MAX)).toEqual([255, 0, 255]);
    });

    it("scales channels by the clamp value", () => {
        const half = 128;
        const [r, g, b] = hueToRgb(0, half);
        expect(r).toBe(half);
        expect(g).toBe(0);
        expect(b).toBe(0);
    });
});

describe("rgbToHue / hueToRgb round-trip", () => {
    const hues = [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6];

    hues.forEach((hue) => {
        it(`round-trips hue ${hue.toFixed(3)}`, () => {
            const rgb = hueToRgb(hue, 255);
            const result = rgbToHue(...rgb);
            // Endpoint hue 0 is indistinguishable from 1 after a round-trip
            if (hue === 0) {
                expect(result === 0 || Math.abs(result - 1) < 0.01).toBe(true);
            } else {
                expect(result).toBeCloseTo(hue, 5);
            }
        });
    });
});
