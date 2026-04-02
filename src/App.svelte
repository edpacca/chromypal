<script lang="ts">
    import AlphaSection from "./lib/AlphaSection.svelte";
    import ColourBlocks from "./lib/ColourBlockPalette.svelte";
    import RgbSection from "./lib/RgbSection.svelte";
    import {
        activeRGBA,
        blockData,
        saveActiveBlock,
    } from "./store/colourStore.svelte";
</script>

<nav>
    <img src="src/assets/icon.png" alt="chromypal logo"/>
    <h1>Chromypal</h1>
</nav>
<main>
    <div class="controls">
        <RgbSection bind:r={activeRGBA.R} bind:g={activeRGBA.G} bind:b={activeRGBA.B} />
        <AlphaSection bind:a={activeRGBA.A} r={activeRGBA.R} g={activeRGBA.G} b={activeRGBA.B} />
    </div>

    <button onclick={saveActiveBlock}>Save</button>

    <ColourBlocks currentBlock={activeRGBA} {blockData} />
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

    .controls {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
        margin-bottom: var(--space-md);
    }
</style>
