<template>
    <div class="w-screen h-screen bg-gray-400 flex flex-col">
        <navbar></navbar>
        <div class="about flex-1 bg-green-200 flex overflow-hidden">
            <div class="flex-1 bg-red-300 py-10 overflow-y-scroll no-scrollbar">
                <div class="w-80 mx-auto">
                    <div class="mb-2">
                        <h1 class="font-medium text-2xl text-white">
                            Contacts
                        </h1>
                    </div>
                    <div
                        class="rounded-md overflow-hidden shadow-xl divide-y divide-light-blue-400"
                    >
                        <div
                            v-for="val in 5"
                            :key="val"
                            class="w-full h-16  bg-gradient-to-r from-white to-white text-gray-600  flex items-center px-4 hover:from-blue-400 hover:to-blue-500 hover:text-white transition duration-100"
                        >
                            <avatar
                                src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg"
                            ></avatar>
                            <h1 class="font-medium  text-lg pl-3">
                                Name1
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-2 bg-red-400 overflow-y-scroll no-scrollbar py-10">
                <div class="w-182 mx-auto">
                    <post v-for="item in 10" :key="item"></post>
                </div>
            </div>
            <div class="flex-1 bg-red-500 py-10 overflow-y-scroll no-scrollbar">
                <div class="w-80 mx-auto">
                    <div class="mb-2">
                        <h1 class="font-medium text-2xl text-white">
                            Who to follow
                        </h1>
                    </div>
                    <div class="rounded-md overflow-hidden shadow-xl">
                        <div
                            v-for="val in 5"
                            :key="val"
                            class="w-full h-16 border-b bg-white flex items-center justify-between px-4"
                        >
                            <div class="flex items-center">
                                <avatar
                                    src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg"
                                ></avatar>
                                <h1
                                    class="font-medium text-gray-600 text-lg pl-3"
                                >
                                    Name1
                                </h1>
                            </div>

                            <b-button>Follow</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Avatar from "../components/Avatar.vue";
import Post from "../components/Post.vue";
export default {
    components: {
        Navbar,
        Avatar,
        Post,
    },
};
</script>

<style></style>
