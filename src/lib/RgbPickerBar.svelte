<script lang="ts">
    import type { RGBAColor } from "../types";

    interface Props {
        value: RGBAColor;
    }

    let { value = $bindable(), ...props }: Props = $props();
</script>

<div class="bar">
    <input type="range" />
</div>

<style>
    .bar {
        background: linear-gradient(
            90deg,
            rgb(255, 0, 0),
            rgb(255, 255, 0),
            rgb(0, 255, 0),
            rgb(0, 255, 255),
            rgb(0, 0, 255),
            rgb(255, 0, 255),
            rgb(255, 0, 0)
        );
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
        background: rgb(255, 255, 255);
        cursor: pointer;
        border-radius: 2px;
        border: 1px solid black;
    }

    input::-moz-range-thumb {
        width: 12px;
        height: 28px;
        background: rgb(255, 255, 255);
        cursor: pointer;
        border: none;
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
