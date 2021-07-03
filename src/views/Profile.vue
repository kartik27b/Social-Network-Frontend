<template>
    <div class="flex-1 flex items-center justify-center overflow-hidden">
        <div
            class="bg-white shadow-2xl rounded-sm flex flex-col pb-4 items-center justify-center"
        >
            <div
                class="bg-green-500 h-5 transition-all duration-150 mb-4"
                :style="{ width: uploadPercentage + '%' }"
            ></div>

            <avatar
                class="w-44 h-44 mb-4"
                :src="
                    GET_USER.profilePicUrl
                        ? GET_USER.profilePicUrl
                        : 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg'
                "
            />
            <input
                class="btn mb-2"
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
            />
            <b-button @click="changeProfileImage"
                >Change Profile Image</b-button
            >
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { api } from "../../axios_config";
import Avatar from "../components/Avatar.vue";
import BButton from "../components/BButton.vue";
export default {
    components: { Avatar, BButton },
    name: "profile",
    data() {
        return {
            file: null,
            uploadPercentage: 0,
        };
    },
    computed: {
        ...mapGetters("auth", ["GET_USER"]),
    },
    methods: {
        ...mapActions({
            snack: "snack/snack",
        }),
        ...mapMutations("auth", ["SET_USER"]),
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },

        async changeProfileImage() {
            let formdata = new FormData();
            formdata.append("file", this.file);

            try {
                const res = await api.post(
                    "/users/uploadProfilePic",
                    formdata,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (progressEvent) => {
                            var percentCompleted = Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            );
                            this.uploadPercentage = percentCompleted;
                            console.log(percentCompleted);
                        },
                    }
                );

                this.snack({
                    text: "Pic added Successfully!",
                    type: "success",
                });

                this.SET_USER(res.data);
                // this.addNewPost(res.data);

                // this.$emit("close-post-modal");
                // console.log(res);
            } catch (err) {
                this.snack({
                    text: "Post body cannot be empty",
                    type: "error",
                });
                this.uploadPercentage = 0;
                // console.log(err);
            }
        },
    },
};
</script>

<style scoped></style>
