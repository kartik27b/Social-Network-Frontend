<template>
    <div class="w-full h-full flex items-center justify-center">
        <fade-transition>
            <ring-loader v-if="performCall" />

            <div
                v-else
                class="bg-white px-10 py-5 rounded-md shadow-2xl min-w-xl"
            >
                <fade-transition>
                    <component
                        :is="whichForm"
                        @show-form="handleShowForm"
                        @perform-signup="perfomSignup"
                        @perform-login="perfomLogin"
                    />
                </fade-transition>
                <!-- <button @click="doSomething">Show snack</button> -->
            </div>
        </fade-transition>
    </div>
</template>

<script>
import OrbitLoader from "../components/OrbitLoader.vue";
import myLogin from "../components/my-login.vue";
import mySignup from "../components/my-signup.vue";
import FadeTransition from "../components/FadeTransition.vue";
import { simulateDelay } from "../../extras";
import RingLoader from "../components/RingLoader.vue";

import { api } from "../../axios_config";
import { mapActions } from "vuex";

export default {
    components: {
        myLogin,
        mySignup,
        OrbitLoader,
        FadeTransition,
        RingLoader,
    },
    name: "login",
    computed: {
        whichForm() {
            return this.onLogin ? "my-login" : "my-signup";
        },
    },
    data() {
        return {
            onLogin: true,
            performCall: false,
        };
    },
    methods: {
        ...mapActions({
            snack: "snack/snack",
        }),
        doSomething() {
            this.snack({ text: "this is a snack", type: "success" });
        },
        handleShowForm(event) {
            if (event === "login") {
                this.onLogin = true;
            } else if (event === "signup") {
                this.onLogin = false;
            }
            console.log("show", event);
        },
        async perfomLogin({ username, password }) {
            this.performCall = true;
            try {
                const res = await api.post("/auth/login", {
                    username,
                    password,
                });
                console.log(res.data);
                this.$store.commit("auth/setAuthenticated", {
                    token: res.data.access_token,
                    user: res.data.user,
                });
                await this.$store.dispatch("LOAD_DATA");
                this.loadingData = false;
                console.log("it workds");

                this.$router.push({ name: "Home" });
            } catch (e) {
                this.snack({
                    text: "Incorrect username or password",
                    type: "error",
                });
                console.log(e);
            }

            await simulateDelay();

            this.performCall = false;
        },
        async perfomSignup({ username, password }) {
            this.performCall = true;
            try {
                const res = await api.post("/users", {
                    username,
                    password,
                });
                console.log(res.data);
                this.snack({
                    text: "User Created Successfully",
                    type: "success",
                });
                this.onLogin = true;
                // this.$router.push({ name: "Login" });
            } catch (e) {
                this.snack({
                    text: "Something went wrong",
                    type: "error",
                });
                console.log(e);
            }

            await simulateDelay();

            this.performCall = false;
        },
    },
};
</script>

<style scoped></style>
