<template>
    <div>
        <el-container class="container">    
            <el-header class="header">
                <title>Analizer</title>
                <div class="header-name"><h1>数据分析</h1></div>
                <div class="header-button">
                    <el-button type="danger">退出登录</el-button>
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
                        <el-menu-item index="1">数据分析</el-menu-item>
                        <el-menu-item index="2">数据可视化</el-menu-item>
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
</style>