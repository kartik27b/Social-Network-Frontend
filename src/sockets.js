import store from "./store/index";

class MyWebsocket {
    constructor() {
        this.socket = null;
    }

    connect() {
        this.socket = new WebSocket("ws://localhost:8080");
        this.socket.onopen = () => {
            console.log("Connected");
            store.commit("messenger/SET_SOCKET_STATE", WebSocket.OPEN);
            this.socket.onmessage = (props) => this.handleMessage(props);
            this.socket.onclose = () => {
                console.log("chatSocket closed");
            };

            this.socket.onerror = () => {
                console.log("error with chatSocket");
            };
        };
    }

    closeConnection() {
        if (this.socket) {
            this.socket.close();
        }
    }

    handleMessage({ data }) {
        const cleanedData = JSON.parse(data);
        const type = cleanedData.type;
        const msgData = cleanedData.data;

        if (type === "chatMessage") {
            store.commit("messenger/APPEND_MESSAGE", msgData);
        } else if (type === "connectCall") {
            const { userId } = msgData;
            const loggedInUserId = store.getters["auth/GET_USER_ID"];
            if (Number(userId) === loggedInUserId) {
                console.log("same received");
            } else {
                console.log(msgData);
                store.dispatch("messenger/RECEIVING_CALL", msgData.peerId);
                store.dispatch("callSnack/snack", msgData);
            }
        }
        console.log(cleanedData);
    }

    sendMessage(msg) {
        this.socket.send(msg);
    }
}

const myWebsocket = new MyWebsocket();
export { myWebsocket };
