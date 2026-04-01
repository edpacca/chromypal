<script lang="ts">
    import type { RGBAColor } from "../types";
    import { rgbaHexCode, rgbaStr } from "../utils";
    import CopyableText from "./CopyableText.svelte";

    let { rgba }: { rgba: RGBAColor } = $props();

    let mappedColourValue = $derived(rgbaStr(rgba));
</script>

<div class="block__container">
    <div class="block" style:background-color={mappedColourValue}>
        <div class="block__info block__info--blend-mode">
            <CopyableText text={rgbaStr(rgba)}/>
            <CopyableText text={rgbaHexCode(rgba)}/>
        </div>
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
        border-radius: 4px;
    }

    .block__info {
        font-size: 16px;
        font-weight: bold;
        font-family: sans-serif;
        margin: 1em;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .block__info--blend-mode {
        mix-blend-mode: exclusion;
        color: white;
    }
</style>
