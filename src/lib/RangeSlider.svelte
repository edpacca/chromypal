<script lang="ts">
    interface Props {
        value: number;
        onchange: (value: number) => void;
        backgroundStyle?: string;
        patternStyle?: string;
        min?: number;
        max?: number;
        step?: number;
    }

    let {
        value,
        onchange,
        backgroundStyle = "background: #d1d5db;",
        patternStyle = "",
        min = 0,
        max = 255,
        step = 1,
    }: Props = $props();
</script>

{#if patternStyle}
    <div class="pattern" style={patternStyle}></div>
{/if}
<div class="slider" style={backgroundStyle}>
    <input
        type="range"
        {min}
        {max}
        {step}
        value={value}
        oninput={e => onchange(parseFloat(e.currentTarget.value))}
    />
</div>

<style>
    .slider {
        width: 100%;
        height: 24px;
        position: relative;
        border-radius: 2px;
    }

    input {
        appearance: none;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;
        position: absolute;
        top: -2px;
    }

    input::-webkit-slider-thumb {
        appearance: none;
        width: 12px;
        height: 28px;
        cursor: pointer;
        border-radius: 2px;
        background: #9a9eaa;
        border: none;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    input::-moz-range-thumb {
        width: 12px;
        height: 28px;
        cursor: pointer;
        border: none;
        background: rgb(255, 255, 255);
        border-radius: 2px;
    }

    input::-webkit-slider-runnable-track {
        background: transparent;
        height: 100%;
        border: none;
    }

    input::-moz-range-track {
        background: transparent;
        border: none;
    }
</style>
