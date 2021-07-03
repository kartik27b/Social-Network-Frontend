import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import Messenger from "../views/Messenger.vue";
import Profile from "../views/Profile.vue";
import store from "../store/index";

const routes = [
    {
        path: "/",
        name: "Main",
        component: Main,
        meta: {
            auth: true,
        },
        redirect: { name: "Home" },
        children: [
            {
                name: "Home",
                path: "/home",
                component: Home,
                meta: {
                    auth: true,
                },
            },
            {
                name: "Messenger",
                path: "/messenger",
                component: Messenger,
                meta: {
                    auth: true,
                },
            },
            {
                name: "Profile",
                path: "/profile",
                component: Profile,
                meta: {
                    auth: true,
                },
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },

    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state["auth"].isAuthenticated;

    if (to.meta.auth) {
        if (isAuthenticated) next();
        else next({ name: "Login" });
    } else {
        next();
    }
    // next({name: 'login'});
    // next();
});

export default router;
