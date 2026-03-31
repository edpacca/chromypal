<script lang="ts">
    interface Props {
        r: number;
        g: number;
        b: number;
    }

    const deriveLinearXValue = (
        r: number = 0,
        g: number = 0,
        b: number = 0,
    ) => {
        const range = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        console.log(min);

        // ignore minimum;
        if (b === min) {
            b = 0;
        } else if (g === min) {
            g = 0;
        } else {
            r = 0;
        }

        r = r / range;
        g = g / range;
        b = b / range;

        let result = 0;

        if (r > 0 && b == 0) {
            if (r == 1) {
                result = g / 6
            }
            if (g == 1) {
                result = (r + 1) / 6
            }
        }
        if (g > 0 && r == 0) {
            if (g == 1) {
                result = (b + 2) / 6
            }
            if (b == 1) {
                result = (g + 3) / 6
            }
        }
        if (b > 0 && g == 0) {
            if (b == 1) {
                result = (r + 4) / 6
            }
            if (r == 1) {
                result = (b + 5) / 6
            }
        }
        return result;
    };

    let {
        r = $bindable(0),
        g = $bindable(0),
        b = $bindable(0),
        ...props
    }: Props = $props();
    let linearValue = $derived(deriveLinearXValue(r, g, b));
</script>

<div class="bar">
    <input type="range" min="0" max="1" step="0.01" bind:value={linearValue} />
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
