import type { RGBAColor } from "../types";

export const activeRGBA: RGBAColor = $state({
    R: 255,
    G: 0,
    B: 0,
    A: 255,
});

export const blockData: RGBAColor[] = $state([]);

export const saveActiveBlock = () => {
    blockData.push({ ...activeRGBA });
};
