import type { RGBAColor } from "../types";

export const activeRGBA: RGBAColor = $state({
    R: 255,
    G: 0,
    B: 0,
    A: 1.0,
});

export const blockData: RGBAColor[] = $state([]);

let nextId = 0;

export const saveActiveBlock = () => {
    blockData.push({ ...activeRGBA, id: nextId++ });
};

export const removeBlock = (id: number) => {
    const idx = blockData.findIndex(b => b.id === id);
    if (idx !== -1) blockData.splice(idx, 1);
};
