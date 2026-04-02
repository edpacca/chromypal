<script lang="ts">
    import AlphaPickerBar from "./lib/AlphaPickerBar.svelte";
    import ColourBlocks from "./lib/ColourBlockPalette.svelte";
    import NumRangeInput from "./lib/NumRangeInput.svelte";
    import RgbPickerBar from "./lib/RgbPickerBar.svelte";
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
    <div>
        <NumRangeInput
            label="Alpha" id="alpha"
            bind:value={activeRGBA.A}
            hasRange={false}
            min={0}
            max={1}
            step={0.01}
            />
    </div>
    <div class="inputs__container">
        <NumRangeInput label="Red" id="red" bind:value={activeRGBA.R} />
        <NumRangeInput label="Green" id="green" bind:value={activeRGBA.G} />
        <NumRangeInput label="Blue" id="blue" bind:value={activeRGBA.B} />
    </div>

    <div class="bar__container">
        <RgbPickerBar
            bind:r={activeRGBA.R}
            bind:g={activeRGBA.G}
            bind:b={activeRGBA.B}
        />
        <AlphaPickerBar
            bind:a={activeRGBA.A}
            r={activeRGBA.R}
            g={activeRGBA.G}
            b={activeRGBA.B}
        />
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
        gap: 1em;
    }

    nav img {
        max-height: 3em;
    }

    .inputs__container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .bar__container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
    }
</style>
