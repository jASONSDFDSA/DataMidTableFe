<template>
    <body>
        <div class="form-box">
            <el-tabs class="tabs-title" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="first"><h1 class="login-title">登录</h1></el-tab-pane>
                <el-tab-pane label="注册" name="second"><h1 class="login-title">注册</h1></el-tab-pane>
            </el-tabs>
            <div v-if="isLogin">
                <el-form :model="loginform" :rules="loginrules" ref="loginform" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginform.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginform.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <div class="center"> <!-- 选择身份 -->
                        <el-radio-group v-model="loginform.identity">
                            <el-radio value="Analyzer"><el-icon><DataAnalysis /></el-icon>数据分析</el-radio>
                            <el-radio value="Admin"><el-icon><UserFilled /></el-icon>管理员</el-radio>
                            <el-radio value="Developer"><el-icon><ArrowLeft /><ArrowRight /></el-icon>项目开发</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="center">
                        <el-button type="primary" @click="login('loginform')">登录</el-button>
                        <el-button @click="reset('loginform')">重置</el-button>
                    </div>
                </el-form>
            </div>
            <div v-if="isRegister">
                <el-form :model="registerform" :rules="getDynamicRegisterRules()" ref="registerform" label-width="100px" class="demo-ruleForm">
                    <div v-if="registerform.identity==='Analyzer'">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="registerform.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="registerform.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model="registerform.phone" placeholder="请输入电话"></el-input>
                        </el-form-item>
                        <el-form-item label="学号" prop="id">
                            <el-input v-model="registerform.id" placeholder="请输入学号"></el-input>
                        </el-form-item>
                        <el-form-item label="真实姓名" prop="name">
                            <el-input v-model="registerform.name" placeholder="请输入真实姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password1">
                            <el-input type="password" v-model="registerform.password1" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="二次验证" prop="password2">
                            <el-input type="password" v-model="registerform.password2" placeholder="请再次输入密码"></el-input>
                        </el-form-item>
                    </div>
                    <div v-if="registerform.identity==='Admin'">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="registerform.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password1">
                            <el-input type="password" v-model="registerform.password1" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="二次验证" prop="password2">
                            <el-input type="password" v-model="registerform.password2" placeholder="请再次输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="邀请码" prop="invitecode">
                            <el-input v-model="registerform.invitecode" placeholder="请输入邀请码"></el-input><el-button @click="getInviteCode()">获取邀请码</el-button>
                        </el-form-item>
                    </div>
                    <div v-if="registerform.identity==='Developer'">
                        <el-form-item label="项目名" prop="projectname">
                            <el-input v-model="registerform.projectname" placeholder="请输入项目名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="registerform.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password1">
                            <el-input type="password" v-model="registerform.password1" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="二次验证" prop="password2">
                            <el-input type="password" v-model="registerform.password2" placeholder="请再次输入密码"></el-input>
                        </el-form-item>
                    </div>
                    <div class="center">
                        <el-radio-group v-model="registerform.identity">
                            <el-radio value="Analyzer"><el-icon><DataAnalysis /></el-icon>数据分析</el-radio>
                            <el-radio value="Admin"><el-icon><UserFilled /></el-icon>管理员</el-radio>
                            <el-radio value="Developer"><el-icon><ArrowLeft /><ArrowRight /></el-icon>项目开发</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="center">
                        <el-button type="primary" @click="signup('registerform')">注册</el-button>
                        <el-button @click="reset('registerform')">重置</el-button>
                    </div>
                </el-form>
            </div>
            <div v-if="isApply">
                <!-- Get Invite Code -->
                <el-form :model="applyform" :rules="applyrules" ref="applyform" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="学校邮箱" prop="email">
                        <el-input v-model="applyform.email" placeholder="请输入学校邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="申请理由" prop="reasons">
                        <el-input type="textarea" style="height:200px" :show-word-limit="showLimit" v-model="applyform.reasons" placeholder="请输入申请理由。务必具体详细，否则可能被拒绝！"></el-input>
                    </el-form-item>
                    <div class="center">
                        <el-button type="primary" @click="apply('applyform')">申请</el-button>
                        <el-button @click="reset('applyform')">重置</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </body>
</template>

<script>

import { login, signup, apply } from '@/api/user';
import storage from '@/store/storage';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    data() {
        return {
            loginform: {
                username: '',
                password: '',
                identity: ''
            },
            registerform: {
                id: '',
                email: '',
                phone: '',
                projectname: '',
                name: '',
                username: '',
                password1: '',
                password2: '',
                invitecode: '',
                identity: ''
            },
            applyform: {
                email: '',
                reasons: ''
            },
            loginrules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                identity: [
                    { required: true, message: '请选择身份', trigger: 'blur' }
                ]
            },
            registerrules: {
                identity: [
                    { required: true, message: '请选择身份', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                id: [
                    { required: true, message: '请输入学号/工号', trigger: 'blur' },
                    { pattern:/^[0-9]{8}$/, message: '长度为8个数字', trigger: 'blur' }
                ],
                invitecode: [
                    { required: true, message: '请输入邀请码', trigger: 'blur' },
                    { pattern:/^[0-9]{5}$/ , message: '长度为5个字符', trigger: 'blur'}
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { pattern:/^1[3456789]\d{9}$/, message: '请输入正确的电话号码', trigger: 'blur' }
                ],
                projectname: [
                    { required: true, message: '请输入项目名', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
                password1: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, message: '需数字、小写字母和大写字母各一个，长度8-16个字符', trigger: 'blur' }
                ],
                password2: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: this.validatePassword2, trigger: 'blur' }
                ],
            },
            applyrules: {
                email: [
                    { required: true, message: '请输入学校邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                reasons: [
                    { required: true, message: '请输入申请理由', trigger: 'blur' },
                    { min: 10, max: 200, message: '长度在 10 到 200 个字符', trigger: 'blur' }
                ],
                identity: [
                    { required: true, message: '请选择身份', trigger: 'blur' }
                ]
            },
            activeName: 'first',
            isLogin: true,
            isRegister: false,
            isApply: false,
            showLimit: true
        };
    },
    methods: {
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    login(this.loginform).then(response => {
                        console.log(response);
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                            duration: 5 * 1000
                        });
                        storage.set('token', response.data.token);
                        storage.set('user', this.loginform);

                        // Navigate to the corresponding page according to the identity
                        console.log(this.loginform.identity);
                        if (this.loginform.identity === 'Analyzer') {
                            this.$router.push('/analyzer');
                        } else if (this.loginform.identity === 'Admin') {
                            this.$router.push('/admin');
                        } else {
                            this.$router.push('/developer');
                        }

                    }).catch(error => {
                        console.log(error);
                    });

                } else {
                    ElMessage({
                        message: '请按格式输入账号密码',
                        type: 'error',
                        duration: 5 * 1000
                    });
                    return false;
                }
            });
        },
        signup(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    signup(this.registerform).then(response => {
                        console.log(response);
                        ElMessage({
                            message: '注册成功，请登录',
                            type: 'success',
                            duration: 5 * 1000
                        });
                        this.reset('registerform');
                        this.isLogin = true;
                        this.isRegister = false;
                        this.isApply = false;
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        apply(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    apply(this.applyform).then(response => {
                        console.log(response);
                        ElMessage({
                            message: '申请成功，请等待审核',
                            type: 'success',
                            duration: 5 * 1000
                        });
                        this.reset('applyform');
                        this.isLogin = true;
                        this.isRegister = false;
                        this.isApply = false;
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getInviteCode() {
            this.isLogin = false;
            this.isRegister = false;
            this.isApply = true;
            this.activeName = '';
        },
        reset(formName) {
            if(this.$refs[formName] !== undefined && this.$refs[formName] !== null)
                this.$refs[formName].resetFields();
        },
        handleClick(tab, event) {
            if (tab.props.name === 'first') {
                this.isLogin = true;
                this.isRegister = false;
                this.isApply = false;
                this.reset('registerform');
                this.reset('applyform');
            } else {
                this.isLogin = false;
                this.isRegister = true;
                this.isApply = false;
                this.reset('loginform');
                this.reset('applyform');
            }
        },
        validatePassword2(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerform.password1) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        },
        getDynamicRegisterRules() {
            switch (this.registerform.identity) {
                case 'Analyzer':
                    return {
                        identity: this.registerrules.identity,
                        username: this.registerrules.username,
                        email: this.registerrules.email,
                        phone: this.registerrules.phone,
                        id: this.registerrules.id,
                        name: this.registerrules.name,
                        password1: this.registerrules.password1,
                        password2: this.registerrules.password2
                    };
                case 'Admin':
                    return {
                        identity: this.registerrules.identity,
                        username: this.registerrules.username,
                        password1: this.registerrules.password1,
                        password2: this.registerrules.password2,
                        invitecode: this.registerrules.invitecode
                    };
                case 'Developer':
                    return {
                        identity: this.registerrules.identity,
                        projectname: this.registerrules.projectname,
                        email: this.registerrules.email,
                        password1: this.registerrules.password1,
                        password2: this.registerrules.password2
                    };
                default:
                    return null;
                }
        }
    }
};
</script>

<style scoped>
body {
    position: relative;
    height: 100vh;
    background-color: #000000;
}

.tabs-title {
    margin: 0 auto;
    width: 96px;
}

.form-box {
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background-color: #ffffff;
    vertical-align: middle;
}

.login-title {
    text-align: center;
}

.demo-ruleForm {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.center {
    display: flex;
    width: 100%;
    padding: 5px;
    justify-content: center;
    align-items: center;                                                                                                                                                                         
}
</style>