<template>
    <contact-container>
        <template v-slot:default>
            <avatar
                :src="
                    user.profilePicUrl
                        ? user.profilePicUrl
                        : 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg'
                "
            />
            <h1 class="font-medium text-lg pl-3">{{ user.username }}</h1>
        </template>
        <template v-slot:right>
            <b-button
                @click="followUser"
                :active="following"
                :loading="loading"
            >
                {{ following ? "Following" : "Follow" }}
            </b-button>
        </template>
    </contact-container>
</template>

<script>
import { api } from "../../axios_config";
import Avatar from "../components/Avatar.vue";
// import BButton from "../components/BButton.vue";
import ContactContainer from "../components/ContactContainer.vue";
import BButton from "./BButton.vue";

export default {
    name: "follow-item",
    components: {
        Avatar,
        // BButton,
        ContactContainer,
        BButton,
    },
    props: {
        user: {
            type: Object,
            required: true,
        },
        // conversation: {
        //     type: Object,
        //     required: true,
        // },
        // currId: {
        //     type: Number,
        //     required: true,
        // },
    },
    computed: {
        person() {
            if (this.conversation.user.id === this.currId) {
                return this.conversation.receiver;
            }
            return this.conversation.user;
        },
    },
    data() {
        return {
            loading: false,
            following: false,
        };
    },
    methods: {
        async followUser() {
            this.loading = true;
            // await simulateDelay();
            try {
                await api.get(`/users/follow/${this.user.id}`);
                this.following = true;
            } catch (e) {
                this.snack({ text: "Some Error Occured", type: "error" });
            }

            this.loading = false;
        },
    },
};
</script>

<style></style>
