import {createRouter, createWebHistory} from 'vue-router'
import {storage} from '../store/storage'

const routes = [
    {
        name: "Login",
        path: "/",
        alias: "/login",
        component: () => import("../components/Login/MainLogin.vue")
    },
    {
        name: "Analyzer",
        path: "/analyzer",
        component: () => import("../components/DataAnalysis/MainAnalyzer.vue")
    },
    {
        name: "Admin",
        path: "/admin",
        component: () => import("../components/Admin/MainAdmin.vue")
    },
    {
        name: "Developer",
        path: "/developer",
        component: () => import("../components/ProjectDev/MainProjectDev.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach(async (to, from) => {
//     if (to.name !== "Login") {
//         const isAuthenticated = storage.get("token") !== null;
//         if (!isAuthenticated) {
//             return {name: "Login"};
//         }
//         const id = storage.get("user").identity;
//         if (to.name !== id) {
//             return {name: id};
//         }
//     } else {
//         if (storage.get("token") !== null) {
//             return {name: storage.get("user").identity};
//         }
//     }
// })

export default router