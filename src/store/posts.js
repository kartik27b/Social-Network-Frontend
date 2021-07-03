import { api } from "../../axios_config";
// import { simulateDelay } from "../../extras";
// export const GET_POSTS = "GET_POSTS";

const postsModule = {
    namespaced: true,
    state: {
        posts: [],
        pageNumber: 1,
        limit: 10,
        hasMore: true,
        loading: false,
    },
    mutations: {
        SET_POSTS(state, posts) {
            state.posts = [...state.posts, ...posts];
        },
        SET_HAS_MORE(state, hasMore) {
            state.hasMore = hasMore;
        },
        INCREMENT_PAGE_NUMBER(state) {
            state.pageNumber += 1;
        },
        SET_LOADING(state, isloading) {
            state.loading = isloading;
        },
        ADD_NEW_POST(state, post) {
            state.posts = [post, ...state.posts];
        },
    },
    actions: {
        GET_POSTS: async ({ commit, state }) => {
            commit("SET_LOADING", true);
            try {
                const res = await api.get(
                    `/post?limit=${state.limit}&pageNumber=${state.pageNumber}`
                );
                // await simulateDelay();
                if (res.data.length === 0) {
                    commit("SET_HAS_MORE", false);
                } else {
                    commit("SET_POSTS", res.data);
                    commit("INCREMENT_PAGE_NUMBER");
                }

                // console.log(res.data);
            } catch (e) {
                console.log(e);
            }
            commit("SET_LOADING", false);
        },
    },
    getters: {},
};
export default postsModule;
