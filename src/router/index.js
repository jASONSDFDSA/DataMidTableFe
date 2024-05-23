import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name: "Login",
        path: "/",
        alias: "/login",
        component: () => import("../components/Login/MainLogin.vue")
    },
    {
        name: "Analyzer",
        path: "/analyzer/:username",
        component: () => import("../components/DataAnalysis/MainAnalyzer.vue"),
        children: [
            {
                name: "Message",
                path: "message",
                alias: "",
                component: () => import("../components/DataAnalysis/SubPages/Message.vue")
            },
            {
                name: "ProjectView",
                path: "projectview",
                component: () => import("../components/DataAnalysis/SubPages/ProjectView.vue")
            },
            {
                name: "ProjectDetails",
                path: "projectdetails/:projectname",
                component: () => import("../components/DataAnalysis/SubPages/ProjectDetails.vue")
            },
            {
                name: "DataAnalysis",
                path: "dataanalysis",
                component: () => import("../components/DataAnalysis/SubPages/DataAnalysis.vue")
            }
        ]
    },
    {
        name: "Admin",
        path: "/admin/:username",
        component: () => import("../components/Admin/MainAdmin.vue")
    },
    {
        name: "Developer",
        path: "/developer/:projectname",
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