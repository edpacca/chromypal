<script lang="ts">
    import RangeSlider from "./RangeSlider.svelte";

    interface Props {
        label: string;
        id: string;
        value: number;
        min?: number;
        max?: number;
        step?: number;
        hasRange?: boolean;
        backgroundStyle?: string;
    }

    let {
        label,
        id,
        value = $bindable(),
        min = 0,
        max = 255,
        step = 1,
        hasRange = true,
        backgroundStyle
    }: Props = $props();
</script>

<div class="input__container">
    <label for={id}>{label}</label>
    <input
        {id}
        type="number"
        min={min}
        max={max}
        bind:value
    />
    {#if hasRange}
        <div class="slider-container">
            <RangeSlider {value} onchange={(v) => (value = v)} min={min} max={max} step={step} {backgroundStyle}/>
        </div>
    {/if}
</div>

<style>
    label {
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 80px;
        flex-shrink: 0;
    }

    input[type="number"] {
        width: 50px;
        padding: 4px 8px;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        text-align: center;
        font-size: 0.9rem;
        flex-shrink: 0;
    }

    .input__container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-md);
    }

    .slider-container {
        flex: 1;
    }
</style>
