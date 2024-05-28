<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="apiInfo-box" v-if="isShowed">
        <el-form :model="form" label-width="auto" style="width: 600px" :disabled="form.type==='Midtable'">
            <el-form-item label="API名称">
                <el-input v-model="form.name" style="width:200px" />
            </el-form-item>
            <el-form-item label="类型" style="width:400px" >
                <el-select v-model="form.type" disabled>
                    <el-option label="由中台向项目用户提供" value="Midtable" />
                    <el-option label="由项目用户向中台提供" value="User" />
                </el-select>
            </el-form-item>
            <el-form-item label="URL">
                <el-input v-model="form.url" />
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item label="请求格式">
                <el-input v-model="form.request" type="textarea" />
            </el-form-item>
            <el-form-item label="响应格式">
                <el-input v-model="form.response" type="textarea" />
            </el-form-item>
        </el-form>
        <div class="box-button">
            <el-button type="primary" @click="onSubmit()" :disabled="form.type==='Midtable'">保存</el-button>
            <el-button @click="cancel()">取消</el-button>
        </div>
    </div>
    <div class="body">
        <div class="search">
            <el-input v-model="search" placeholder="请输入API名称" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <el-select v-model="type" placeholder="请选择API类型" size="large" style="width:300px">
                <el-option label="由项目用户向中台提供" value="User"></el-option>
                <el-option label="由中台向项目用户提供" value="Midtable"></el-option>
            </el-select>
            <div class="search-button">
                <el-button color="#529b2e" @click="goSearch()" round>搜索</el-button>
                <el-button @click="refresh()" round>刷新</el-button>
                <div v-if="isLoading">
                    <el-icon>
                        <Loading />
                    </el-icon>
                </div>
            </div>
        </div>
        <el-scrollbar height="72vh">
            <div v-for="apiInfo in apiInfos" :key="apiInfo.id" class="apiInfo" @click="watchDetails(apiInfo.id)">
                <el-row>
                    <el-col :span="16">
                        <div class="apiInfo-header">
                            <p>{{ apiInfo.title }}</p>
                        </div>
                        <div class="apiInfo-body">
                            <p>{{ apiInfo.content }}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="apiInfo-type">
                            <p><b>类型：</b>{{ apiInfo.type }}</p>
                            <p><b>创建时间：</b>{{ apiInfo.time }}</p>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="apiInfo-button">
                            <el-button type="info" @click="watchDetails(apiInfo.id)">查看详情</el-button>
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
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            apiInfos: [],
            search: '',
            offset: 0,
            limit: 5,
            isSearching: false,
            pages: 1,
            curpage: 1,
            isLoading: false,
            type: '',
            form: {
                id: 0,
                name: '',
                type: '',
                url: '',
                desc: '',
                request: '',
                response: ''
            },
            isShowed: false,
            isUser: false
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
        goSearch() {
            this.isSearching = true
            this.offset = 0
            this.curpage = 1
            this.getSearchPages()
            this.searchAPIs()
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
        },
        handleType() {
            console.log(this.apiInfos)
            for(let i = 0; i < this.apiInfos.length; i++) {
                if(this.apiInfos[i].type == 'User') {
                    this.apiInfos[i].type = '由项目用户向中台提供'
                } else if (this.apiInfos[i].type == 'Midtable') {
                    this.apiInfos[i].type = '由中台向项目用户提供'
                } else {
                    this.apiInfos[i].type = '未知'
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
        onSubmit() {
            saveAPI(this.form).then(() => {
                this.$message({
                    message: '创建成功',
                    type: 'success'
                })
            }).catch(() => {
                ElMessage.error('创建失败')
            }).finally(() => {
                this.isShowed = false
                this.form = {}
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
.apiInfo-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    z-index: 100;
}

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
    width: 80%;
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