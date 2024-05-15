<template>
    <body>
        <div class="form-box">
            <el-tabs class="tabs-title" v-if="isLogin||isRegister" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="first"><h1 class="login-title">登录</h1></el-tab-pane>
                <el-tab-pane label="注册" name="second"><h1 class="login-title">注册</h1></el-tab-pane>
            </el-tabs>
            <div v-if="isLogin">
                <el-form :model="loginform" :rules="loginrules" ref="loginform" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="loginform.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginform.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <div class="center"> <!-- 选择身份 -->
                        <el-radio-group v-model="loginform.identity">
                            <el-radio value="Analizer">数据分析</el-radio>
                            <el-radio value="Admin">管理员</el-radio>
                            <el-radio value="Developer">项目开发</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="center">
                        <el-button type="primary" @click="login('loginform')">登录</el-button>
                        <el-button @click="reset('loginform')">重置</el-button>
                    </div>
                </el-form>
            </div>
            <div v-if="isRegister">
                <el-form :model="registerform" :rules="registerrules" ref="registerform" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="学号/工号" prop="id">
                        <el-input v-model="registerform.id" placeholder="请输入学号/工号"></el-input>
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
                    <div class="center">
                        <el-radio-group v-model="registerform.identity">
                            <el-radio value="Analizer">数据分析</el-radio>
                            <el-radio value="Admin">管理员</el-radio>
                            <el-radio value="Developer">项目开发</el-radio>
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
                        <el-input type="textarea" style="height:200px" show-word-limit="true" v-model="applyform.reasons" placeholder="请输入申请理由。务必具体详细，否则可能被拒绝！"></el-input>
                    </el-form-item>
                    <div class="center">
                        <el-radio-group v-model="applyform.identity">
                            <el-radio value="Analizer">数据分析</el-radio>
                            <el-radio value="Admin">管理员</el-radio>
                            <el-radio value="Developer">项目开发</el-radio>
                        </el-radio-group>
                    </div>
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
                password1: '',
                password2: '',
                invitecode: '',
                identity: ''
            },
            applyform: {
                email: '',
                reasons: '',
                identity: ''
            },
            loginrules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
                id: [
                    { required: true, message: '请输入学号/工号', trigger: 'blur' },
                    { pattern:/^[0-9]{8}$/, message: '长度为8个数字', trigger: 'blur' }
                ],
                password1: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, message: '至少包含1个数字、1个小写字母和1个大写字母，长度为8到16个字符', trigger: 'blur' }
                ],
                password2: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, message: '至少包含1个数字、1个小写字母和1个大写字母，长度为8到16个字符', trigger: 'blur' }
                ],
                invitecode: [
                    { required: true, message: '请输入邀请码', trigger: 'blur' },
                    { pattern:/^[0-9]{5}$/ , message: '长度为5个数字', trigger: 'blur'}
                ],
                identity: [
                    { required: true, message: '请选择身份', trigger: 'blur' }
                ]
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
            isApply: false
        };
    },
    methods: {
        login(formName) {
            // console.log(this.$refs[formName]);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        signup(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getInviteCode() {
            alert('获取邀请码');
            this.isLogin = false;
            this.isRegister = false;
            this.isApply = true;
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(tab, event) {
            // console.log(tab.props.name);
            if (tab.props.name === 'first') {
                this.isLogin = true;
                this.isRegister = false;
                this.reset('registerform');
            } else {
                this.isLogin = false;
                this.isRegister = true;
                this.reset('loginform');
            }
        },
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