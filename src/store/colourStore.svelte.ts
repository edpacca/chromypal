import { hsvToRgb, rgbToHsv, rgbToHsl, rgbaHexCode, rgbaStr } from "../utils";
import type { PaletteEntry } from "../types";

let nextId = 1;

class ActiveColour {
    private _entry = $state<PaletteEntry>({ id: -1, R: 0, G: 0, B: 0, A: 1 });
    private _hue = $state(0);

    load(entry: PaletteEntry) {
        this._entry = entry;
        this._hue = rgbToHsv(entry.R, entry.G, entry.B)[0];
    }

    get R() { return this._entry.R; }
    set R(v: number) {
        this._entry.R = v;
        const [h, s] = rgbToHsv(this._entry.R, this._entry.G, this._entry.B);
        if (s > 0.01) this._hue = h;
    }

    get G() { return this._entry.G; }
    set G(v: number) {
        this._entry.G = v;
        const [h, s] = rgbToHsv(this._entry.R, this._entry.G, this._entry.B);
        if (s > 0.01) this._hue = h;
    }

    get B() { return this._entry.B; }
    set B(v: number) {
        this._entry.B = v;
        const [h, s] = rgbToHsv(this._entry.R, this._entry.G, this._entry.B);
        if (s > 0.01) this._hue = h;
    }
    get A() { return this._entry.A; }
    set A(v: number) { this._entry.A = v; }

    get hue() { return this._hue; }
    set hue(h: number) {
        [this._entry.R, this._entry.G, this._entry.B] = hsvToRgb(h, this.saturation, this.brightness);
        this._hue = h;
    }

    get saturation() { return rgbToHsv(this._entry.R, this._entry.G, this._entry.B)[1]; }
    set saturation(s: number) { this.setSaturation(s); }

    get brightness() { return rgbToHsv(this._entry.R, this._entry.G, this._entry.B)[2]; }
    set brightness(v: number) { this.setBrightness(v); }

    get hexString(): string {
        const toHex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
        return `#${toHex(this._entry.R)}${toHex(this._entry.G)}${toHex(this._entry.B)}`;
    }
    get hexAlphaString(): string {
        return rgbaHexCode(this._entry);
    }
    get rgbString(): string {
        return `rgb(${this._entry.R}, ${this._entry.G}, ${this._entry.B})`;
    }
    get rgbaString(): string {
        return rgbaStr(this._entry);
    }
    get hslString(): string {
        const [h, s, l] = rgbToHsl(this._entry.R, this._entry.G, this._entry.B);
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    get hslaString(): string {
        const [h, s, l] = rgbToHsl(this._entry.R, this._entry.G, this._entry.B);
        return `hsla(${h}, ${s}%, ${l}%, ${this._entry.A})`;
    }
    get hsvString(): string {
        const [h, s, v] = rgbToHsv(this._entry.R, this._entry.G, this._entry.B);
        return `hsv(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
    }

    setRgb(r: number, g: number, b: number) {
        const [h, s] = rgbToHsv(r, g, b);
        if (s > 0.01) this._hue = h;
        this._entry.R = r;
        this._entry.G = g;
        this._entry.B = b;
    }

    setSaturation(s: number) {
        [this._entry.R, this._entry.G, this._entry.B] = hsvToRgb(this._hue, s, this.brightness);
    }

    setBrightness(v: number) {
        [this._entry.R, this._entry.G, this._entry.B] = hsvToRgb(this._hue, this.saturation, v);
    }

    setSatBright(s: number, v: number) {
        [this._entry.R, this._entry.G, this._entry.B] = hsvToRgb(this._hue, s, v);
    }
}

class ColourStore {
    palette: PaletteEntry[] = $state([
        { id: 0, R: 255, G: 0, B: 0, A: 1.0 },
    ]);

    activeIndex: number = $state(0);
    active = new ActiveColour();

    constructor() {
        this.active.load(this.palette[0]);
    }

    get activeEntry(): PaletteEntry {
        return this.palette[this.activeIndex];
    }

    addPaletteEntry() {
        const cur = this.activeEntry;
        this.palette.push({ R: cur.R, G: cur.G, B: cur.B, A: cur.A, id: nextId++ });
        this.activeIndex = this.palette.length - 1;
        this.active.load(this.palette[this.activeIndex]);
    }

    removePaletteEntry(id: number) {
        if (this.palette.length <= 1) return;
        const idx = this.palette.findIndex(e => e.id === id);
        if (idx === -1) return;
        this.palette.splice(idx, 1);
        this.activeIndex = Math.min(this.activeIndex, this.palette.length - 1);
        this.active.load(this.palette[this.activeIndex]);
    }

    selectPaletteEntry(id: number) {
        const idx = this.palette.findIndex(e => e.id === id);
        if (idx !== -1) {
            this.activeIndex = idx;
            this.active.load(this.palette[idx]);
        }
    }
}

export const colourStore = new ColourStore();
