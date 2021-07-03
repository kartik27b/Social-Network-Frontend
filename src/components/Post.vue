<template>
    <div
        class="bg-white w-full px-4 text-base font-medium text-gray-700 py-5 shadow-lg rounded-md mb-9 border-b-4 border-blue-700 transition-all duration-150"
    >
        <div class="flex items-center mb-2">
            <avatar
                :src="
                    post.author.profilePicUrl
                        ? post.author.profilePicUrl
                        : 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg'
                "
            />
            <div class="pl-3">
                <h1 class="text-lg">
                    {{ post.author.username }}
                </h1>
                <h1 class="text-sm text-gray-400">
                    {{ post.createdAt }}
                </h1>
            </div>
        </div>
        <h1 class="text-gray-600 text-left mb-2">
            {{ post.body }}
        </h1>
        <div>
            <div v-if="post.photoUrl != null" class="relative">
                <img
                    ref="currPostImg"
                    :lazy-src="post.photoUrl"
                    class="h-72 w-full object-cover transition-opacity duration-1000"
                    :class="{
                        'opacity-0': !imgLoaded,
                    }"
                    @load="imgLoaded = true"
                />
                <fade-transition>
                    <div
                        v-if="!imgLoaded"
                        class="absolute top-0 bg-gray-800 left-0 h-72 w-full flex items-center justify-center"
                    >
                        <ring-loader />
                    </div>
                </fade-transition>
            </div>

            <video
                v-if="post.videoUrl != null"
                controls
                class="h-72 w-full object-cover"
                muted
                disablePictureInPicture
                controlsList="nodownload"
                ref="postVideo"
            >
                <source :src="videoStreamPath" type="video/webm" />

                Sorry, your browser doesn't support embedded videos.
            </video>
        </div>

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
                    {{ likesCount }}
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
                </button>
            </div>
        </div>
        <fade-transition>
            <show-comments-modal
                :postId="post.id"
                v-if="isShowCommentsModalOpen"
                @close-post-modal="isShowCommentsModalOpen = false"
            />
        </fade-transition>
        <slide-transition>
            <div v-if="showWriteComments" class="bg-white">
                <hr class="mb-2" />
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <h1 class="text">Comment</h1>
                        <b-button @click="isShowCommentsModalOpen = true">
                            Show Comments
                        </b-button>
                    </div>

                    <div class="mt-2 flex items-stretch">
                        <input
                            class="form-input mr-4"
                            type="text"
                            placeholder="Write Comment"
                            autocomplete="off"
                            v-model="comment"
                        />
                        <b-button
                            @click="postComment"
                            :active="true"
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
// import { simulateDelay } from "../../extras";
import Avatar from "./Avatar.vue";
import BButton from "./BButton.vue";
import RingLoader from "./RingLoader.vue";
// import ShowCommentsDialog from "./ShowCommentsDialog.vue";
import SlideTransition from "./SlideTransition.vue";
import { api } from "../../axios_config";
import { mapActions } from "vuex";
import ShowCommentsModal from "./ShowCommentsModal.vue";
import FadeTransition from "./FadeTransition.vue";
// TODO: add show comments

export default {
    components: {
        Avatar,
        SlideTransition,
        BButton,
        RingLoader,
        ShowCommentsModal,
        FadeTransition,
        // ShowCommentsDialog,
    },
    name: "post",
    props: {
        post: {
            type: Object,
            required: true,
        },
        userId: {
            type: Number,
            required: true,
        },
    },
    data() {
        const isLiked = this.post.likes.some(
            (like) => like.userId === this.userId
        );
        const count = this.post.likes.length;
        // console.log(isLiked);

        return {
            showWriteComments: false,
            loading: false,
            comment: "",
            liking: false,
            liked: isLiked,
            likesCount: count,
            imgLoaded: false,
            containsVideo: Math.random() > 0.5 ? true : false,
            isShowCommentsModalOpen: false,
            // isShowCommentsModalOpen: false,
        };
    },
    computed: {
        videoStreamPath() {
            if (this.post.videoUrl != null) {
                return "http://localhost:3000/video?path=" + this.post.videoUrl;
            }

            return null;
        },
    },
    mounted() {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const src = entry.target.getAttribute("lazy-src");
                    if (!src) return;

                    entry.target.src = src;
                    observer.unobserve(entry.target);
                }
                // console.log(entry);
            });
        });
        const currPostImg = this.$refs.currPostImg;
        if (currPostImg) {
            imgObserver.observe(currPostImg);
        }
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        });

        const postVideo = this.$refs.postVideo;
        if (postVideo) {
            videoObserver.observe(postVideo);
        }
    },
    methods: {
        ...mapActions({
            snack: "snack/snack",
        }),
        async postComment() {
            // simulateDelay();
            if (this.comment.length === 0) {
                this.snack({ text: "Comment cannot be empty!", type: "error" });
                return;
            }
            this.loading = true;

            try {
                await api.post(`/comment/${this.post.id}`, {
                    body: this.comment,
                });
                this.snack({ text: "Comment posted!", type: "success" });
                this.comment = "";
            } catch (e) {
                this.snack({
                    text: "Some error posting comment",
                    type: "error",
                });
                console.log(e);
            }
            // await simulateDelay();
            this.loading = false;
        },
        async likePost() {
            this.liking = true;
            // await simulateDelay();
            try {
                if (this.liked) {
                    await api.get(`/post/unlike-post/${this.post.id}`);
                    this.liked = !this.liked;
                    this.likesCount -= 1;
                } else {
                    await api.get(`/post/like-post/${this.post.id}`);
                    this.liked = !this.liked;
                    this.likesCount += 1;
                }
            } catch (e) {
                this.snack({ text: "Some Error Occured", type: "error" });
            }

            this.liking = false;
        },
    },
};
</script>

<style>
video::-webkit-media-controls-fullscreen-button {
    display: none;
}
video::-webkit-media-controls-play-button {
}
video::-webkit-media-controls-play-button {
}
video::-webkit-media-controls-timeline {
}
video::-webkit-media-controls-current-time-display {
}
video::-webkit-media-controls-time-remaining-display {
}
video::-webkit-media-controls-time-remaining-display {
}
video::-webkit-media-controls-mute-button {
}
video::-webkit-media-controls-toggle-closed-captions-button {
}
video::-webkit-media-controls-volume-slider {
}
</style>
