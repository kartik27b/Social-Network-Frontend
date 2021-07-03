<template>
    <div class="flex my-4">
        <div v-if="!left" class="flex-1"></div>
        <div class="flex">
            <avatar
                v-if="left"
                src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg"
            ></avatar>
            <div class="bg-green-500 px-3 py-2 inline-block ml-2">
                <h1 class="text">{{ message.message }}</h1>
            </div>
        </div>
        <!-- <div class="flex-1"></div> -->
    </div>
</template>

<script>
import Avatar from "../components/Avatar.vue";
export default {
    name: "message-box",
    components: {
        Avatar,
    },
    props: {
        message: {
            type: Object,
            required: true,
        },

        userId: {
            type: Number,
            required: true,
        },
    },
    data() {
        const isLeft = this.message.creatorId !== this.userId;
        return {
            left: isLeft,
        };
    },
};
</script>

<style></style>
