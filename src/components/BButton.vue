<template>
    <button class="btn" :class="{ 'btn-active': active }">
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
// import EllipsisLoader from "./EllipsisLoader.vue";
// import { CirclesToRhombusesSpinner } from "epic-spinners";
import { HollowDotsSpinner } from "epic-spinners";
// import RingLoader from "./RingLoader.vue";/
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
        // RingLoader,
        // EllipsisLoader,
        // CirclesToRhombusesSpinner,
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
