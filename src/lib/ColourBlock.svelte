<script lang="ts">
    import type { RGBAColor } from "../types";
    import { rgbaStr } from "../utils";

    let { rgba }: { rgba: RGBAColor } = $props();

    let mappedColourValue = $derived(rgbaStr(rgba));
</script>

<div class="block__container">
    <div class="block" style:background-color={mappedColourValue}>
    </div>
</div>

<style>
    .block__container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .block {
        width: 100%;
        height: 100%;
    }
</style>
