import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: "/",
        component: () => import("../views/Login/MainLogin.vue")
    },
    {
        path: "/register",
        component: () => import("../views/Login/MainRegister.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router