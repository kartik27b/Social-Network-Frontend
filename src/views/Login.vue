<template>
    <div class="w-full h-full flex items-center justify-center">
        <fade-transition>
            <ring-loader v-if="performCall"></ring-loader>

            <div
                v-else
                class="bg-white px-10 py-5 rounded-md shadow-2xl min-w-xl"
            >
                <fade-transition>
                    <component :is="whichForm" />
                </fade-transition>
                <div class="flex items-center justify-between">
                    <button
                        class="btn "
                        :class="{ 'btn-active': onLogin }"
                        type="button"
                        @click="handleFormInput('login')"
                    >
                        Login
                    </button>

                    <button
                        class="btn"
                        :class="{ 'btn-active': !onLogin }"
                        type="button"
                        @click="handleFormInput('signup')"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </fade-transition>
    </div>
</template>

<script>
import OrbitLoader from "../components/OrbitLoader.vue";
// // TODO: add signup
import myLogin from "../components/my-login.vue";
import mySignup from "../components/my-signup.vue";
import FadeTransition from "../components/FadeTransition.vue";
import { simulateDelay } from "../../extras";
import RingLoader from "../components/RingLoader.vue";
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
        async perfomLogin() {
            await simulateDelay();
            this.$router.push({ name: "Home" });
            // this.performCall = false;
        },
        async perfomSignup() {
            await simulateDelay();
            this.$router.push({ name: "Home" });
            // this.performCall = false;
        },
        handleFormInput(val) {
            if (val === "login") {
                if (this.onLogin) {
                    console.log("perfom login ...");
                    this.performCall = true;
                    this.perfomLogin();
                } else {
                    this.onLogin = true;
                }
            } else if (val === "signup") {
                if (!this.onLogin) {
                    console.log("perfom signup ...");
                    this.performCall = true;
                    this.perfomSignup();
                } else {
                    this.onLogin = false;
                }
            }
        },
    },
};
</script>

<style scoped></style>
