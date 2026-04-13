<script lang="ts"─>
    import { hsvToRgb } from "../utils";
    import RangeSlider from "./RangeSlider.svelte";

    interface Props {
        hue: number;
        saturation: number;
        brightness: number;
        onsaturationchange: (saturation: number) => void;
        onbrightnesschange: (brightness: number) => void;
    }

    let { hue, saturation, brightness, onsaturationchange, onbrightnesschange }: Props = $props();

    let saturationPercent = $derived(Math.round(saturation * 100));
    let brightnessPercent = $derived(Math.round(brightness * 100));

    // Saturation gradient: desaturated to full saturation at current brightness
    let desaturatedRgb = $derived(hsvToRgb(hue, 0, brightness));
    let saturatedRgb = $derived(hsvToRgb(hue, 1, brightness));
    let satGradient = $derived(
        `linear-gradient(90deg, rgb(${desaturatedRgb[0]}, ${desaturatedRgb[1]}, ${desaturatedRgb[2]}), rgb(${saturatedRgb[0]}, ${saturatedRgb[1]}, ${saturatedRgb[2]}))`
    );

    // Brightness gradient: black to full brightness at current saturation
    let brightRgb = $derived(hsvToRgb(hue, saturation, 1));
    let brightGradient = $derived(
        `linear-gradient(90deg, rgb(0, 0, 0), rgb(${brightRgb[0]}, ${brightRgb[1]}, ${brightRgb[2]}))`
    );
</script>

<div class="satbright-section">
    <div class="sat-row">
        <label for="saturation">Saturation</label>
        <input
            id="saturation"
            type="number"
            value={saturationPercent}
            min="0"
            max="100"
            oninput={(e) => onsaturationchange(parseFloat(e.currentTarget.value) / 100)}
        />
        <div class="slider-container">
            <RangeSlider
                value={saturation}
                onchange={onsaturationchange}
                backgroundStyle={`background: ${satGradient}`}
                min={0}
                max={1}
                step="any"
            />
        </div>
    </div>

    <div class="bright-row">
        <label for="brightness">Brightness</label>
        <input
            id="brightness"
            type="number"
            value={brightnessPercent}
            min="0"
            max="100"
            oninput={(e) => onbrightnesschange(parseFloat(e.currentTarget.value) / 100)}
        />
        <div class="slider-container">
            <RangeSlider
                value={brightness}
                onchange={onbrightnesschange}
                backgroundStyle={`background: ${brightGradient}`}
                min={0}
                max={1}
                step="any"
            />
        </div>
    </div>
</div>

<style>
    .satbright-section {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-md);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
    }

    .sat-row,
    .bright-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-md);
    }

    label {
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 80px;
        flex-shrink: 0;
    }

    input[type="number"] {
        width: 50px;
        padding: 4px 8px;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        text-align: center;
        font-size: 0.9rem;
        flex-shrink: 0;
    }

    .slider-container {
        flex: 1;
    }
</style>
