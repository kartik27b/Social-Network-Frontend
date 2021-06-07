<template>
    <div
        class="bg-white w-full px-4 text-base font-medium   text-gray-700 py-5 shadow-lg rounded-md mb-9 border-b-4 border-blue-700 transition-all duration-150 "
    >
        <div class="flex items-center mb-2">
            <avatar
                src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg"
            ></avatar>
            <div class="pl-3">
                <h1 class=" text-lg ">
                    Name1
                </h1>
                <h1 class=" text-sm text-gray-400 ">
                    45 mins ago
                </h1>
            </div>
        </div>
        <h1 class=" text-gray-600 text-left">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            nulla, obcaecati quis at eos nostrum blanditiis ea deleniti earum.
            Illo exercitationem nostrum numquam tempora omnis cupiditate
            reprehenderit obcaecati facere est?
        </h1>
        <div class="flex mt-4 mb-4">
            <div class="flex-1"></div>
            <div class="flex space-x-2">
                <b-button @click="likePost" :loading="liking" :active="liked">
                    <svg
                        class="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        ></path>
                    </svg>
                    123
                </b-button>

                <button
                    class="btn"
                    @click="showWriteComments = !showWriteComments"
                >
                    <svg
                        class="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        ></path>
                    </svg>
                    234
                </button>
            </div>
        </div>
        <slide-transition>
            <div v-if="showWriteComments" class="bg-white ">
                <hr class="mb-2" />
                <div>
                    <h1 class="text">Comment</h1>
                    <div class="mt-2 flex items-center">
                        <input
                            class="form-input mr-4"
                            type="text"
                            placeholder="Write Comment"
                            autocomplete="off"
                            v-model="comment"
                        />
                        <b-button
                            @click="postComment"
                            active="true"
                            :loading="loading"
                        >
                            Post
                        </b-button>
                    </div>
                </div>
            </div>
        </slide-transition>
    </div>
</template>

<script>
import { simulateDelay } from "../../extras";
import Avatar from "./Avatar.vue";
import BButton from "./BButton.vue";
// import EllipsisLoader from "./EllipsisLoader.vue";
import SlideTransition from "./SlideTransition.vue";

export default {
    components: { Avatar, SlideTransition, BButton },
    name: "post",
    data() {
        return {
            showWriteComments: false,
            loading: false,
            comment: "",
            liking: false,
            liked: false,
        };
    },
    methods: {
        async postComment() {
            // simulateDelay();
            this.loading = true;
            await simulateDelay();
            this.loading = false;
        },
        async likePost() {
            this.liking = true;
            await simulateDelay();
            this.liking = false;
            this.liked = !this.liked;
        },
    },
};
</script>

<style></style>
