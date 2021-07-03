<template>
    <modal-container>
        <div
            class="bg-green-500 h-5 transition-all duration-150"
            :style="{ width: uploadPercentage + '%' }"
        ></div>
        <div class="px-4 py-2">
            <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
            >
                Write a Post
            </h3>
            <div class="my-2">
                <input
                    class="form-input"
                    placeholder="Post Body"
                    v-model="body"
                />
            </div>
            <div class="my-4">
                <input type="radio" id="none" value="none" v-model="typePost" />

                <label for="two" class="ml-2 text">None</label>
                <br />
                <input
                    type="radio"
                    id="photo"
                    value="photo"
                    v-model="typePost"
                />
                <label for="one" class="ml-2 text">Photo</label>
                <br />
                <input
                    type="radio"
                    id="video"
                    value="video"
                    v-model="typePost"
                />
                <label for="two" class="ml-2 text">Video</label>
                <br />
            </div>

            <input
                v-if="typePost !== 'none'"
                class="btn"
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
            />

            <hr class="mt-2" />
            <div class="flex mt-3">
                <b-button :active="true" @click="createPost">Post</b-button>
                <b-button class="ml-3" @click="$emit('close-post-modal')"
                    >Cancel</b-button
                >
            </div>
        </div>
    </modal-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { api } from "../../axios_config";
import BButton from "./BButton.vue";
import ModalContainer from "./ModalContainer.vue";
export default {
    components: { BButton, ModalContainer },
    name: "create-post-modal",
    data() {
        return {
            file: null,
            typePost: "none",
            body: "",
            uploadPercentage: 0,
            creating: false,
        };
    },
    methods: {
        ...mapActions({
            snack: "snack/snack",
        }),
        ...mapMutations({
            addNewPost: "post/ADD_NEW_POST",
        }),
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
        async createPost() {
            this.creating = true;
            console.log("called");
            let formdata = new FormData();
            formdata.append("file", this.file);
            formdata.append("body", this.body);
            formdata.append("type", this.typePost);

            try {
                const res = await api.post("/post", formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        var percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        this.uploadPercentage = percentCompleted;
                        console.log(percentCompleted);
                    },
                });
                this.snack({
                    text: "Post Created Successfully!",
                    type: "success",
                });

                this.addNewPost(res.data);

                this.$emit("close-post-modal");
                // console.log(res);
            } catch (err) {
                this.snack({
                    text: "Post body cannot be empty",
                    type: "error",
                });
                this.uploadPercentage = 0;
                // console.log(err);
            }
            this.creating = false;
        },
    },
};
</script>

<style></style>
