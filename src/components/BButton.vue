<template>
    <button class="btn " :class="{ 'btn-active': active }">
        <!-- <ring-loader v-if="loading"></ring-loader> -->
        <hollow-dots-spinner
            :animation-duration="1000"
            :dot-size="15"
            :dots-num="3"
            :color="loaderColor"
            v-if="loading"
        />
        <slot v-else></slot>
    </button>
</template>

<script>
import { HollowDotsSpinner } from "epic-spinners";

export default {
    name: "b-button",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        HollowDotsSpinner,
    },
    computed: {
        loaderColor() {
            return this.active ? "white" : "blue";
        },
    },
};
</script>

<style></style>
