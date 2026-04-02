<script lang="ts">
    import { colourStore } from "../store/colourStore.svelte";
    import PaletteSwatch from "./PaletteSwatch.svelte";
</script>

<div class="strip">
    {#each colourStore.palette as entry (entry.id)}
        <PaletteSwatch
            {entry}
            isActive={entry.id === colourStore.activeEntry.id}
            onSelect={() => colourStore.selectPaletteEntry(entry.id)}
            onDelete={colourStore.palette.length > 1
                ? () => colourStore.removePaletteEntry(entry.id)
                : undefined}
        />
    {/each}
    <button class="add-btn" onclick={() => colourStore.addPaletteEntry()} aria-label="Add colour">+</button>
</div>

<style>
    .strip {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-sm);
        overflow-x: auto;
        padding: var(--space-sm);
    }

    .add-btn {
        width: var(--swatch-size);
        height: var(--swatch-size);
        flex-shrink: 0;
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-md);
        background: none;
        color: var(--color-text-secondary);
        font-size: 1.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.15s ease, color 0.15s ease;
    }

    .add-btn:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
    }
</style>
