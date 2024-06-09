<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-dialog v-model="isShowed" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
        destroy-on-close width="640px">
        <el-form :model="form" :rules="formRules" ref="form" label-width="auto" style="width: 600px"
            :disabled="form.type === 'User'">
            <el-form-item label="API名称" prop="name">
                <el-input v-model="form.name" style="width:200px" placeholder="请输入API名称" />
            </el-form-item>
            <el-form-item label="类型" style="width:400px;" prop="type">
                <el-select v-model="form.type" :disabled="form.id != -1" placeholder="请选择API类型">
                    <el-option label="由中台向项目用户提供" value="Midtable" />
                    <el-option label="由项目用户向中台提供" value="User" disabled />
                    <el-option label="中台要求项目用户实现" value="Require" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.type === 'User'" label="项目名称" prop="projectname">
                <el-select v-model="form.projectname" :options="options" placeholder="请选择项目名称" />
            </el-form-item>
            <el-form-item v-if="form.type !== 'Require'" label="URL" prop="url">
                <el-input v-model="form.url" :disabled="form.type === 'Require'" placeholder="请输入URL" />
            </el-form-item>
            <el-form-item label="简介" prop="desc">
                <el-input v-model="form.desc" type="textarea" placeholder="请输入项目简介" />
            </el-form-item>
            <el-form-item label="请求格式" prop="request">
                <el-input v-model="form.request" type="textarea" rows="6" placeholder="请输入请求格式" />
            </el-form-item>
            <el-form-item label="响应格式" prop="response">
                <el-input v-model="form.response" type="textarea" rows="6" placeholder="请输入响应格式" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="onSubmit()" :disabled="form.type === 'User'">保存</el-button>
            <el-button type="danger" v-if="form.id !== -1" @click="deleteAPI(form.id)">删除</el-button>
            <el-button @click="cancel()">取消</el-button>
        </template>
    </el-dialog>
    <div class="body">
        <div class="search">
            <el-input v-model="search" placeholder="请输入API名称" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <el-select v-model="type" placeholder="请选择API类型" size="large" style="width:400px">
                <el-option label="由项目用户向中台提供" value="User"></el-option>
                <el-option label="由中台向项目用户提供" value="Midtable"></el-option>
                <el-option label="中台要求项目用户实现" value="Require"></el-option>
            </el-select>
            <div class="search-button">
                <el-button color="#529b2e" @click="goSearch()" round>搜索</el-button>
                <el-button @click="refresh()" round>刷新</el-button>
                <el-button type="primary" @click="addAPI()" round>新建API</el-button>
                <div v-if="isLoading">
                    <el-icon class="is-loading">
                        <Loading />
                    </el-icon>
                </div>
            </div>
        </div>
        <el-scrollbar height="72vh" ref="scrollbar">
            <div v-for="apiInfo in apiInfos" :key="apiInfo.id" class="apiInfo">
                <el-row>
                    <el-col :span="16" @click="watchDetails(apiInfo.id)">
                        <div class="apiInfo-header">
                            <p>{{ apiInfo.title }}</p>
                        </div>
                        <div class="apiInfo-body">
                            <p>{{ apiInfo.content }}</p>
                        </div>
                    </el-col>
                    <el-col :span="6" @click="watchDetails(apiInfo.id)">
                        <div class="apiInfo-type">
                            <p><b>类型：</b>{{ apiInfo.type }}</p>
                            <p><b>创建时间：</b>{{ apiInfo.time }}</p>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="apiInfo-button">
                            <el-button type="info" @click="watchDetails(apiInfo.id)">查看详情</el-button>
                        </div>
                        <div class="apiInfo-button">
                            <el-button type="danger" @click="deleteAPI(apiInfo.id)">删除</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-scrollbar>
        <div class="example-pagination-block">
            <div class="inner-block">
                <el-pagination v-model:current-page="curpage" :page-count="pages" layout="prev, pager, next"
                    @current-change="handleCurrentChange()" />
            </div>
        </div>
    </div>
</template>

<script>

import { getApiList, getApiPages, getSearchPages, searchAPIs, getAPIDetails, saveAPI } from '@/api/apiInfo'
import { deleteAPI } from '@/api/admin'
import { ElMessage, ElMessageBox } from 'element-plus'
import storage from '@/store/storage';

export default {
    data() {
        return {
            apiInfos: [],
            scrollbar: null,
            search: '',
            offset: 0,
            limit: 5,
            isSearching: false,
            pages: 1,
            curpage: 1,
            isLoading: false,
            type: '',
            form: {
                id: -1,
                name: '',
                type: '',
                projectname: '',
                url: '',
                desc: '',
                request: '',
                response: ''
            },
            formRules: {
                name: [
                    { required: true, message: '请输入API名称', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入API URL', trigger: 'blur' },
                    { pattern: /^http(s)?:\/\/.*/, message: '请输入正确的URL', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择API类型', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入API简介', trigger: 'blur' }
                ],
                request: [
                    { required: true, message: '请输入请求格式', trigger: 'blur' }
                ],
                response: [
                    { required: true, message: '请输入响应格式', trigger: 'blur' }
                ]
            },
            isShowed: false,
        }
    },
    computed: {
        options() {
            const projects = []
            let users = storage.get('users')
            for (let i = 0; i < users.length; i++) {
                if (users[i].identity == 'Developer')
                    projects.push({
                        value: users[i].username,
                        label: users[i].username
                    })
            }
            return projects;
        }
    },
    methods: {
        refresh() {
            this.isSearching = false
            this.offset = 0
            this.curpage = 1
            this.search = ''
            this.getAllPages()
            this.getNewAPIs()
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' })
        },
        getAllPages() {
            this.isLoading = true
            getApiPages(this.limit).then(res => {
                this.pages = res.data.pages
                console.log(this.pages)
            }).catch(() => {
                ElMessage.error('获取页数失败')
            }).finally(() => {
                this.isLoading = false
            })
        },
        getNewAPIs() {
            this.isLoading = true
            getApiList(this.offset, this.limit).then(res => {
                this.apiInfos = res.data.apiInfos
                this.handleType()
            }).catch(() => {
                ElMessage.error('获取API信息失败')
            }).finally(() => {
                this.isLoading = false
            })
        },
        deleteAPI(id) {
            if (id == -1) {
                ElMessage.error('无法删除')
                return
            }
            ElMessageBox.confirm('确认删除该API？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const params = {
                    id: id
                }
                deleteAPI(params).then(() => {
                    this.refresh()
                    ElMessage.success('删除成功')
                    this.isShowed = false
                }).catch(() => {
                    ElMessage.error('删除失败')
                })
            }).catch(() => {
                ElMessage.info('已取消')
            })
        },
        goSearch() {
            this.isSearching = true
            this.offset = 0
            this.curpage = 1
            this.getSearchPages()
            this.searchAPIs()
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' })
        },
        getSearchPages() {
            this.isLoading = true
            const params = {
                search: this.search,
                type: this.type,
                limit: this.limit
            }
            getSearchPages(params).then(res => {
                this.pages = res.data.pages
                console.log(this.pages)
            }).catch(() => {
                ElMessage.error('获取页数失败')
            }).finally(() => {
                this.isLoading = false
            })
        },
        searchAPIs() {
            this.isLoading = true
            const params = {
                offset: this.offset,
                limit: this.limit,
                search: this.search,
                type: this.type
            }
            searchAPIs(params).then(res => {
                this.apiInfos = res.data.apiInfos
                this.handleType()
            }).catch(() => {
                ElMessage.error('搜索失败')
            }).finally(() => {
                this.isLoading = false
            })
        },
        handleCurrentChange() {
            console.log(this.curpage)
            this.offset = (this.curpage - 1) * this.limit
            if (this.isSearching) {
                this.searchAPIs()
            } else {
                this.getNewAPIs()
            }
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' })
        },
        handleType() {
            console.log(this.apiInfos)
            for (let i = 0; i < this.apiInfos.length; i++) {
                if (this.apiInfos[i].type == 'User') {
                    this.apiInfos[i].type = '由项目用户向中台提供'
                } else if (this.apiInfos[i].type == 'Midtable') {
                    this.apiInfos[i].type = '由中台向项目用户提供'
                } else if (this.apiInfos[i].type == 'Require') {
                    this.apiInfos[i].type = '中台要求项目用户实现'
                }
            }
        },
        watchDetails(id) {
            getAPIDetails(id).then(res => {
                this.form = res.data.apiInfo
                this.isShowed = true
            }).catch(() => {
                ElMessage.error('获取API详情失败')
            })
        },
        addAPI() {
            this.isShowed = true
            this.form.id = -1
            this.form.type = 'Midtable'
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    saveAPI(this.form).then(() => {
                        this.getAllPages()
                        this.getNewAPIs()
                        if (this.form.id == -1) {
                            this.$message({
                                message: '创建成功',
                                type: 'success'
                            })
                        } else {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                        }
                    }).catch(() => {
                        ElMessage.error('创建失败')
                    }).finally(() => {
                        this.isShowed = false
                        this.form = {}
                        this.isCreated = false
                    })
                }
            })
        },
        cancel() {
            this.isShowed = false
            this.form = {}
        }
    },
    beforeMount() {
        this.getAllPages()
        this.getNewAPIs()
    }
}

</script>

<style scoped>
.box-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

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
    width: fit-content;
    margin: auto;
}

.search-button {
    margin: 10px;
    display: flex;
    align-items: center;
}


.apiInfo {
    background-color: white;
    margin: 20px;
    padding: 10px;
    height: fit-content;
}

.apiInfo:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.9)
}

.apiInfo-header {
    font-size: 22px;
    font-weight: bold;
}

.apiInfo-type {
    height: 100%;
    margin-top: 27px;
}

.apiInfo-button {
    height: 50%;
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