<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="body">
        <div class="search">
            <el-input v-model="search" placeholder="请输入消息标题">
                <template #prefix>
                    <el-icon><Search /></el-icon>
                </template>
            </el-input>
            <div class="search-button">
                <el-button type="primary" @click="searchMessages()" round>搜索</el-button>
                <el-button @click="getNewMessages()" round>刷新</el-button>
            </div>
        </div>
        <el-scrollbar height="73vh">
            <div v-for="message in messages" :key="message.id" class="message">
                <div class="message-header">
                    <h1>{{ message.title }}</h1>
                </div>
                <div class="message-body">
                    <p>{{ message.content }}</p>
                </div>
                <div class="message-footer">
                    <h3>通知者：{{ message.author }}</h3>
                </div>
                <div class="message-button">
                    <el-button type="danger" @click="deleteMessage(message.id)">删除</el-button>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>

import { getMessages, deleteMessage } from '@/api/message'
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            messages: [],
            search: '',
        }
    },
    methods: {
        deleteMessage(id) {
            deleteMessage(id).then(() => {
                ElMessage.success('删除成功')
                this.messages = this.messages.filter(message => message.id !== id)
            }).catch(() => {
                ElMessage.error('删除失败')
            })
        },
        getNewMessages() {
            getMessages().then(res => {
                this.messages = res.data.messages
            }).catch(() => {
                ElMessage.error('获取消息失败')
            })
        },
        searchMessages() {
            this.messages = this.messages.filter(message => message.title.includes(this.search))
        }
    },
    beforeMount() {
        this.getNewMessages()
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
.message {
    margin: 10px;
    padding: 15px;
    background-color: white;
    border-radius: 15px;
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
</style>