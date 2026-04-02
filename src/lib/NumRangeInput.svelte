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
    }

    let {
        label,
        id,
        value = $bindable(),
        min = 0,
        max = 255,
        step = 1,
        hasRange = true
    }: Props = $props();
</script>

<div class="input__container">
    <label for={id}>{label}</label>
    <input
        {id}
        type="number"
        min={min}
        max={max}
        placeholder="0-255"
        bind:value
    />
    {#if hasRange}
        <div class="range_slider__container">
            <RangeSlider {value} onchange={(v) => (value = v)} min={min} max={max} step={step}/>
        </div>
    {/if}
</div>

<style>
    .input__container {
        border: 1px solid rgb(187, 187, 187);
        display: flex;
        flex-direction: column;
        padding: 0.25rem;
    }

    .range_slider__container {
        padding: 0.5rem 0;
    }
</style>
