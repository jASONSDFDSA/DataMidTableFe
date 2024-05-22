<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div style="height:85vh">
        <div class="search">
            <el-icon><Search /></el-icon>&nbsp;
            <el-input v-model="search" placeholder="请输入消息标题" @input="searchMessage" clearable></el-input>
            <div class="search-button">
                <el-button type="primary" @click="search()">搜索</el-button>
                <el-button @click="addNewMessage()">刷新</el-button>
            </div>
        </div>
        <el-scrollbar height="84vh">
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

import { getMessages, deleteMessage } from '@/api/DataAnalysis/message'
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            messages: [
                {
                    id: 1,
                    title: '消息标题1',
                    content: '消息内容1',
                    author: 'admin'
                },
                {
                    id: 2,
                    title: '消息标题2',
                    content: '消息内容2',
                    author: 'admin'
                },
                {
                    id: 3,
                    title: '消息标题3',
                    content: '消息内容3',
                    author: 'admin'
                }
            ],
            search: '',
        }
    },
    methods: {
        deleteMessage(id) {
            this.messages = this.messages.filter(message => message.id !== id)
            deleteMessage(id).then(() => {
                ElMessage.success('删除成功')
            }).catch(() => {
                ElMessage.error('删除失败')
            })
        },
        addNewMessage() {
            this.messages.push({
                id: this.messages.length + 1,
                title: '消息标题',
                content: '消息内容',
                author: 'admin'
            })
        },
        getNewMessages() {
            getMessages().then(res => {
                this.messages = res.data
            }).catch(() => {
                ElMessage.error('获取消息失败')
            })
        },
    },
    beforeMount() {
        getMessages().then(res => {
            this.messages = res.data
        })
    }
}

</script>

<style scoped>
.search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}
.search-button {
    margin: 10px;
    display: flex;
    align-items: center;
}
.message {
    margin: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
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