<template>
    <div
        class="w-full h-16  bg-gradient-to-r from-white to-white text-gray-600   flex items-center justify-between px-4  transition duration-100"
    >
        <div class="flex items-center justify-center">
            <slot> </slot>
        </div>

        <div class="flex space-x-2 items-center justify-center">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
// import Avatar from "../components/Avatar.vue";
// import BButton from "../components/BButton.vue";
export default {
    name: "contact-container",
    components: {
        // Avatar,
        // BButton,
    },
};
</script>

<style></style>
