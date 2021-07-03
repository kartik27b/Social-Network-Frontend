<template>
    <div
        class="px-4 py-1 "
        :class="{
            'bg-blue-500 text-white': active,
            'bg-white text-blue-500': !active,
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "messenger-tab",
    props: {
        active: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style></style>
