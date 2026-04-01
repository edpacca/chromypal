<script lang="ts">
    let { text }: { text: string } = $props();
    let copied = $state(false);

    async function copyToClipboard() {
        await navigator.clipboard.writeText(text);
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 1500);
    }
</script>

<button
    onclick={copyToClipboard}
    aria-label="Copy {text} to clipboard"
    type="button"
>
    {copied ? 'Copied!' : text}
</button>

<style>
    button {
        background: none;
        border: none;
        padding: 0;
        margin-bottom: 0.5rem;
        font: inherit;
        color: inherit;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }

    button:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
    }

    button:hover {
        opacity: 0.7;
    }
</style>
