<template>
    <!-- <div v-if="!callAccepted" class="flex-1 flex items-center justify-center">
        <b-button :loading="calling" @click="callPerson">Call!</b-button>
        {{ id }}
    </div> -->

    <div v-show="true" class="flex-1 flex">
        <video ref="peerVideo" autoplay class="flex-3 object-cover" />

        <div class="flex-1">
            <video ref="myVideo" autoplay class="object-cover" />
            <!-- <input class="form-input" v-model="peerId" /> -->
            <!-- <input placeholder="enter peer id" v-model="peerId" /> -->
            <hr />
            <b-button class="mx-auto mt-4" @click="callPeer">Call</b-button>
            <p v-if="loading">Loading...</p>
            <!-- <p v-else>{{ myId }}</p>
            <div v-if="IS_RECEIVING_CALL">
                <p>Receiving call</p>
                <button @click="acceptCall">Accept call</button>
            </div> -->
        </div>
    </div>
</template>

<script>
import Peer from "peerjs";
import { myWebsocket } from "../sockets";
import { mapGetters, mapMutations } from "vuex";
import BButton from "./BButton.vue";
// import { simulateDelay } from "../../extras";
// import BButton from "../components/BButton.vue";
// let stream;
export default {
    name: "video-call-view",
    components: {
        BButton,
        // BButton,
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapGetters("messenger", [
            "activeContactObject",
            "GET_ACTIVE_CONVO",
            "IS_RECEIVING_CALL",
            "GET_PEER_ID",
        ]),
        ...mapGetters("auth", ["GET_USER"]),
    },
    data() {
        return {
            peer: null,
            myStream: null,
            peerStream: null,
            myId: null,
            peerId: "",
            loading: true,
        };
    },
    watch: {
        // IS_RECEIVING_CALL(value) {
        //     if (value) {
        //         this.actualCall();
        //     }
        // },
        loading(value) {
            if (!value && this.peer) {
                if (this.IS_RECEIVING_CALL) {
                    this.acceptCall();
                }
            }
        },
    },

    // unmounted() {
    // stream.getTracks().forEach(function (track) {
    //     track.stop();
    // });
    // console.log(stream);
    // },
    created() {
        this.init();
    },
    beforeUnmount() {
        this.peer.destroy();
        if (this.myStream) {
            this.myStream.getTracks().forEach((track) => {
                track.stop();
            });
        }

        if (this.peerStream) {
            this.peerStream.getTracks().forEach((track) => {
                track.stop();
            });
        }

        this.CLEAR_CALLING_AND_PEER();

        console.log("destroyed before unmount");
    },
    unmounted() {},
    methods: {
        ...mapMutations("messenger", ["CLEAR_CALLING_AND_PEER"]),
        acceptCall() {
            console.log("actial call working");
            const call = this.peer.call(this.GET_PEER_ID, this.myStream);
            console.log(call);
            call.on("stream", (peerStream) => {
                this.peerStream = peerStream;
                this.$refs.peerVideo.srcObject = peerStream;
            });

            call.on("disconnect", () => {
                console.log("disconnected");
            });
        },
        callPeer() {
            const room = this.GET_ACTIVE_CONVO.conversation_hash;
            myWebsocket.sendMessage(
                JSON.stringify({
                    event: "connectVideoCall",
                    data: {
                        message: this.message,
                        room,
                        peerId: this.myId,
                        callingUsername: this.GET_USER.username,
                    },
                })
            );
        },
        init() {
            navigator.mediaDevices
                .getUserMedia({ audio: false, video: true })
                .then((stream) => {
                    this.myStream = stream;

                    this.$refs.myVideo.srcObject = stream;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.peer = new Peer();
            this.peer.on("open", (id) => {
                this.myId = id;
                this.loading = false;
                console.log("My peer ID is: " + id);
                console.log("open");
            });

            this.peer.on("call", (call) => {
                // Answer the call, providing our mediaStream
                // const peerId = call.peer;
                call.answer(this.myStream);

                call.on("stream", (stream) => {
                    this.$refs.peerVideo.srcObject = stream;
                });
            });

            this.peer.on("error", (err) => {
                console.log(err);
            });

            this.peer.on("disconnect", () => {
                console.log(this.peer.id, " disconnected");
            });
        },
    },
};
</script>

<style></style>
