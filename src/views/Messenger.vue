<template>
    <div class="flex-1 flex flex-row overflow-hidden">
        <div class="flex-1 py-10 overflow-y-scroll no-scrollbar">
            <div class="w-80 mx-auto">
                <div class="mb-2">
                    <h1 class="font-medium text-2xl text-white">Contacts</h1>
                </div>
                <div class="my-4">
                    <input
                        type="text"
                        class="form-input"
                        placeholder="Search"
                        @input="filterConvos"
                    />
                </div>

                <div
                    class="rounded-md overflow-hidden shadow-xl divide-y divide-light-blue-400"
                >
                    <!-- <contact-item
                        v-for="contact in listContacts"
                        :key="contact.id"
                        :id="contact.id"
                        :activeContact="activeContact"
                        :showChat="showChat"
                    ></contact-item> -->
                    <contact-item
                        v-for="convo in LIST_FILTERED_CONVERSATIONS"
                        :key="convo.id"
                        :id="convo.id"
                        :conversation="convo"
                        :activeContact="activeContact"
                        :showChat="showChat"
                        :currId="GET_USER_ID"
                    ></contact-item>
                </div>
            </div>
        </div>
        <div
            class="flex-2 no-scrollbar flex flex-col px-10 py-10 overflow-hidden"
        >
            <div class="flex">
                <messenger-tab :active="!showChat">Chat</messenger-tab>
                <messenger-tab :active="showChat">Video Call</messenger-tab>
            </div>
            <div
                class="bg-white flex-1 flex flex-col overflow-hidden shadow-xl"
            >
                <message-view v-if="showChat" />
                <video-call-view v-else :id="activeContact" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import ContactItem from "../components/ContactItem.vue";
import MessageView from "../components/MessageView.vue";
import MessengerTab from "../components/MessengerTab.vue";
import VideoCallView from "../components/VideoCallView.vue";
// let stream;

export default {
    components: {
        // BButton,
        MessageView,
        VideoCallView,
        ContactItem,
        MessengerTab,
    },
    name: "messenger-view",
    computed: {
        ...mapGetters("auth", ["GET_USER_ID"]),
        ...mapState("messenger", {
            showChat: (state) => state.showChat,
            activeContact: (state) => state.activeContact,
        }),
        ...mapGetters("messenger", [
            "listContacts",
            "LIST_CONVERSATIONS",
            "LIST_FILTERED_CONVERSATIONS",
        ]),
    },
    data() {
        return {};
    },
    methods: {
        ...mapMutations("messenger", ["SET_FILTER"]),
        filterConvos(e) {
            this.SET_FILTER(e.target.value);
            console.log(e.target.value);
        },
        // handleChatsLoaded({ id, chats }) {
        //     const idx = this.contacts.findIndex((contact) => contact.id === id);
        //     this.contacts[idx].chats = [...this.contacts[idx].chats, ...chats];
        //     this.contacts[idx].loaded = true;
        // },
        // setActiveContact(event) {
        //     if (event.type === "msg") {
        //         this.showChat = true;
        //     } else if (event.type === "videoCall") {
        //         this.showChat = false;
        //     }
        //     this.activeContact = event.id;
        // },
        // handleChat() {
        //     if (this.showChat) return;
        //     this.showChat = true;
        //     console.log(stream);
        //     // stream.getTracks().forEach(function(track) {
        //     //     track.stop();
        //     // });
        // },
        // handleVideoCall() {
        //     if (this.showChat === false) return;
        //     this.showChat = false;
        //     this.$nextTick(async () => {});
        // },
    },
    mounted() {},
};
</script>

<style></style>
