<template>
    <img
        :src="src"
        class="w-10 h-10 rounded-full  border-gray-600 border-2"
        alt=""
    />
</template>

<script>
export default {
    name: "avatar",
    props: ["src"],
};
</script>

<style></style>
