<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-dialog title="发布通知" v-model="isPublishing" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false" destroy-on-close width="fit-content">
        <el-form :model="publishForm" :rules="publishRules" ref="publishForm" label-width="80px" style="width: 600px;">
            <el-form-item label="类型" prop="type">
                <el-select v-model="publishForm.type" placeholder="请选择类型">
                    <el-option label="向所有用户发送" value="AllUser"></el-option>
                    <el-option label="向所有数据分析用户发送" value="AllAnalyzer"></el-option>
                    <el-option label="向所有项目开发用户发送" value="AllDeveloper"></el-option>
                    <el-option label="向特定数据分析用户发送" value="Analyzer"></el-option>
                    <el-option label="向特定项目开发用户发送" value="Developer"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户" prop="users" v-if="notAll">
                <el-select v-model="publishForm.users" multiple collapse-tags collapse-tags-tooltip
                    :max-collapse-tags="3" placeholder="请选择用户" style="width: 300px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="publishForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input v-model="publishForm.content" type="textarea" rows="5"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button color="#529b2e" @click="publishMessage()">发布</el-button>
            <el-button type="danger" @click="clearPublishBox()">取消</el-button>
        </template>
    </el-dialog>
    <div class="body">
        <div class="search">
            <el-input v-model="search" placeholder="请输入消息标题" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <div class="search-button">
                <el-button color="#529b2e" @click="goSearch()" round>搜索</el-button>
                <el-button @click="refresh()" round>刷新</el-button>
                <el-button type="primary" @click="showPublish()" round>发布</el-button>
                <div v-if="isLoading">
                    <el-icon class="is-loading">
                        <Loading />
                    </el-icon>
                </div>
            </div>
        </div>
        <el-scrollbar height="72vh">
            <div v-for="message in messages" :key="message.id" class="message">
                <div class="message-header">
                    <h1>{{ message.title }}</h1>
                </div>
                <div class="message-body">
                    <p>{{ message.content }}</p>
                </div>
                <div class="message-footer">
                    <div>
                        <h4>通知者：{{ message.author }}</h4>
                        <h4>时间：{{ message.time }}</h4>
                    </div>
                </div>
                <div class="message-button">
                    <el-button type="danger" @click="deleteMessage(message.id)">删除</el-button>
                </div>
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

import { publishMessage } from '@/api/admin';
import { getMessages, deleteMessage, searchMessages, getSearchPages, getPages } from '@/api/message'
import storage from '@/store/storage';
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            messages: [],
            search: '',
            offset: 0,
            limit: 5,
            isSearching: false,
            pages: 1,
            curpage: 1,
            isLoading: false,
            isPublishing: false,
            publishForm: {
                type: '',
                users: [],
                title: '',
                content: ''
            },
            publishRules: {
                type: [
                    { required: true, message: '请选择类型', trigger: 'blur' }
                ],
                users: [
                    { required: true, message: '请选择用户', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        notAll() {
            return this.publishForm.type === 'Analyzer' || this.publishForm.type === 'Developer'
        },
        options() {
            const options = []
            let users = storage.get('users')
            for (let i = 0; i < users.length; i++) {
                if (this.publishForm.type === users[i].identity) {
                    options.push({
                        label: users[i].username,
                        value: users[i].username
                    })
                }
            }
            return options;
        }
    },
    methods: {
        deleteMessage(id) {
            this.isLoading = true
            deleteMessage(id).then(() => {
                ElMessage.success('删除成功')
                this.refresh()
            }).catch(() => {
                ElMessage.error('删除失败')
            }).finally(() => {
                this.isLoading = false
            })
        },
        refresh() {
            this.isSearching = false
            this.offset = 0
            this.curpage = 1
            this.search = ''
            this.getAllPages()
            this.getNewMessages()
        },
        showPublish() {
            this.isPublishing = true
        },
        publishMessage() {
            this.$refs.publishForm.validate((valid) => {
                if (valid) {
                    this.isLoading = true
                    publishMessage(this.publishForm).then(() => {
                        ElMessage.success('发布成功')
                        this.clearPublishBox()
                        this.refresh()
                    }).catch(() => {
                        ElMessage.error('发布失败')
                    }).finally(() => {
                        this.isLoading = false
                    })
                }
            })
        },
        clearPublishBox() {
            this.$refs.publishForm.resetFields()
            this.isPublishing = false
        },
        getAllPages() {
            this.isLoading = true
            getPages(this.limit).then(res => {
                this.pages = res.data.pages
                console.log(this.pages)
            }).catch(() => {
                ElMessage.error('获取页数失败')
            })
        },
        getNewMessages() {
            this.isLoading = true
            getMessages(this.offset, this.limit).then(res => {
                this.messages = res.data.messages
            }).catch(() => {
                ElMessage.error('获取消息失败')
            }).finally(() => {
                this.isLoading = false
            })
        },
        goSearch() {
            this.isSearching = true
            this.offset = 0
            this.curpage = 1
            this.getSearchPages()
            this.searchMessages()
        },
        getSearchPages() {
            this.isLoading = true
            const params = {
                search: this.search,
                limit: this.limit
            }
            getSearchPages(params).then(res => {
                this.pages = res.data.pages
                console.log(this.pages)
            }).catch(() => {
                ElMessage.error('获取页数失败')
            })
        },
        searchMessages() {
            this.isLoading = true
            const params = {
                offset: this.offset,
                limit: this.limit,
                search: this.search,
            }
            searchMessages(params).then(res => {
                this.messages = res.data.messages
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
                this.searchMessages()
            } else {
                this.getNewMessages()
            }
        }
    },
    beforeMount() {
        this.getAllPages()
        this.getNewMessages()
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

.message {
    margin: 20px;
    padding: 10px;
    background-color: white;
}

.message-header {
    font-size: 22px;
}

.message-body {
    margin-top: 10px;
}

.message-footer {
    display: flex;
    justify-content: flex-end;
}

.message-button {
    display: flex;
    justify-content: flex-end;
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