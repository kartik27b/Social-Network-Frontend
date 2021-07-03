const snackModule = {
    namespaced: true,
    state: {
        snack: null,
    },
    // payload is text and type
    mutations: {
        SET_SNACK(state, payload) {
            state.snack = payload;
        },
    },
    actions: {
        snack({ commit }, payload) {
            commit("SET_SNACK", payload);

            setTimeout(() => {
                commit("SET_SNACK", null);
            }, 3000);
        },
    },
    getters: {
        snack(state) {
            return state.snack;
        },
    },
};
export default snackModule;
