<template>
    <div>
        <h1 class="text text-2xl mb-2">Signup</h1>
        <hr class="mb-2" />
        <div class="mb-4">
            <label class="text" for="username">
                Username
            </label>
            <input
                class="form-input"
                id="username"
                type="text"
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
                placeholder="******************"
            />
            <p class="text-red text-xs italic">Please choose a password.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "my-signup",
};
</script>

<style></style>
