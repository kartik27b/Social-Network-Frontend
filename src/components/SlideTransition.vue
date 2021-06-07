<template>
    <transition
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
    >
        <slot></slot>
    </transition>
</template>

<script>
export default {
    name: "slide-transition",
    methods: {
        enter(el) {
            el.style.height = "auto";
            const height = getComputedStyle(el).height;
            el.style.height = 0;

            getComputedStyle(el);

            setTimeout(() => {
                el.style.height = height;
            });
        },
        afterEnter(el) {
            el.style.height = "auto";
        },
        leave(el) {
            el.style.height = getComputedStyle(el).height;
            getComputedStyle(el);
            setTimeout(() => {
                el.style.height = 0;
            });
        },
    },
};
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: height 0.2s ease-in-out;
    overflow: hidden;
}
</style>
