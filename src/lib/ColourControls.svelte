<script lang="ts">
    import { hsvToRgb } from "../utils";
    import { colourStore } from "../store/colourStore.svelte";
    import NumRangeInput from "./NumRangeInput.svelte";

    const active = colourStore.active;

    const hueGradient = `background: linear-gradient(90deg,
        rgb(255, 0, 0),
        rgb(255, 255, 0),
        rgb(0, 255, 0),
        rgb(0, 255, 255),
        rgb(0, 0, 255),
        rgb(255, 0, 255),
        rgb(255, 0, 0)
    )`;

    let redGradient = $derived(
        `background: linear-gradient(90deg, rgb(0, ${active.G}, ${active.B}), rgb(255, ${active.G}, ${active.B}))`
    );
    let greenGradient = $derived(
        `background: linear-gradient(90deg, rgb(${active.R}, 0, ${active.B}), rgb(${active.R}, 255, ${active.B}))`
    );
    let blueGradient = $derived(
        `background: linear-gradient(90deg, rgb(${active.R}, ${active.G}, 0), rgb(${active.R}, ${active.G}, 255))`
    );

    let alphaGradient = $derived(`
        background-color: white;
        background-image: linear-gradient(90deg, rgba(${active.R}, ${active.G}, ${active.B}, 0), rgba(${active.R}, ${active.G}, ${active.B}, 1)),
            repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%);
        background-size: 100% 100%, 16px 16px;
        background-position: 0 0, 0 0;
    `);

    let desaturatedRgb = $derived(hsvToRgb(active.hue, 0, active.brightness));
    let saturatedRgb = $derived(hsvToRgb(active.hue, 1, active.brightness));
    let satGradient = $derived(
        `background: linear-gradient(90deg, rgb(${desaturatedRgb[0]}, ${desaturatedRgb[1]}, ${desaturatedRgb[2]}), rgb(${saturatedRgb[0]}, ${saturatedRgb[1]}, ${saturatedRgb[2]}))`
    );

    let brightRgb = $derived(hsvToRgb(active.hue, active.saturation, 1));
    let brightGradient = $derived(
        `background: linear-gradient(90deg, rgb(0, 0, 0), rgb(${brightRgb[0]}, ${brightRgb[1]}, ${brightRgb[2]}))`
    );
</script>

<div class="colour-controls">
    <NumRangeInput label="Hue" id="hue" bind:value={active.hue} min={0} max={360} step={1} backgroundStyle={hueGradient} />
    <NumRangeInput label="Red" id="red" bind:value={active.R} min={0} max={255} step={1} backgroundStyle={redGradient} />
    <NumRangeInput label="Green" id="green" bind:value={active.G} min={0} max={255} step={1} backgroundStyle={greenGradient} />
    <NumRangeInput label="Blue" id="blue" bind:value={active.B} min={0} max={255} step={1} backgroundStyle={blueGradient} />
    <NumRangeInput label="Saturation" id="saturation" bind:value={active.saturation} min={0} max={1} step={0.01} backgroundStyle={satGradient} />
    <NumRangeInput label="Brightness" id="brightness" bind:value={active.brightness} min={0} max={1} step={0.01} backgroundStyle={brightGradient} />
    <NumRangeInput label="Alpha" id="alpha" bind:value={active.A} min={0} max={1} step={0.01} backgroundStyle={alphaGradient} />
</div>

<style>
    .colour-controls {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-md);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
    }
</style>
