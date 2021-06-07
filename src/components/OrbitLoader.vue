<template>
    <orbit-spinner :animation-duration="1200" :size="100" color="black" />
</template>

<script>
import { OrbitSpinner } from "epic-spinners";
export default {
    name: "orbit-loader",
    components: {
        OrbitSpinner,
    },
};
</script>

<style></style>
