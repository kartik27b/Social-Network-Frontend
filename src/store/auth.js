import { api } from "../../axios_config";

const authModule = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        user: null,
    },
    mutations: {
        setAuthenticated(state, { token, user }) {
            localStorage.setItem("access_token", token);
            api.defaults.headers.common["Authorization"] = "Bearer " + token;
            state.isAuthenticated = true;
            state.user = user;
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem("access_token");
            api.defaults.headers.common["Authorization"] = null;
        },

        SET_USER: (state, user) => {
            state.user = user;
        },
    },
    actions: {},
    getters: {
        GET_USER_ID(state) {
            return state.user.id;
        },
        GET_USER(state) {
            return state.user;
        },
    },
};
export default authModule;
