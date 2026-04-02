<script lang="ts">
    import { colourStore } from "../store/colourStore.svelte";
    import type { RGBAColor } from "../types";
    import ColourBlock from "./ColourBlock.svelte";

    interface Props {
        currentBlock: RGBAColor;
        blockData: RGBAColor[];
    }

    let { currentBlock, blockData }: Props = $props();
</script>

<div class="palette__container">
    <div class="palette__active">
        <ColourBlock rgba={currentBlock} deleteBlock={undefined}/>
    </div>
    <div class="palette__saved">
        {#each blockData as data (data.id)}
            <ColourBlock
                rgba={data}
                deleteBlock={() => colourStore.removePaletteEntry(data.id!)}
            />
        {/each}
    </div>
</div>

<style>
    .palette__container {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        height: 15rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-md);
    }

    .palette__active {
        max-width: 15rem;
        aspect-ratio: 1;
        border-right: 2px solid var(--color-border);
        margin: 0 var(--space-sm);
        padding-right: var(--space-sm);
    }

    .palette__saved {
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow-x: auto;
        flex: 1;
    }
</style>
