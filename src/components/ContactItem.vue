<template>
    <contact-container>
        <template v-slot:default>
            <avatar
                :src="
                    person.profilePicUrl
                        ? person.profilePicUrl
                        : 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg'
                "
            ></avatar>
            <h1 class="font-medium text-lg pl-3">
                {{ person.username }}
            </h1>
        </template>

        <template v-slot:right>
            <b-button @click="handleShowMessage" :active="isChatActive">
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                </svg>
            </b-button>
            <b-button @click="handleShowVideo" :active="isVideoActive">
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                </svg>
            </b-button>
        </template>
    </contact-container>
</template>

<script>
import Avatar from "../components/Avatar.vue";
import BButton from "../components/BButton.vue";
import ContactContainer from "../components/ContactContainer.vue";

export default {
    name: "contact-item",
    components: {
        Avatar,
        BButton,
        ContactContainer,
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        conversation: {
            type: Object,
            required: true,
        },
        showChat: {
            type: Boolean,
            required: true,
        },
        activeContact: {
            type: Number,
            required: true,
        },
        currId: {
            type: Number,
            required: true,
        },
    },
    computed: {
        person() {
            if (this.conversation.user.id === this.currId) {
                return this.conversation.receiver;
            }
            return this.conversation.user;
        },
        isChatActive() {
            return this.showChat && this.id === this.activeContact;
        },
        isVideoActive() {
            return !this.showChat && this.id === this.activeContact;
        },
    },
    methods: {
        handleShowMessage() {
            this.$store.commit("messenger/setActiveContact", {
                id: this.id,
                type: "msg",
            });
            // this.$emit("active-contact", { type: "msg", id: this.id });
        },
        handleShowVideo() {
            this.$store.commit("messenger/setActiveContact", {
                id: this.id,
                type: "video",
            });
            // this.$emit("active-contact", { type: "videoCall", id: this.id });
        },
    },
};
</script>

<style></style>
