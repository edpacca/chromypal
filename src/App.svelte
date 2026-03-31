<script lang="ts">
    import ColourBlock from "./lib/ColourBlock.svelte";
    import RgbPickerBar from "./lib/RgbPickerBar.svelte";
    import type { RGBAColor } from "./types";

    let activeRValue = $state(255);
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

<main>
    <div>
        <label for="alpha">Alpha</label>
        <input
            id="alpha"
            type="number"
            min="0"
            max="255"
            placeholder="0-255"
            bind:value={activeAValue}
        />
    </div>
    <div class="inputs__container">
        <div class="input__container">
            <label for="red">Red</label>
            <input
                id="red"
                type="number"
                min="0"
                max="255"
                placeholder="0-255"
                bind:value={activeRValue}
            />
            <input type="range" min="0" max="255" bind:value={activeRValue} />
        </div>
        <div class="input__container">
            <label for="green">Green</label>
            <input
                id="green"
                type="number"
                min="0"
                max="255"
                placeholder="0-255"
                bind:value={activeGValue}
            />
            <input type="range" min="0" max="255" bind:value={activeGValue} />
        </div>
        <div class="input__container">
            <label for="blue">Blue</label>
            <input
                id="blue"
                type="number"
                min="0"
                max="255"
                placeholder="0-255"
                bind:value={activeBValue}
            />
            <input type="range" min="0" max="255" bind:value={activeBValue} />
        </div>
    </div>
</main>

<div class="bar__container">
    <RgbPickerBar
        bind:r={activeRGBA.R}
        bind:g={activeRGBA.G}
        bind:b={activeRGBA.B}
    />
</div>

<div class="blocks__container">
    <ColourBlock rgba={activeRGBA} />
</div>

<style>
    .inputs__container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
    }
	.input__container {
		border: 1px solid grey;
		display: flex;
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
    .bar__container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
</style>
