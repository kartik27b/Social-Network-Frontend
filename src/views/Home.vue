<template>
    <ring-loader v-if="loadingData" />
    <div v-else class="about flex-1 flex overflow-hidden">
        <div class="flex-1 py-10 overflow-y-scroll no-scrollbar">
            <div class="w-80 mx-auto">
                <b-button @click="openCreatePostModal = true"
                    >Create Post</b-button
                >
                <!-- <b-button @click="openCallSnack">Open call Snack</b-button> -->
                <fade-transition>
                    <create-post-modal
                        v-if="openCreatePostModal"
                        @close-post-modal="openCreatePostModal = false"
                    />
                </fade-transition>
                <hr class="my-2" />
                <div class="my-2">
                    <h1 class="font-medium text-2xl text-white">Contacts</h1>
                </div>
                <div
                    class="rounded-md overflow-hidden shadow-xl divide-y divide-light-blue-400"
                >
                    <home-contact
                        v-for="convo in LIST_CONVERSATIONS"
                        :key="convo.id"
                        :id="convo.id"
                        :conversation="convo"
                        :currId="GET_USER_ID"
                    />
                </div>
            </div>
        </div>
        <div class="flex-2 overflow-y-scroll no-scrollbar py-10">
            <div class="w-182 mx-auto">
                <posts-section />
            </div>
        </div>
        <div class="flex-1 py-10 overflow-y-scroll no-scrollbar">
            <div class="w-80 mx-auto">
                <div class="mb-2">
                    <h1 class="font-medium text-2xl text-white">
                        Who to follow
                    </h1>
                </div>
                <div class="rounded-md overflow-hidden shadow-xl">
                    <follow-item
                        v-for="user in GET_USERS_TO_FOLLOW"
                        :key="user.id"
                        :user="user"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BButton from "../components/BButton.vue";
import CreatePostModal from "../components/CreatePostModal.vue";
import FadeTransition from "../components/FadeTransition.vue";
import FollowItem from "../components/FollowItem.vue";
import HomeContact from "../components/HomeContact.vue";

import PostsSection from "../components/PostsSection.vue";
import RingLoader from "../components/RingLoader.vue";
// import { myWebsocket } from "../sockets";
export default {
    name: "home",
    components: {
        // Avatar,
        PostsSection,
        FollowItem,
        BButton,
        CreatePostModal,
        FadeTransition,
        RingLoader,
        HomeContact,
    },
    computed: {
        ...mapGetters("auth", ["GET_USER_ID"]),
        // ...mapGetters("messenger", ["GET_CONVO_HASHES"]),
        ...mapGetters("messenger", [
            "GET_SOCKET_STATE",
            "GET_CONVO_HASHES",
            "LIST_CONVERSATIONS",
        ]),
        ...mapGetters("users", ["GET_USERS_TO_FOLLOW"]),
    },
    data() {
        return {
            openCreatePostModal: false,
            loadingData: false,
        };
    },
    watch: {
        // GET_SOCKET_STATE(value) {
        //     if (value === WebSocket.OPEN) {
        //         myWebsocket.sendMessage(
        //             JSON.stringify({
        //                 event: "joinAndLeave",
        //                 data: {
        //                     userId: Number(this.GET_USER_ID),
        //                     message: "Hello",
        //                     meta: "join",
        //                     room: "#12",
        //                     rooms: [...this.GET_CONVO_HASHES],
        //                 },
        //             })
        //         );
        //     }
        // },
    },
    methods: {
        ...mapActions({
            snack: "callSnack/snack",
        }),
        openCallSnack() {
            this.snack("Call snack");
        },
    },
    created() {
        // myWebsocket.connect();
        // const convoHashes = this.$store.getters["messenger/GET_CONVO_HASHES"];
        // const userId = this.$store.getters["auth/GET_USER_ID"];
        // const join = JSON.stringify({
        //     event: "joinAndLeave",
        //     data: {
        //         userId: Number(userId),
        //         message: "Hello",
        //         meta: "join",
        //         room: "#12",
        //         rooms: [...convoHashes],
        //     },
        // });
        // myWebsocket.sendMessage(join);
        // this.$store.dispatch("LOAD_DATA").then(() => {
        //     this.loadingData = false;
        //     console.log("it workds");
        //     const convoHashes = this.$store.getters[
        //         "messenger/GET_CONVO_HASHES"
        //     ];
        //     const userId = this.$store.getters["auth/GET_USER_ID"];
        //     chatSocket.send(
        //         JSON.stringify({
        //             event: "joinAndLeave",
        //             data: {
        //                 userId: Number(userId),
        //                 message: "Hello",
        //                 meta: "join",
        //                 room: "#12",
        //                 rooms: [...convoHashes],
        //             },
        //         })
        //     );
        //     console.log(convoHashes, userId);
        // });
        // this.$store.dispatch("LOAD_DATA").then(() => {
        //     console.log(this.GET_USER_ID, this.GET_CONVO_HASHES);
        //     //    chatSocket.send(
        //     //        JSON.stringify({
        //     //       event: 'joinAndLeave',
        //     //       data: {
        //     //         userId: Number(userId),
        //     //         message: 'Hello',
        //     //         meta: 'join',
        //     //         room: '#12',
        //     //         rooms: [roomId],
        //     //       },
        //     //     }),
        //     //    )
        // });
        // this.$store.dispatch("post/GET_POSTS");
    },
};
</script>

<style></style>
