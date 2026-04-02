<script lang="ts">
    import type { PaletteEntry } from "../types";
    import { rgbaStr } from "../utils";

    interface Props {
        entry: PaletteEntry;
        isActive: boolean;
        onSelect: () => void;
        onDelete?: () => void;
    }

    let { entry, isActive, onSelect, onDelete }: Props = $props();

    let colourValue = $derived(rgbaStr(entry));
</script>

<div class="swatch" class:active={isActive}>
    <div class="swatch__bg"></div>
    <div
        class="swatch__color"
        style:background-color={colourValue}
        onclick={onSelect}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && onSelect()}
    >
        {#if onDelete}
            <button
                class="swatch__delete"
                onclick={(e) => { e.stopPropagation(); onDelete!(); }}
                aria-label="Remove colour"
            >×</button>
        {/if}
    </div>
</div>

<style>
    .swatch {
        position: relative;
        width: var(--swatch-size);
        height: var(--swatch-size);
        border-radius: var(--radius-md);
        flex-shrink: 0;
        overflow: hidden;
        cursor: pointer;
    }

    .swatch.active {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
    }

    .swatch__bg {
        position: absolute;
        inset: 0;
        background: repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 0 0 / 10px 10px;
    }

    .swatch__color {
        position: absolute;
        inset: 0;
        border-radius: var(--radius-md);
    }

    .swatch__delete {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 16px;
        height: 16px;
        border: none;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.45);
        color: white;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        opacity: 0;
        transition: opacity 0.15s ease;
    }

    .swatch:hover .swatch__delete {
        opacity: 1;
    }
</style>
