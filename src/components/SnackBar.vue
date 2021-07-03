<template>
    <div
        class="fixed w-full z-20 top-0 left-0 flex items-center justify-center"
    >
        <transition name="snack">
            <div
                class=" mt-10 px-5 py-2 flex items-center justify-center rounded-sm shadow-lg text-white text-lg"
                :class="getClass"
                v-if="snack"
            >
                <svg
                    v-if="snack.type === 'success'"
                    class="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <svg
                    v-else
                    class="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <h1 class="ml-2">
                    {{ snack.text }}
                </h1>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "snack-bar",
    computed: {
        ...mapGetters({
            snack: "snack/snack",
        }),
        getClass() {
            let look = "";
            if (this.snack.type === "success") {
                look = "bg-green-400";
            } else if (this.snack.type === "error") {
                look = "bg-red-500";
            }
            return look;
        },
    },
};
</script>

<style>
.snack-enter-active,
.snack-leave-active {
    @apply transition duration-500 ease-in-out;
}

.snack-enter-from {
    @apply transform -translate-y-24;
}

.snack-leave-to {
    @apply transform -translate-y-24;
}
</style>
