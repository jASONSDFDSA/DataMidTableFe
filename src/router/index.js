import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: "/",
        component: () => import("../components/Login/MainLogin.vue")
    },
    {
        path: "/analizer",
        component: () => import("../components/DataAnalysis/MainAnalizer.vue")
    },
    {
        path: "/admin",
        component: () => import("../components/Admin/MainAdmin.vue")
    },
    {
        path: "/developer",
        component: () => import("../components/ProjectDev/MainProjectDev.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router