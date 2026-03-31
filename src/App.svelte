<script lang="ts">
    import ColourBlock from "./lib/ColourBlock.svelte";
    import type { RGBAColor } from "./types";

    let activeRValue = $state(0);
    let activeGValue = $state(0);
    let activeBValue = $state(0);
    let activeAValue = $state(255);

    let activeRGBA: RGBAColor = $derived({
        R: activeRValue,
        G: activeGValue,
        B: activeBValue,
        A: activeAValue,
    });
</script>

<div class="inputs__container">
    <input type="number" min=0 max=255 placeholder="0-255" bind:value={activeRValue} />
    <input type="number" min=0 max=255 placeholder="0-255" bind:value={activeGValue} />
    <input type="number" min=0 max=255 placeholder="0-255" bind:value={activeBValue} />
    <input type="number" min=0 max=255 placeholder="0-255" bind:value={activeAValue} />
</div>

<div class="blocks__container">
    <ColourBlock rgba={activeRGBA} />
</div>

<style>
    .inputs__container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
    }
    .blocks__container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 15rem;
		border: 1px solid black;
    }
</style>
