<script lang="ts">
    import AlphaPickerBar from "./AlphaPickerBar.svelte";
    import NumRangeInput from "./NumRangeInput.svelte";

    interface Props {
        r?: number;
        g?: number;
        b?: number;
        a: number;
    }

    let { r = 0, g = 0, b = 0, a = $bindable(1) }: Props = $props();
</script>

<div class="alpha-section">
    <div class="alpha-input">
        <NumRangeInput label="Alpha" id="alpha" bind:value={a} hasRange={false} min={0} max={1} step={0.01} />
    </div>
    <div class="alpha-bar">
        <AlphaPickerBar bind:a {r} {g} {b} />
    </div>
</div>

<style>
    .alpha-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-md);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
    }

    .alpha-input {
        min-width: 80px;
        flex-shrink: 0;
    }

    .alpha-bar {
        flex: 1;
    }
</style>
