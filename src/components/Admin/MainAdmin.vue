<template>
    <div>
        <el-container class="container">
            <el-header class="header">
                <title>Analyzer</title>
                <div class="header-name">
                    <h1><el-icon>
                            <UserFilled />
                        </el-icon>&nbsp;后台管理</h1>
                </div>
                <div class="header-button">
                    <el-button type="danger" @click="logout()">退出登录</el-button>
                    <el-button @click="showChangePwd()">修改密码</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="aside-menu"
                        default-active="1" text-color="#fff" @open="handleOpen" @close="handleClose">
                        <el-menu-item index="1" class="menu-item"><el-icon>
                                <Message />
                            </el-icon>通知</el-menu-item>
                        <el-menu-item index="2" class="menu-item"><el-icon>
                                <Operation />
                            </el-icon>权限管理</el-menu-item>
                        <el-menu-item index="3" class="menu-item"><el-icon>
                                <Avatar />
                            </el-icon>用户管理</el-menu-item>
                        <el-menu-item index="4" class="menu-item"><el-icon>
                                <Monitor />
                            </el-icon>平台监控</el-menu-item>
                        <el-menu-item index="5" class="menu-item"><el-icon>
                                <Files />
                            </el-icon>SQL数据库</el-menu-item>
                        <el-menu-item index="6" class="menu-item"><el-icon>
                                <FolderOpened />
                            </el-icon>公有数据</el-menu-item>
                        <el-menu-item index="7" class="menu-item"><el-icon>
                                <Document />
                            </el-icon>API信息</el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                    <div v-if="showPwdBox" class="pwdBox">
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
                            <div class="center">
                                <el-button type="primary" @click="changePassword()">修改密码</el-button>
                                <el-button type="danger" @click="clearPwdBox()">取消</el-button>
                            </div>
                        </el-form>
                    </div>
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
            }
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        logout() {
            ElMessage.success('退出成功')
            storage.clear()
            this.$router.push('/')
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
                if (storage.get('user').password !== this.changePwdForm.oldPwd) {
                    ElMessage.error('原密码错误')
                    console.log(storage.get('user').password, this.changePwdForm.oldPwd)
                    return false
                }
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
                        changePassword(this.changePwdForm.newPwd).then(() => {
                            const user = storage.get('user')
                            user.password = this.changePwdForm.newPwd
                            storage.set('user', user)
                            // console.log(storage.get('user'))
                            this.clearPwdBox()
                            ElMessage.success('修改成功')
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
    background-color: black;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
}

.header-name {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100%;
    margin-left: 30px;
    font-size: 26px;
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