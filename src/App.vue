<template>
    <div
        class="w-screen h-screen flex flex-col bg-gradient-to-r from-blue-400 bg-blue-600"
    >
        <snack-bar />
        <call-snack-bar />
        <router-view v-if="!attemptingLogin" />
        <div v-else class="flex-1 items-center justify-center">
            <ring-loader />
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { api } from "../axios_config";
import CallSnackBar from "./components/CallSnackBar.vue";
import RingLoader from "./components/RingLoader.vue";
import SnackBar from "./components/SnackBar.vue";
import {} from "./sockets";
export default {
    name: "app",
    components: {
        SnackBar,
        RingLoader,
        // Navbar,
        CallSnackBar,
    },
    data() {
        return {
            attemptingLogin: false,
        };
    },
    methods: {
        ...mapActions({
            snack: "snack/snack",
        }),
    },
    async created() {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                this.attemptingLogin = true;
                // this.snack({ text: "Logging you in...", type: "success" });
                const res = await api.get("/auth/loggedin", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // await simulateDelay();
                const user = res.data;

                this.$store.commit("auth/setAuthenticated", { token, user });

                await this.$store.dispatch("LOAD_DATA");
                this.loadingData = false;

                this.attemptingLogin = false;
                this.$router.push({ name: "Home" });
            } catch (e) {
                // this.snack({
                //     text: "Some error occured, Please login again!",
                //     type: "error",
                // });
                this.attemptingLogin = false;

                console.log(e);
            }
        }
    },
};
</script>

<style></style>
