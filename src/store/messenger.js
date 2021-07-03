import { api } from "../../axios_config";

const messengerModule = {
    namespaced: true,
    state: {
        showChat: true,
        activeContact: -1,
        conversations: [],
        receivingCall: false,
        peerId: null,
        socketState: null,
        filter: "",
    },
    mutations: {
        setActiveContact(state, { id, type }) {
            state.activeContact = id;
            if (type === "msg") {
                state.showChat = true;
            } else if (type === "video") {
                state.showChat = false;
            }
        },
        SET_CONVERSATIONS: (state, conversations) => {
            state.conversations = [...conversations];
        },
        APPEND_MESSAGE: (state, data) => {
            // {
            //     id: 5,
            //     creatorId: 5,
            //     conversationHash: '5-6',
            //     createdAt: 2021-06-25T13:29:02.734Z,
            //     message: 'yo'
            //   }

            const { id, creatorId, conversationHash, message } = data;

            const convIdx = state.conversations.findIndex(
                (curr) => curr.conversation_hash === conversationHash
            );
            const messages = state.conversations[convIdx].messages;
            state.conversations[convIdx].messages = [...messages, data];
            console.log("message appended at ", id, creatorId, message);
        },
        SET_RECEIVING_CALL: (state, receivingCall) => {
            state.receivingCall = receivingCall;
        },
        SET_PEER_ID: (state, peerId) => {
            state.peerId = peerId;
        },
        CLEAR_CALLING_AND_PEER: (state) => {
            state.receivingCall = false;
            state.peerId = null;
        },
        SET_SOCKET_STATE: (state, value) => {
            state.socketState = value;
        },
        SET_FILTER: (state, value) => {
            state.filter = value;
        },
        SET_ACTIVE_CONTACT: (state, convo_hash) => {
            const idx = state.conversations.findIndex(
                (convo) => convo.conversation_hash === convo_hash
            );
            state.activeContact = state.conversations[idx].id;
        },
        SET_SHOW_CHAT: (state, show) => {
            state.showChat = show;
        },
    },
    actions: {
        LOAD_CONVERSATIONS: async ({ commit }) => {
            try {
                const res = await api.get("/conversations/all");
                // console.log(res.data);
                commit("SET_CONVERSATIONS", res.data);
            } catch (e) {
                console.log(e);
            }
        },
        RECEIVING_CALL: ({ commit }, peerId) => {
            commit("SET_RECEIVING_CALL", true);
            commit("SET_PEER_ID", peerId);
        },
        SET_ACTIVE_AND_SHOW: ({ commit }, { conversation_hash }) => {
            commit("SET_ACTIVE_CONTACT", conversation_hash);
            commit("SET_SHOW_CHAT", false);
        },
    },
    getters: {
        LIST_CONVERSATIONS: (state) => {
            return state.conversations.map((convo) => {
                const { id, receiver, conversation_hash, user } = convo;
                return { id, receiver, conversation_hash, user };
            });
        },
        LIST_FILTERED_CONVERSATIONS: (state) => {
            const convos = state.conversations.map((convo) => {
                const { id, receiver, conversation_hash, user } = convo;
                return { id, receiver, conversation_hash, user };
            });
            return convos.filter(
                (convo) =>
                    convo.user.username.includes(state.filter) ||
                    convo.receiver.username.includes(state.filter)
            );
        },
        GET_ACTIVE_CONVO: (state) => {
            const convo = state.conversations.find(
                (curr) => curr.id === state.activeContact
            );
            if (!convo) return null;
            const { id, messages, conversation_hash } = convo;
            return {
                id,
                messages,
                conversation_hash,
            };
        },
        GET_CONVO_HASHES: (state) => {
            return state.conversations.map((convo) => convo.conversation_hash);
        },
        IS_RECEIVING_CALL: (state) => {
            return state.receivingCall;
        },
        GET_PEER_ID: (state) => {
            return state.peerId;
        },
        GET_SOCKET_STATE: (state) => {
            return state.socketState;
        },
    },
};

export default messengerModule;
