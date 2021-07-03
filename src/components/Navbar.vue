<template>
    <div
        class="bg-white w-screen h-14 shadow-2xl px-6 font-medium text-gray-600 flex items-center justify-between"
    >
        <div>
            <h1 v-if="testLogin">Logged in as {{ user.username }}</h1>
        </div>
        <ul class="flex items-center space-x-4">
            <router-link :to="{ name: 'Home' }" class="btn"> Home </router-link>
            <router-link :to="{ name: 'Messenger' }" class="btn">
                Messenger
            </router-link>
        </ul>

        <nav-extras></nav-extras>
    </div>
</template>

<script>
import NavExtras from "./NavExtras.vue";
export default {
    name: "navbar",
    components: {
        NavExtras,
    },
    computed: {
        testLogin() {
            return this.$store.state.auth.isAuthenticated;
        },
        user() {
            return this.$store.state.auth.user;
        },
    },
};
</script>

<style></style>
