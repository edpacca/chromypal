<script lang="ts">
    interface Props {
        r: number;
        g: number;
        b: number;
    }

    // Maps RGB → hue position [0, 1) for the gradient bar
    const deriveHueValue = (
        r: number = 0,
        g: number = 0,
        b: number = 0,
    ) => {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min; // color range; 0 means gray

        if (delta === 0) return 0; // no hue for grays

        // dominant channel sets the 60° sector (0–2, 2–4, 4–6);
        // fractional part interpolates within it
        const offset =
            max === r ? (g - b) / delta :
            max === g ? 2 + (b - r) / delta :
            4 + (r - g) / delta;

        // double-mod handles negatives, /6 maps to [0, 1)
        const result = (((offset % 6) + 6) % 6) / 6;
        return result;
    };

    let {
        r = $bindable(0),
        g = $bindable(0),
        b = $bindable(0),
        ...props
    }: Props = $props();

    let hueValue = $derived(deriveHueValue(r, g, b));

    // Inverse of deriveLinearXValue: hue position → RGB, preserving current max
    const deriveRgbValues = (hueValue: number) => {
        const offset = hueValue * 6;
        const sector = Math.floor(offset) % 6;
        const frac = offset - Math.floor(offset);
        const m = Math.max(r, g, b) || 255; // preserve current max; fallback to 255 if all zero

        switch (sector) {
            case 0: r = m; g = Math.round(m * frac);       b = 0; break; // R→Y
            case 1: g = m; r = Math.round(m * (1 - frac)); b = 0; break; // Y→G
            case 2: g = m; b = Math.round(m * frac);       r = 0; break; // G→C
            case 3: b = m; g = Math.round(m * (1 - frac)); r = 0; break; // C→B
            case 4: b = m; r = Math.round(m * frac);       g = 0; break; // B→M
            case 5: r = m; b = Math.round(m * (1 - frac)); g = 0; break; // M→R
        }
    };
</script>

<div class="bar">
    <input type="range" min="0" max="1" step="0.01"
        bind:value={hueValue}
        oninput={e => deriveRgbValues(parseFloat(e.currentTarget.value))} />
</div>

<style>
    .bar {
        background: linear-gradient(
            90deg,
            rgb(255, 0, 0),
            rgb(255, 255, 0),
            rgb(0, 255, 0),
            rgb(0, 255, 255),
            rgb(0, 0, 255),
            rgb(255, 0, 255),
            rgb(255, 0, 0)
        );
        width: 100%;
        height: 24px;
        position: relative;
        border-radius: 2px;
    }

    input {
        appearance: none;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;
        position: absolute;
        top: -2px;
    }

    input::-webkit-slider-thumb {
        appearance: none;
        width: 12px;
        height: 28px;
        background: rgb(255, 255, 255);
        cursor: pointer;
        border-radius: 2px;
        border: 1px solid black;
    }

    input::-moz-range-thumb {
        width: 12px;
        height: 28px;
        background: rgb(255, 255, 255);
        cursor: pointer;
        border: none;
        border-radius: 2px;
    }

    input::-webkit-slider-runnable-track {
        background: transparent;
        height: 100%;
        border: none;
    }

    input::-moz-range-track {
        background: transparent;
        border: none;
    }
</style>
