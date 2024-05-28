<template>
    <div class="body">
        <div class="search">
            <el-input v-model="search" placeholder="请输入项目名称" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <div class="search-button">
                <el-button color="#529b2e" @click="goSearch()" round>搜索</el-button>
                <el-button @click="refresh()" round>刷新</el-button>
                <div v-if="isLoading">
                    <el-icon class="is-loading"><Loading /></el-icon>
                </div>
            </div>
        </div>
        <el-scrollbar height="72vh">
            <div v-for="project in projects" :key="project.id" class="project" @click="watchDetails(project.title)">
                <el-row>
                    <el-col :span="3">
                        <img :src="project.image" alt="project"
                            style="width: 125px; height: 125px; border-radius: 10px; margin:auto;">
                    </el-col>
                    <el-col :span="19">
                        <div class="project-header">
                            <p>{{ project.title }}</p>
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
        <div class="example-pagination-block">
            <div class="inner-block">
                <el-pagination v-model:current-page="curpage" :page-count="pages" layout="prev, pager, next" @current-change="handleCurrentChange()"/>
            </div>
        </div>
    </div>

</template>

<script>
import { getProjects, getProjectPages, getSearchProjectPages, searchProjects } from '@/api/projectView'
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            projects: [],
            search: '',
            offset: 0,
            limit: 3,
            isSearching: false,
            pages: 1,
            curpage: 1,
            isLoading: false
        }
    },
    methods: {
        refresh() {
            this.isSearching = false
            this.offset = 0
            this.curpage = 1
            this.search = ''
            this.getAllPages()
            this.getNewProjects()
        },
        getAllPages() {
            this.isLoading = true;
            getProjectPages(this.limit).then(res => {
                this.pages = res.data.pages
                console.log(this.pages)
            }).catch(() => {
                ElMessage.error('获取项目页数失败')
            })
        },
        getNewProjects() {
            this.isLoading = true
            getProjects(this.offset, this.limit).then(res => {
                this.projects = res.data.projects
            }).catch(() => {
                ElMessage.error('获取项目失败')
            }).finally(() => {
                this.isLoading = false
            })
        },
        goSearch() {
            this.isSearching = true
            this.offset = 0
            this.curpage = 1
            this.searchProjects()
        },
        getSearchProjectPages() {
            this.isLoading = true
            const params = {
                search: this.search,
                limit: this.limit
            }
            getSearchProjectPages(params).then(res => {
                this.pages = res.data.pages
                console.log(this.pages)
            }).catch(() => {
                ElMessage.error('获取页数失败')
            })
        },
        searchProjects() {
            this.isLoading = true
            const params = {
                search: this.search,
                offset: this.offset,
                limit: this.limit
            }
            searchProjects(params).then(res => {
                this.projects = res.data.projects
            }).catch(() => {
                ElMessage.error('搜索失败')
            }).finally(() => {
                this.isLoading = false
            })
        },
        handleCurrentChange(val) {
            this.curpage = val
            this.offset = (val - 1) * this.limit
            if (this.isSearching) {
                this.searchProjects()
            } else {
                this.getNewProjects()
            }
        },
        watchDetails(title) {
            this.$router.push({ name: 'DeveloperProjectDetails', params: { projectname: title } })
        }
    },
    beforeMount() {
        this.getAllPages()
        this.getNewProjects()
    }
}

</script>

<style scoped>
.body {
    height: auto;
    background-color: #f1f0ea;
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
    margin: 19px;
    padding: 10px;
    height: fit-content;
}

.project:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.9)
}

.project-header {
    font-size: 22px;
    font-weight: bold;
}

.project-button {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.example-pagination-block {
    width: 100%;
    margin-top: 10px;
    padding: 5px;
    display: flex;
    justify-content: center;
}
.inner-block {
    width: fit-content;
}
</style>