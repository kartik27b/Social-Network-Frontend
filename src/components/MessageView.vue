<template>
    <div class="flex-1 flex flex-col overflow-y-scroll">
        <div class="flex-1 overflow-y-scroll no-scrollbar px-4 py-4">
            <h1 v-if="!GET_ACTIVE_CONVO">Please Select a Contact</h1>
            <div v-if="GET_ACTIVE_CONVO">
                <message-box
                    v-show="GET_ACTIVE_CONVO"
                    v-for="message in GET_ACTIVE_CONVO.messages"
                    :key="message.id"
                    :message="message"
                    :userId="GET_USER_ID"
                ></message-box>
            </div>
            <div ref="messageBottom" class="mb-3 h-11"></div>
        </div>

        <div v-if="GET_ACTIVE_CONVO" class="px-4 py-4 flex items-stretch">
            <input
                type="text"
                class="form-input mr-3"
                placeholder="Enter Message"
                v-model="message"
            />
            <b-button :active="true" @click="sendMessage">Send</b-button>
        </div>
    </div>
</template>

<script>
import MessageBox from "../components/MessageBox.vue";
import BButton from "../components/BButton.vue";
// import { simulateDelay } from "../../extras";
import { mapGetters, mapState } from "vuex";
import { myWebsocket } from "../sockets";
export default {
    name: "message-view",
    components: {
        MessageBox,
        BButton,
    },
    props: {},
    computed: {
        ...mapState("messenger", {
            activeContact: (state) => state.activeContact,
        }),
        ...mapGetters("messenger", ["activeContactObject", "GET_ACTIVE_CONVO"]),
        ...mapGetters("auth/", ["GET_USER_ID"]),
    },
    watch: {
        GET_ACTIVE_CONVO() {
            this.scrollToBottom();
        },
        activeContact() {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
    },
    data() {
        return {
            message: "",
        };
    },
    created() {},
    mounted() {
        this.scrollToBottom();
    },
    methods: {
        scrollToBottom() {
            const messageBottom = this.$refs.messageBottom;
            if (messageBottom) {
                messageBottom.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        },
        sendMessage() {
            console.log("called");
            const room = this.GET_ACTIVE_CONVO.conversation_hash;
            myWebsocket.sendMessage(
                JSON.stringify({
                    event: "chatMessage",
                    data: {
                        message: this.message,
                        room: room,
                    },
                })
            );

            this.message = "";
            this.scrollToBottom();
        },
    },
};
</script>

<style></style>
