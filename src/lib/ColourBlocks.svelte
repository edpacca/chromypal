<script lang="ts">
    import type { RGBAColor } from "../types";
    import ColourBlock from "./ColourBlock.svelte";

    interface Props {
        blockData: RGBAColor[];
    }

    let { blockData }: Props = $props();
</script>

<div class="blocks__container">
    {#each blockData as data}
        <ColourBlock rgba={data} />
    {/each}
</div>

<style>
    .blocks__container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 15rem;
        border: 1px solid black;
        padding: 1rem;
    }
</style>
