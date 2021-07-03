const callSnackModule = {
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
        },
    },
    getters: {
        snack(state) {
            return state.snack;
        },
    },
};
export default callSnackModule;
