import type { PaletteEntry } from "../types";

let nextId = 1;

class ColourStore {
    palette: PaletteEntry[] = $state([
        { id: 0, R: 255, G: 0, B: 0, A: 1.0 },
    ]);

    activeIndex: number = $state(0);

    get activeEntry(): PaletteEntry {
        return this.palette[this.activeIndex];
    }

    addPaletteEntry() {
        this.palette.push({ ...this.activeEntry, id: nextId++ });
        this.activeIndex = this.palette.length - 1;
    }

    removePaletteEntry(id: number) {
        if (this.palette.length <= 1) return;
        const idx = this.palette.findIndex(e => e.id === id);
        if (idx === -1) return;
        this.palette.splice(idx, 1);
        this.activeIndex = Math.min(this.activeIndex, this.palette.length - 1);
    }

    selectPaletteEntry(id: number) {
        const idx = this.palette.findIndex(e => e.id === id);
        if (idx !== -1) this.activeIndex = idx;
    }
}

export const colourStore = new ColourStore();
