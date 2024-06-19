<template>
    <div>
        <el-container class="container">
            <el-header class="header">
                <title>Analyzer</title>
                <div class="header-name">
                    <img src="@/assets/sselogo20220915_0.png" alt="logo"
                        style="width:526px;height:109px; cursor: pointer;" @click="jumptoOff">
                </div>
                <div class="header-button">
                    <h2 style="color: white; width:200px">欢迎，{{ storage.get('user').username }}</h2>
                    <h1 style="color: white"><el-icon>
                            <DataAnalysis />
                        </el-icon>&nbsp;数据分析</h1>
                    &nbsp;&nbsp;&nbsp;
                    <el-button type="danger" @click="logout()">退出登录</el-button>
                    <el-button @click="showChangePwd()">修改密码</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside">
                    <el-menu active-text-color="#005826" background-color="white" class="aside-menu"
                        default-active="1" text-color="#000" @select="handleSelect">
                        <el-menu-item index="1" class="menu-item"><el-icon>
                                <Message />
                            </el-icon>通知</el-menu-item>
                        <el-menu-item index="2" class="menu-item"><el-icon>
                                <DataBoard />
                            </el-icon>浏览项目</el-menu-item>
                        <el-menu-item index="3" class="menu-item"><el-icon>
                                <Histogram />
                            </el-icon>数据分析</el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                    <el-dialog v-model="showPwdBox" :show-close="false" :close-on-click-modal="false"
                        :close-on-press-escape="false" destroy-on-close width="600px">
                        <el-form :model="changePwdForm" :rules="changePwdRules" ref="changePwdForm" label-width="80px">
                            <el-form-item label="原密码" prop="oldPwd">
                                <el-input v-model="changePwdForm.oldPwd" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPwd">
                                <el-input v-model="changePwdForm.newPwd" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPwd">
                                <el-input v-model="changePwdForm.confirmPwd" type="password"></el-input>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <el-button color="#529b2e" @click="changePassword()">修改密码</el-button>
                            <el-button type="danger" @click="clearPwdBox()">取消</el-button>
                        </template>
                    </el-dialog>
                </el-main>
            </el-container>

        </el-container>
    </div>


</template>

<script>
import { changePassword } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import storage from '@/store/storage'

export default {
    data() {
        return {
            activeIndex: '1',
            showPwdBox: false,
            changePwdForm: {
                oldPwd: '',
                newPwd: '',
                confirmPwd: ''
            },
            changePwdRules: {
                oldPwd: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, message: '需数字、小写字母和大写字母各一个，长度8-16个字符', trigger: 'blur' }
                ],
                confirmPwd: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.changePwdForm.newPwd) {
                                callback(new Error('两次密码不一致'))
                            } else {
                                callback()
                            }
                        }, trigger: 'blur'
                    }
                ]
            },
            storage: storage
        }
    },
    methods: {
        jumptoOff() {
            window.open('https://sse.sysu.edu.cn/', '_blank')
        },
        // eslint-disable-next-line no-unused-vars
        handleSelect(key, keyPath) {
            // console.log(key, keyPath)
            // console.log('handleselect')
            if (key === '1') {
                this.$router.push({ name: 'AnalyzerMessage' });
            } else if (key === '2') {
                this.$router.push({ name: 'AnalyzerProjectView' });
            } else if (key === '3') {
                this.$router.push({ name: 'AnalyzerDataAnalysis' });
            }
        },
        logout() {
            ElMessageBox.confirm('确认退出？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                storage.clear()
                this.$router.push('/')
            })
        },
        showChangePwd() {
            this.showPwdBox = true
        },
        clearPwdBox() {
            this.$refs.changePwdForm.resetFields()
            this.showPwdBox = false
        },
        changePassword() {
            this.$refs.changePwdForm.validate((valid) => {
                if (this.changePwdForm.oldPwd === this.changePwdForm.newPwd) {
                    ElMessage.error('新密码不能与原密码相同')
                    return false
                }
                if (valid) {
                    ElMessageBox.confirm('确认修改密码?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        changePassword(this.changePwdForm).then(() => {
                            const user = storage.get('user')
                            user.password = this.changePwdForm.newPwd
                            storage.set('user', user)
                            // console.log(storage.get('user'))
                            this.clearPwdBox()
                            ElMessage.success('修改成功')
                        }).catch(() => {
                            this.clearPwdBox()
                            ElMessage.error('修改失败')
                        })
                    }).catch(() => {
                        this.clearPwdBox()
                        ElMessage.info('已取消')
                    })
                } else {
                    return false
                }
            })
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
    background-color: #005826;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
}

.header-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    height: 100%;
    margin-left: 30px;
    font-size: 16px;
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

.menu-item {
    font-size: 18px;
    font-weight: bold;
}

.pwdBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: fit-content;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.center {
    display: flex;
    justify-content: center;
}
</style>