import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: "/",
        component: () => import("../components/Login/MainLogin.vue")
    },
    {
        path: "/register",
        component: () => import("../components/Login/MainRegister.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router