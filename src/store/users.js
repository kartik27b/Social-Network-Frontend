import { api } from "../../axios_config";

const usersModule = {
    namespaced: true,
    state: {
        usersToFollow: [],
    },
    mutations: {
        SET_USERS_TO_FOLLOW: (state, users) => {
            state.usersToFollow = [...state.usersToFollow, ...users];
        },
    },
    actions: {
        LOAD_USERS_TO_FOLLOW: async ({ commit }) => {
            try {
                const res = await api.get("/users/usersToFollow");
                commit("SET_USERS_TO_FOLLOW", res.data);
            } catch (e) {
                console.log(e);
            }
        },
    },
    getters: {
        GET_USERS_TO_FOLLOW: (state) => {
            return state.usersToFollow;
        },
    },
};

export default usersModule;
