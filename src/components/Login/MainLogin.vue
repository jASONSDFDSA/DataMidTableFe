<template>
    <body>
        <div class="form-box">
            <el-tabs class="tabs-title" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="first"><h1 class="login-title">登录</h1></el-tab-pane>
                <el-tab-pane label="注册" name="second"><h1 class="login-title">注册</h1></el-tab-pane>
            </el-tabs>
            <div v-show="isLogin">
                <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <div class="center"> <!-- 选择身份 -->
                        <el-radio-group v-model="form.identity">
                            <el-radio label="Analizer">数据分析</el-radio>
                            <el-radio label="Admin">管理员</el-radio>
                            <el-radio label="Developer">数据开发</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="center">
                        <el-button type="primary" @click="login('form')">登录</el-button>
                        <el-button @click="reset('form')">重置</el-button>
                    </div>
                </el-form>
            </div>
            <div v-show="!isLogin">
                <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <div class="center">
                        <el-radio-group v-model="form.identity">
                            <el-radio label="Analizer">数据分析</el-radio>
                            <el-radio label="Admin">管理员</el-radio>
                            <el-radio label="Developer">数据开发</el-radio>
                        </el-radio-group>
                    </div>
                        <div class="center">
                            <el-button type="primary" @click="signup('form')">注册</el-button>
                        <el-button @click="reset('form')">重置</el-button>
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
            form: {
                username: '',
                password: '',
                identity: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },
            activeName: 'first',
            isLogin: true,

        };
    },
    methods: {
        login(formName) {
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
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(tab, event) {
            if (tab.name === 'first') {
                this.isLogin = true;
            } else {
                this.isLogin = false;
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
    width: 100px;
}

.form-box {
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