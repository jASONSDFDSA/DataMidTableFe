<!-- eslint-disable vue/multi-word-component-names -->
<template>
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
                <div v-if="isLoading">
                    <el-icon class="is-loading"><Loading /></el-icon>
                </div>
            </div>
        </div>
        <el-scrollbar height="72vh" ref="scrollbar">
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

import { getMessages, deleteMessage, searchMessages, getSearchPages, getPages } from '@/api/message'
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            messages: [],
            scrollbar: null,
            search: '',
            offset: 0,
            limit: 5,
            isSearching: false,
            pages: 1,
            curpage: 1,
            isLoading: false
        }
    },
    methods: {
        deleteMessage(id) {
            this.isLoading = true
            deleteMessage(id).then(() => {
                ElMessage.success('删除成功')
                this.messages = this.messages.filter(message => message.id !== id)
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
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' })
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
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' })
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
            if(this.curpage!=undefined)
                this.offset = (this.curpage - 1) * this.limit
            if (this.isSearching) {
                this.searchMessages()
            } else {
                this.getNewMessages()
            }
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' })
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