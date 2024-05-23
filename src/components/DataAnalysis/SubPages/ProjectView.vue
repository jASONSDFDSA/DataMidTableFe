<template>
    <div class="body">
        <div class="search">
            <el-input v-model="search" placeholder="请输入项目名称">
                <template #prefix>
                    <el-icon><Search /></el-icon>
                </template>
            </el-input>
            <div class="search-button">
                <el-button type="primary" @click="searchProjects()" round>搜索</el-button>
                <el-button @click="getNewProjects()" round>刷新</el-button>
            </div>
        </div>
        <el-scrollbar height="73vh">
            <div v-for="project in projects" :key="project.id" class="project">
                <el-row>
                    <el-col :span="2">
                        <img :src="project.image" alt="project" style="width: 100px; height: 100px; border-radius: 10px; margin:auto;">
                    </el-col>
                    <el-col :span="20">
                        <div class="project-header">
                            <h1>{{ project.title }}</h1>
                        </div>
                        <div class="project-body">
                            <p>{{ project.content }}</p>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="project-button">
                            <el-button type="info" @click="watchDetails(project.title)">查看详情</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-scrollbar>
    </div>

</template>

<script>
import { getProjects } from '@/api/projectView'
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            projects: [],
            search: '',
        }
    },
    methods: {
        getNewProjects() {
            getProjects().then(res => {
                this.projects = res.data.projects
            }).catch(() => {
                ElMessage.error('获取项目失败')
            })
        },
        searchProjects() {
            this.projects = this.projects.filter(project => project.title.includes(this.search))
        },
        watchDetails(title) {
            this.$router.push({ name:'ProjectDetails', params: { projectname: title } })
        }
    },
    beforeMount() {
        this.getNewProjects()
    }
}

</script>

<style scoped>
.body {
    height:auto;
    background-color: grey;
    border-radius: 15px;
    padding: auto;
}
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: auto;
}
.search-button {
    margin: 10px;
    display: flex;
    align-items: center;
}
.project {
    background-color: white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
}
.project-header {
    font-size: 22px;
}
.project-body {
    display: flex;
}
.project-button {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>