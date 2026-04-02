<script lang="ts">
    import type { RGBAColor } from "../types";
    import { rgbaStr } from "../utils";

    interface Props {
        rgba: RGBAColor;
    }

    let { rgba }: Props = $props();

    let colourValue = $derived(rgbaStr(rgba));
</script>

<div class="block__container">
    <div class="transparent-background"></div>
    <div class="block" style:background-color={colourValue}></div>
</div>

<style>
    .block__container {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: var(--radius-md);
        overflow: hidden;
    }

    .transparent-background {
        height: 100%;
        width: 100%;
        position: absolute;
        background: repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 0 0 / 16px 16px;
    }

    .block {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: var(--radius-md);
    }
</style>
