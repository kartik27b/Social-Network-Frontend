<template>
    <contact-container>
        <template v-slot:default>
            <avatar
                :src="
                    person.profilePicUrl
                        ? person.profilePicUrl
                        : 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg'
                "
            />
            <h1 class="font-medium text-lg pl-3">
                {{ person.username }}
            </h1>
        </template>
    </contact-container>
</template>

<script>
import Avatar from "../components/Avatar.vue";
// import BButton from "../components/BButton.vue";
import ContactContainer from "../components/ContactContainer.vue";

export default {
    name: "home-contact",
    components: {
        Avatar,
        // BButton,
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
    },
};
</script>

<style></style>
