<template>
    <div class="relative">
        <button class="focus:outline-none" @click="showMenu = !showMenu">
            <avatar
                :src="
                    GET_USER.profilePicUrl
                        ? GET_USER.profilePicUrl
                        : 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg'
                "
            ></avatar>
        </button>
        <fade-transition>
            <div
                v-if="showMenu"
                class="absolute top-10 right-0 w-56 rounded-md overflow-hidden shadow-xl divide-y divide-light-blue-400"
            >
                <button
                    @click="handleProfile"
                    class="w-full h-12 bg-gradient-to-r hover:from-white hover:to-white hover:text-gray-500 flex items-center px-4 from-blue-400 to-blue-500 text-white transition duration-100"
                >
                    <h1 class="font-medium text-lg pl-3">Profile</h1>
                </button>
                <button
                    @click="handleLogout"
                    class="w-full h-12 bg-gradient-to-r hover:from-white hover:to-white hover:text-gray-500 flex items-center px-4 from-blue-400 to-blue-500 text-white transition duration-100"
                >
                    <h1 class="font-medium text-lg pl-3">Logout</h1>
                </button>
            </div>
        </fade-transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { myWebsocket } from "../sockets";
import Avatar from "./Avatar.vue";
import FadeTransition from "./FadeTransition.vue";
export default {
    name: "nav-extras",
    components: {
        Avatar,
        FadeTransition,
    },
    data() {
        return {
            showMenu: false,
        };
    },
    computed: {
        ...mapGetters("auth", ["GET_USER"]),
    },
    methods: {
        handleProfile() {
            this.showMenu = false;
            this.$router.push({ name: "Profile" });
        },
        handleLogout() {
            myWebsocket.closeConnection();
            this.$store.commit("auth/logout");
            this.$router.push({ name: "Login" });
        },
    },
};
</script>
