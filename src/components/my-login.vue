<template>
    <div>
        <h1 class="text text-2xl mb-2">Login</h1>
        <hr class="mb-2" />
        <div class="mb-4">
            <label class="text" for="username">
                Username
            </label>
            <input
                class="form-input"
                id="username"
                type="text"
                autocomplete="off"
                v-model="username"
                placeholder="Username"
            />
        </div>
        <div class="mb-6">
            <label class=" text" for="password">
                Password
            </label>
            <input
                class="mb-3 form-input"
                id="password"
                type="password"
                v-model="password"
                placeholder="******************"
            />
            <p class="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
            <b-button :active="true" @click="perfomLogin">Login</b-button>
            <b-button @click="$emit('show-form', 'signup')">Signup</b-button>
        </div>
    </div>
</template>

<script>
import BButton from "./BButton.vue";
export default {
    components: { BButton },
    name: "my-login",
    data() {
        return {
            username: "kartik",
            password: "pass",
        };
    },
    methods: {
        perfomLogin() {
            this.$emit("perform-login", {
                username: this.username,
                password: this.password,
            });
        },
    },
};
</script>

<style></style>
