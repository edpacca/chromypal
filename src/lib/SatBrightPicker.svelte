<script lang="ts">
    import { hsvToRgb } from "../utils";

    interface Props {
        hue: number;
        saturation: number;
        brightness: number;
        onchange: (saturation: number, brightness: number) => void;
    }

    let { hue, saturation, brightness, onchange }: Props = $props();

    // Pure hue color for the gradient background
    let hueRgb = $derived(hsvToRgb(hue, 1, 1));
    let hueColor = $derived(`rgb(${hueRgb[0]}, ${hueRgb[1]}, ${hueRgb[2]})`);

    let boxEl: HTMLDivElement;
    let dragging = false;

    function updateFromPointer(e: PointerEvent) {
        const rect = boxEl.getBoundingClientRect();
        const newS = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newV = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
        onchange(newS, newV);
    }

    function onPointerDown(e: PointerEvent) {
        dragging = true;
        boxEl.setPointerCapture(e.pointerId);
        updateFromPointer(e);
    }

    function onPointerMove(e: PointerEvent) {
        if (dragging) updateFromPointer(e);
    }

    function onPointerUp() {
        dragging = false;
    }
</script>

<div
    class="satbright"
    bind:this={boxEl}
    style:--hue-color={hueColor}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    role="presentation"
>
    <div
        class="dot"
        style:left="{saturation * 100}%"
        style:top="{(1 - brightness) * 100}%"
    ></div>
</div>

<style>
    .satbright {
        width: 100%;
        aspect-ratio: 1;
        position: relative;
        border-radius: var(--radius-md);
        cursor: crosshair;
        touch-action: none;
        background:
            linear-gradient(to bottom, transparent, black),
            linear-gradient(to right, white, var(--hue-color));
    }

    .dot {
        position: absolute;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3);
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
</style>
