<template>
    <div>
        <el-container class="container">    
            <el-header class="header">
                <title>Analyzer</title>
                <div class="header-name"><h1><el-icon><ArrowLeft /><ArrowRight /></el-icon>&nbsp;项目开发</h1></div>
                <div class="header-button">
                    <el-button type="danger" @click="logout()">退出登录</el-button>
                    <el-button>修改密码</el-button>
                </div>
            </el-header>
        
            <el-container>
                <el-aside width="200px" class="aside">
                    <el-menu
                        active-text-color="#ffd04b"
                        background-color="#545c64"
                        class="aside-menu"
                        default-active="1"
                        text-color="#fff"
                        @open="handleOpen"
                        @close="handleClose"
                    >
                        <el-menu-item index="1" class="menu-item"><el-icon><Message /></el-icon>通知</el-menu-item>
                        <el-menu-item index="2" class="menu-item"><el-icon><DataBoard /></el-icon>浏览项目</el-menu-item>
                        <el-menu-item index="3" class="menu-item"><el-icon><Document /></el-icon>API信息</el-menu-item>
                        <el-menu-item index="4" class="menu-item"><el-icon><SwitchFilled /></el-icon>项目信息</el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            
        </el-container>
    </div>
</template>

<script>
import { logout } from '@/api/user'
import { ElMessage } from 'element-plus'
import storage from '@/store/storage'

export default {
    data() {
        return {
            activeIndex: '1'
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        logout() {
            this.$router.push('/login')
            logout().then(() => {
                ElMessage.success('退出成功')
                storage.clear()
                this.$router.push('/')
            })
        }
    }
}
</script>

<style>
    .container {
        height: 100vh;
    }
    .header {
        display: flex;
        background-color: black;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100px;
    }
    .header-name {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        height: 100%;
        margin-left: 30px;
        font-size: 26px;
    }
    .header-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        margin-right: 30px;
    }
    .aside {
        height: 100%;
    }
    .aside-menu {
        width: 100%;
    }
    .menu-item {
        font-size: 18px;
    }
</style>