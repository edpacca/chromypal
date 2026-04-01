<script lang="ts">
    import ColourBlocks from "./lib/ColourBlockPalette.svelte";
    import NumRangeInput from "./lib/NumRangeInput.svelte";
    import RgbPickerBar from "./lib/RgbPickerBar.svelte";
    import { activeRGBA, blockData, saveActiveBlock } from "./store/colourStore.svelte";
</script>

<main>
    <div>
        <NumRangeInput label="Alpha" id="alpha" bind:value={activeRGBA.A} />
    </div>
    <div class="inputs__container">
        <NumRangeInput label="Red" id="red" bind:value={activeRGBA.R} />
        <NumRangeInput label="Green" id="green" bind:value={activeRGBA.G} />
        <NumRangeInput label="Blue" id="blue" bind:value={activeRGBA.B} />
    </div>
</main>

<div class="bar__container">
    <RgbPickerBar
        bind:r={activeRGBA.R}
        bind:g={activeRGBA.G}
        bind:b={activeRGBA.B}
    />
</div>

<button onclick={saveActiveBlock}>Save</button>

<ColourBlocks currentBlock={activeRGBA} blockData={blockData}/>

<style>
    .inputs__container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
    }
    .bar__container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
</style>
