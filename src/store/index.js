import { createStore } from "vuex";
import authModule from "./auth";
import messengerModule from "./messenger";
import postsModule from "./posts";
import snackModule from "./snack";
import callSnackModule from "./callSnack";
import usersModule from "./users";

export default createStore({
    state: {},
    mutations: {},
    actions: {
        LOAD_DATA: async ({ dispatch }) => {
            await Promise.all([
                dispatch("post/GET_POSTS"),
                dispatch("messenger/LOAD_CONVERSATIONS"),
                dispatch("users/LOAD_USERS_TO_FOLLOW"),
            ]);
        },
    },
    modules: {
        auth: authModule,
        messenger: messengerModule,
        snack: snackModule,
        post: postsModule,
        callSnack: callSnackModule,
        users: usersModule,
    },
});
