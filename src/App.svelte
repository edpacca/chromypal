<script lang="ts">
    import AlphaSection from "./lib/AlphaSection.svelte";
    import ColourBlock from "./lib/ColourBlock.svelte";
    import ColourBlocks from "./lib/ColourBlockPalette.svelte";
    import RgbSection from "./lib/RgbSection.svelte";
    import SatBrightPicker from "./lib/SatBrightPicker.svelte";
    import SatBrightSection from "./lib/SatBrightSection.svelte";
    import { hsvToRgb, rgbToHsv } from "./utils";
    import { colourStore } from "./store/colourStore.svelte";

    let hsv = $derived(rgbToHsv(colourStore.activeEntry.R, colourStore.activeEntry.G, colourStore.activeEntry.B));
    let internalHue = $state(rgbToHsv(colourStore.activeEntry.R, colourStore.activeEntry.G, colourStore.activeEntry.B)[0]);

    $effect(() => {
        if (hsv[1] > 0.01) internalHue = hsv[0];
    });

    let saturation = $derived(hsv[1]);
    let brightness = $derived(hsv[2]);

    function onSatBrightChange(s: number, v: number) {
        [colourStore.activeEntry.R, colourStore.activeEntry.G, colourStore.activeEntry.B] = hsvToRgb(internalHue, s, v);
    }

    function onSaturationChange(s: number) {
        [colourStore.activeEntry.R, colourStore.activeEntry.G, colourStore.activeEntry.B] = hsvToRgb(internalHue, s, brightness);
    }

    function onBrightnessChange(v: number) {
        [colourStore.activeEntry.R, colourStore.activeEntry.G, colourStore.activeEntry.B] = hsvToRgb(internalHue, saturation, v);
    }
</script>

<nav>
    <img src="src/assets/icon.png" alt="chromypal logo"/>
    <h1>Chromypal</h1>
</nav>
<main>
    <div class="active-row">
        <div class="active-preview">
            <ColourBlock rgba={colourStore.activeEntry} />
        </div>
        <div class="active-picker">
            <SatBrightPicker
                hue={internalHue}
                saturation={saturation}
                brightness={brightness}
                onchange={onSatBrightChange}
            />
        </div>
    </div>

    <div class="controls">
        <RgbSection bind:r={colourStore.activeEntry.R} bind:g={colourStore.activeEntry.G} bind:b={colourStore.activeEntry.B} />
        <AlphaSection bind:a={colourStore.activeEntry.A} r={colourStore.activeEntry.R} g={colourStore.activeEntry.G} b={colourStore.activeEntry.B} />
        <SatBrightSection
            hue={internalHue}
            saturation={saturation}
            brightness={brightness}
            onsaturationchange={onSaturationChange}
            onbrightnesschange={onBrightnessChange}
        />
    </div>

    <ColourBlocks />
</main>

<style>
    nav {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        gap: var(--space-md);
        padding: var(--space-md) 0;
    }

    nav img {
        max-height: 3em;
    }

    .active-row {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        margin-bottom: var(--space-md);
    }

    .active-preview {
        width: var(--active-swatch-size);
        height: var(--active-swatch-size);
        flex-shrink: 0;
        border-radius: var(--radius-lg);
        overflow: hidden;
    }

    .active-picker {
        flex: 1;
        max-width: var(--active-swatch-size);
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
        margin-bottom: var(--space-md);
    }
</style>
