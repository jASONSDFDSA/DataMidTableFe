<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('form')">注册</el-button>
                <el-button @click="reset('form')">重置</el-button>
            </el-form-item>
            <el-form-item>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户" name="first">用户</el-tab-pane>
                    <el-tab-pane label="管理员" name="second">管理员</el-tab-pane>
                    <el-tab-pane label="开发者" name="third">开发者</el-tab-pane>
                </el-tabs>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
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
            }
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
        reset(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>