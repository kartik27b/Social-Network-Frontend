<template>
    <modal-container>
        <div
            v-if="loading"
            class="bg-gray-700 flex items-center justify-center"
        >
            <ring-loader />
        </div>
        <div v-else class="px-4 py-2 divide-y-4 ">
            <div v-for="comment in comments" :key="comment.id" class="py-2">
                <div class="flex items-center">
                    <avatar
                        src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg"
                    />
                    <div class="pl-3">
                        <h1 class=" text-lg ">
                            {{ comment.author.username }}
                        </h1>
                    </div>
                </div>
                <h1 class=" text-gray-600 text-left mt-2">
                    {{ comment.body }}
                </h1>
            </div>

            <b-button :active="true" @click="$emit('close-post-modal')"
                >Cancel</b-button
            >
        </div>
    </modal-container>
</template>

<script>
// import { mapActions, mapMutations } from "vuex";
import { api } from "../../axios_config";
import Avatar from "./Avatar.vue";
import BButton from "./BButton.vue";
// import BButton from "./BButton.vue";
import ModalContainer from "./ModalContainer.vue";
import RingLoader from "./RingLoader.vue";
export default {
    components: { ModalContainer, RingLoader, Avatar, BButton },
    name: "show-comments-modal",
    props: {
        postId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            loading: true,
            comments: [],
        };
    },
    methods: {},
    async created() {
        try {
            const res = await api.get(`/comment/${this.postId}`);
            console.log(res.data);
            this.comments = [...this.comments, ...res.data];
            this.loading = false;
        } catch (e) {
            console.log(e);
        }
    },
};
</script>

<style></style>
