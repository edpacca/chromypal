<script lang="ts">
    import { colourStore } from "../store/colourStore.svelte";
    import { rgbaHexCode, rgbaStr } from "../utils";
    import CopyableText from "./CopyableText.svelte";
    import PaletteStrip from "./PaletteStrip.svelte";
</script>

<div class="palette">
    <PaletteStrip />

    <div class="color-list">
        {#each colourStore.palette as entry (entry.id)}
            <div
                class="color-list__row"
                class:active={entry.id === colourStore.activeEntry.id}
                onclick={() => colourStore.selectPaletteEntry(entry.id)}
                role="button"
                tabindex="0"
                onkeydown={(e) => e.key === 'Enter' && colourStore.selectPaletteEntry(entry.id)}
            >
                <div class="color-list__preview">
                    <div class="preview__bg"></div>
                    <div class="preview__color" style:background-color={rgbaStr(entry)}></div>
                </div>
                <div class="color-list__codes">
                    <CopyableText text={rgbaStr(entry)} />
                    <CopyableText text={rgbaHexCode(entry)} />
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .palette {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-md);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
    }

    .color-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .color-list__row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: background 0.1s ease;
    }

    .color-list__row:hover {
        background: var(--color-surface-raised);
    }

    .color-list__row.active {
        background: var(--color-surface-raised);
        outline: 1px solid var(--color-accent);
    }

    .color-list__preview {
        position: relative;
        width: var(--swatch-size-sm);
        height: var(--swatch-size-sm);
        border-radius: var(--radius-md);
        overflow: hidden;
        flex-shrink: 0;
    }

    .preview__bg {
        position: absolute;
        inset: 0;
        background: repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 0 0 / 10px 10px;
    }

    .preview__color {
        position: absolute;
        inset: 0;
    }

    .color-list__codes {
        display: flex;
        flex-direction: column;
        gap: 0;
        font-size: 0.85rem;
        color: var(--color-text-secondary);
    }
</style>
