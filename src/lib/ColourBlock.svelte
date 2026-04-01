<script lang="ts">
    import type { RGBAColor } from "../types";
    import { rgbaHexCode, rgbaStr } from "../utils";
    import CopyableText from "./CopyableText.svelte";
    interface Props {
        rgba: RGBAColor;
        deleteBlock?: () => void;
    }
    let { rgba, deleteBlock }: Props = $props();

    let mappedColourValue = $derived(rgbaStr(rgba));
</script>

<div class="block__container">
    <div class="block" style:background-color={mappedColourValue}>
        {#if deleteBlock}
            <button onclick={deleteBlock}>X</button>
        {/if}
        <div class="block__info block__info--blend-mode">
            <CopyableText text={rgbaStr(rgba)} />
            <CopyableText text={rgbaHexCode(rgba)} />
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
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: flex-end;
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

    button {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        color: white;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    button:hover {
        background: rgba(0, 0, 0, 0.6);
        transform: scale(1.1);
    }

    button:active {
        transform: scale(0.95);
    }
</style>
