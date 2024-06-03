<template>
    <el-scrollbar height="80vh">
        <div class="pd-body">
            <div class="pd-data">
                <h2 style="display: flex; align-items: center; margin-top: 20px;"><el-icon>
                        <user />
                    </el-icon>用户</h2>
                <h3>
                    数据分析用户
                </h3>
                <el-table :data="UserManagement.analyzers" border max-height="200" style="width: fit-content;">
                    <el-table-column prop="username" label="用户名" width="120" />
                    <el-table-column prop="password" label="密码" width="120" />
                    <el-table-column prop="name" label="姓名" width="120" />
                    <el-table-column prop="uid" label="工号" width="120" />
                    <el-table-column prop="phone" label="电话" width="120" />
                    <el-table-column prop="email" label="邮箱" width="160" />
                </el-table>
                <h3 style="margin-top: 20px;">
                    项目开发用户
                </h3>
                <el-table :data="UserManagement.developers" border max-height="200" style="width: fit-content; ">
                    <el-table-column prop="projectname" label="项目名" width="120" />
                    <el-table-column prop="password" label="密码" width="120" />
                    <el-table-column prop="num_of_members" label="人数" width="120" />
                    <el-table-column prop="num_of_tables" label="数据表数" width="120" />
                    <el-table-column label="项目详情" width="120">
                        <template #default="scope">
                            <el-button link type="primary" size="large" @click="watchDetails(scope.$index, scope.row)">
                                查看详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="line" />
        <div class="pd-body">
            <h2 style="display: flex; align-items: center; margin-top: 20px;"><el-icon>
                    <share />
                </el-icon>生成邀请码</h2>
            <div style="display: flex; align-items: center;margin-top: 20px">
                <el-input disabled v-model="inviteCode" style="width: 200px"></el-input>
                <el-icon @click="generateInviteCode" style="font-size: 30px; margin-left: 20px; cursor: pointer;"><Cpu /></el-icon>
                <el-icon @click="copyInviteCode" style="font-size: 30px; margin-left: 20px; cursor: pointer;"><CopyDocument /></el-icon>
            </div>
            <el-radio-group v-model="inviteType" style="margin-top: 20px;">
                <el-radio value="Analyzer">数据分析用户</el-radio>
                <el-radio value="Developer">项目开发用户</el-radio>
                <el-radio value="Admin">管理员</el-radio>
            </el-radio-group>
        </div>
    </el-scrollbar>
</template>

<script>
import { getUsersDetails, generateInviteCode } from '@/api/admin';

export default {
    data() {
        return {
            UserManagement: {
                developers: [],
                analyzers: []
            },
            inviteCode: '',
            inviteType: 'Analyzer'
        }
    },
    methods: {
        getUserManagement() {
            getUsersDetails().then(res => {
                this.UserManagement.developers = res.data.developers
                this.UserManagement.analyzers = res.data.analyzers
            }).catch(() => {
                this.$message.error('获取用户信息失败，请刷新页面重试')
            })
        },
        watchDetails(index, row) {
            console.log(index, row)
            this.$router.push({ name: 'AdminProjectDetails', params: { projectname: row.projectname } })
        },
        generateInviteCode() {
            const params = {
                type: this.inviteType
            }
            generateInviteCode(params).then(res => {
                this.inviteCode = res.data.invitecode
                this.$message.success('生成邀请码成功')
            }).catch(() => {
                this.$message.error('生成邀请码失败')
            })
        },
        copyInviteCode() {
            const text = this.inviteCode
            const el = document.createElement('textarea')
            el.value = text
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)
            this.$message.success('复制成功')
        }
    },
    created() {
        this.getUserManagement()
    },
}
</script>

<style scoped>
.pd-body {
    margin: auto;
    width: 100%;
    font-size: 20px;
}
.pd-data {
    font-size: 20px;
}
.line {
    width: 100%;
    margin: 20px auto;
    border-top: 1px solid gray;
}
</style>