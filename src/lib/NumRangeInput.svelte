<script lang="ts">
    interface Props {
        label: string;
        id: string;
        value: number;
    }

    let { label, id, value = $bindable() }: Props = $props();
</script>

<div class="input__container">
    <label for={id}>{label}</label>
    <input
        {id}
        type="number"
        min="0"
        max="255"
        placeholder="0-255"
        bind:value
    />
    <input type="range" min="0" max="255" bind:value />
</div>

<style>
    .input__container {
        border: 1px solid grey;
        display: flex;
        flex-direction: column;
    }
</style>
