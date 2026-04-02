<script lang="ts">
    import NumRangeInput from "./NumRangeInput.svelte";
    import RgbPickerBar from "./RgbPickerBar.svelte";

    interface Props {
        r: number;
        g: number;
        b: number;
    }

    let { r = $bindable(0), g = $bindable(0), b = $bindable(0) }: Props = $props();
</script>

<div class="rgb-section">
    <div class="rgb-inputs">
        <NumRangeInput label="Red" id="red" bind:value={r} />
        <NumRangeInput label="Green" id="green" bind:value={g} />
        <NumRangeInput label="Blue" id="blue" bind:value={b} />
    </div>
    <div class="rgb-bar">
        <RgbPickerBar bind:r bind:g bind:b />
    </div>
</div>

<style>
    .rgb-section {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
        padding: var(--space-md);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
    }

    .rgb-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 0;
    }

    .rgb-bar {
        width: 100%;
        box-sizing: border-box;
    }
</style>
