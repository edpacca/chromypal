<script lang="ts">
    import { hueToRgb, rgbToHue } from "../utils";
    import RangeSlider from "./RangeSlider.svelte";

    interface Props {
        r: number;
        g: number;
        b: number;
    }

    let {
        r = $bindable(0),
        g = $bindable(0),
        b = $bindable(0),
    }: Props = $props();

    let hueValue = $derived(rgbToHue(r, g, b));

    const deriveRgbValues = (hue: number) => {
        const clamp = Math.max(r, g, b) || 255; // preserve current max; fallback to 255 if all zero
        const derivedRgb = hueToRgb(hue, clamp);
        r = derivedRgb[0];
        g = derivedRgb[1];
        b = derivedRgb[2];
    }

    const backgroundStyle = `background: linear-gradient(
        90deg,
        rgb(255, 0, 0),
        rgb(255, 255, 0),
        rgb(0, 255, 0),
        rgb(0, 255, 255),
        rgb(0, 0, 255),
        rgb(255, 0, 255),
        rgb(255, 0, 0)
    )`;
</script>

<RangeSlider value={hueValue} onchange={deriveRgbValues} {backgroundStyle} min={0} max={1} step="any" />
