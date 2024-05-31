import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name: "Login",
        path: "/",
        alias: "/login",
        component: () => import("../views/Login/MainLogin.vue")
    },
    {
        name: "Analyzer",
        path: "/analyzer/:username",
        component: () => import("../views/DataAnalysis/MainAnalyzer.vue"),
        children: [
            {
                name: "AnalyzerMessage",
                path: "message",
                alias: "",
                component: () => import("../views/DataAnalysis/SubPages/Message.vue")
            },
            {
                name: "AnalyzerProjectView",
                path: "projectview",
                component: () => import("../views/DataAnalysis/SubPages/ProjectView.vue")
            },
            {
                name: "AnalyzerProjectDetails",
                path: "projectdetails/:projectname",
                component: () => import("../views/DataAnalysis/SubPages/ProjectDetails.vue")
            },
            {
                name: "AnalyzerDataAnalysis",
                path: "dataanalysis",
                component: () => import("../views/DataAnalysis/SubPages/DataAnalysis.vue")
            }
        ]
    },
    {
        name: "Admin",
        path: "/admin/:username",
        component: () => import("../views/Admin/MainAdmin.vue"),
        children: [
            {
                name: "AdminMessage",
                path: "message",
                alias: "",
                component: () => import("../views/Admin/SubPages/Message.vue")
            },
            {
                name: "AdminProjectDetails",
                path: "projectdetails/:projectname",
                component: () => import("../views/Admin/SubPages/ProjectDetails.vue")
            },
            {
                name: "AdminUserManagement",
                path: "usermanagement",
                component: () => import("../views/Admin/SubPages/UserManagement.vue")
            },
            {
                name: "AdminApiInfo",
                path: "apiinfo",
                component: () => import("../views/Admin/SubPages/ApiInfo.vue")
            },
            {
                name: "AdminPublicData",
                path: "publicdata",
                component: () => import("../views/Admin/SubPages/MyProjectDetails.vue")
            }
        ]
    },
    {
        name: "Developer",
        path: "/developer/:projectname",
        component: () => import("../views/ProjectDev/MainProjectDev.vue"),
        children: [
            {
                name: "DeveloperMessage",
                path: "message",
                alias: "",
                component: () => import("../views/ProjectDev/SubPages/Message.vue")
            },
            {
                name: "DeveloperProjectView",
                path: "projectview",
                component: () => import("../views/ProjectDev/SubPages/ProjectView.vue")
            },
            {
                name: "DeveloperMyProject",
                path: "myproject",
                component: () => import("../views/ProjectDev/SubPages/MyProjectDetails.vue")
            },
            {
                name: "DeveloperProjectDetails",
                path: "projectdetails",
                component: () => import("../views/ProjectDev/SubPages/ProjectDetails.vue")
            },
            {
                name: "DeveloperApiInfo",
                path: "apiinfo",
                component: () => import("../views/ProjectDev/SubPages/ApiInfo.vue")
            }
        ]
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