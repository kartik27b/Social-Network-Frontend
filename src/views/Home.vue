<template>
    <navbar></navbar>
    <div class="w-full h-full flex flex-row justify-between ">
        <div class="flex-1  h-full px-10 py-10 ">
            <div class="mb-2">
                <h1 class="font-medium text-2xl text-white">
                    Online Contacts
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
        <div class="flex-2  h-full px-2  py-10 overflow-y-scroll no-scrollbar">
            <post v-for="item in 10" :key="item"></post>
        </div>
        <div class="flex-1  h-full px-10 py-10">
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
                        <h1 class="font-medium text-gray-600 text-lg pl-3">
                            Name1
                        </h1>
                    </div>

                    <button class="btn">
                        Follow
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "../components/Avatar.vue";
import Navbar from "../components/Navbar.vue";
import Post from "../components/Post.vue";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        Avatar,
        Navbar,
        Post,
    },
};
</script>
