<script lang="ts">
    import RangeSlider from "./RangeSlider.svelte";

    interface Props {
        r?: number;
        g?: number;
        b?: number;
        a?: number;
    }

    let { r = 0, g = 0, b = 0, a = $bindable(1) }: Props = $props();

    const handleAlphaChange = (value: number) => {
        a = value;
    };

    let alphaGradient = $derived(
        `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0), rgba(${r}, ${g}, ${b}, 1))`,
    );

    let backgroundStyle = $derived(`
    background-color: white;
        background-image: ${alphaGradient},
        repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%);
        background-size: 100% 100%, 16px 16px;
        background-position: 0 0, 0 0;
    `);
</script>

<RangeSlider value={a} onchange={handleAlphaChange} {backgroundStyle} min={0} max={1} step={0.01}/>
