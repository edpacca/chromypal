<script lang="ts">
    import CopyableText from "./CopyableText.svelte";
    import { colourStore } from "../store/colourStore.svelte";

    const active = colourStore.active;

    const rows = $derived([
        { label: "HEX",   value: active.hexString      },
        { label: "HEX A", value: active.hexAlphaString },
        { label: "RGB",   value: active.rgbString       },
        { label: "RGBA",  value: active.rgbaString      },
        { label: "HSL",   value: active.hslString       },
        { label: "HSLA",  value: active.hslaString      },
        { label: "HSV",   value: active.hsvString       },
    ]);
</script>

<table class="colour-info">
    <tbody>
        {#each rows as row}
            <tr>
                <td class="colour-info__label">{row.label}</td>
                <td><CopyableText text={row.value} /></td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    tr {
        border: 1px solid var(--color-border);
    }

    td.colour-info__label {
        padding-left: 0.5rem;
    }

    .colour-info {
        padding: var(--space-sm) var(--space-md);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        width: 100%;
        box-sizing: border-box;
        border-collapse: collapse;
    }

    .colour-info__label {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        color: var(--color-text-secondary);
        text-transform: uppercase;
        white-space: nowrap;
        padding-right: var(--space-sm);
    }

    /* CopyableText has margin-bottom: 0.5rem on its button — zero it out here */
    .colour-info :global(button) {
        margin-bottom: 0;
    }
</style>
