<template>
    <!-- {{ posts }} -->
    <post
        :userId="GET_USER_ID"
        v-for="post in posts"
        :key="post.id"
        :post="post"
    ></post>
    <div class="flex items-center justify-center">
        <b-button v-if="hasMore" @click="GET_POSTS" :loading="loading"
            >Load More</b-button
        >
    </div>
</template>

<script>
import Post from "../components/Post.vue";
import BButton from "../components/BButton.vue";
// import { simulateDelay } from "../../extras";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
    name: "posts-section",
    components: {
        Post,
        BButton,
    },
    computed: {
        ...mapState("post/", {
            posts: (state) => state.posts,
            hasMore: (state) => state.hasMore,
            loading: (state) => state.loading,
        }),
        ...mapGetters("auth/", ["GET_USER_ID"]),
    },
    data() {
        // const dummyPosts = Array.apply(null, Array(2)).map((x, i) => i);
        return {
            // posts: dummyPosts,
            loadingPosts: false,
        };
    },
    methods: {
        ...mapActions("post/", {
            GET_POSTS: "GET_POSTS",
        }),
    },
    mounted() {
        // console.log(this.GET_USER_ID);
        // console.log(this.posts);
    },
};
</script>

<style></style>
