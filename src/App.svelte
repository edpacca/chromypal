<script lang="ts">
    import ColourBlock from "./lib/ColourBlock.svelte";
    import ColourBlocks from "./lib/ColourBlockPalette.svelte";
    import ColourControls from "./lib/ColourControls.svelte";
    import ColourInfo from "./lib/ColourInfo.svelte";
    import SatBrightPicker from "./lib/SatBrightPicker.svelte";
    import { colourStore } from "./store/colourStore.svelte";
</script>

<main>
    <nav>
        <img src="icon.png" alt="chromypal logo" />
        <h1>Chromypal</h1>
    </nav>
    <div class="active-row">
        <div class="active-preview">
            <ColourBlock rgba={colourStore.activeEntry} />
        </div>
        <div class="active-picker">
            <SatBrightPicker
                hue={colourStore.active.hue}
                saturation={colourStore.active.saturation}
                brightness={colourStore.active.brightness}
                onchange={(s, v) => colourStore.active.setSatBright(s, v)}
            />
        </div>
        <ColourInfo />
    </div>

    <div class="controls">
        <ColourControls />
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
        height: var(--active-swatch-size);
    }

    .active-preview {
        width: var(--active-swatch-size);
        flex-shrink: 0;
        border-radius: var(--radius-lg);
        overflow: hidden;
    }

    .active-picker {
        flex-shrink: 0;
        width: var(--active-swatch-size);
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
        margin-bottom: var(--space-md);
    }
</style>
