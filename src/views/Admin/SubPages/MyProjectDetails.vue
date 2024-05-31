<template>
    <el-dialog title="上传头像" v-model="dialogVisible" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false" destroy-on-close width="600px">
        <div class="avatar-container">
            <!-- {{dialogVisible}} -->
            <!-- 待上传图片 -->
            <div v-show="!options.img">
                <el-upload class="upload" ref="elUpload" action="#" :on-change="upload"
                    accept="image/png, image/jpeg, image/jpg" :show-file-list="false" :auto-upload="false">
                    <template v-slot:trigger>
                        <el-button type="primary" ref="uploadBtn" color="#529b2e">
                            选择图片
                        </el-button>
                    </template>
                </el-upload>
                <div>支持jpg、png格式的图片，大小不超过5M</div>
            </div>
            <!-- <img :src="options.img" alt=""> -->
            <!-- 已上传图片 -->
            <div v-show="options.img" class="avatar-crop">
                <VueCropper class="crop-box" ref="cropper" :img="options.img" :autoCrop="options.autoCrop"
                    :fixedBox="options.fixedBox" :canMoveBox="options.canMoveBox" :autoCropWidth="options.autoCropWidth"
                    :autoCropHeight="options.autoCropHeight" :centerBox="options.centerBox" :fixed="options.fixed"
                    :fixedNumber="options.fixedNumber" :canMove="options.canMove" :canScale="options.canScale">
                </VueCropper>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="reupload" @click="reupload">
                    <span v-show="options.img">重新上传</span>
                </div>
                <div>
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="getCrop" color="#529b2e">确 定</el-button>
                </div>
            </span>
        </template>
    </el-dialog>
    <el-dialog title="项目简介" v-model="introVisible" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false" destroy-on-close width="fit-content">
        <el-form :model="form" :rules="formrules" ref="form" label-width="auto" style="width: 600px">
            <el-form-item label="项目名称" prop="projectname">
                <el-input v-model="form.projectname" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目简介" prop="description">
                <el-input type="textarea" v-model="form.description" rows="5" placeholder="请输入项目简介"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <div>
                    <el-button @click="cancelIntro">取 消</el-button>
                    <el-button type="primary" @click="submitIntro" color="#529b2e">确 定</el-button>
                </div>
            </span>
        </template>
    </el-dialog>
    <el-dialog title="项目成员" v-model="memberVisible" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false" destroy-on-close width="fit-content">
        <el-form :model="member_form" :rules="member_rules" ref="member_form" label-width="auto" style="width: 600px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="member_form.name" placeholder="请输入姓名">
                    <template #prefix>
                        <el-icon>
                            <user />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="member_form.phone" placeholder="请输入电话">
                    <template #prefix>
                        <el-icon>
                            <iphone />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="member_form.email" placeholder="请输入电子邮箱">
                    <template #prefix>
                        <el-icon>
                            <message />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="职务" prop="job">
                <el-input v-model="member_form.job" placeholder="请输入职务">
                    <template #prefix>
                        <el-icon>
                            <tickets />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <div>
                    <el-button @click="cancelMember">取 消</el-button>
                    <el-button type="primary" @click="submitMember" color="#529b2e">确 定</el-button>
                </div>
            </span>
        </template>
    </el-dialog>
    <el-dialog title="同步配置" v-model="syncVisible" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false" destroy-on-close width="fit-content">
        <el-form :model="syncForm" :rules="syncRules" ref="syncForm" label-width="auto" style="width: 600px">
            <el-form-item label="数据源库名" prop="database">
                <el-input v-model="syncForm.database" placeholder="请输入数据源库名">
                    <template #prefix>
                        <el-icon>
                            <coin />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="数据源表名" prop="table">
                <el-input v-model="syncForm.table" placeholder="请输入数据源表名">
                    <template #prefix>
                        <el-icon>
                            <folder />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="数据源主机地址" prop="host">
                <el-input v-model="syncForm.host" placeholder="请输入数据源主机地址">
                    <template #prefix>
                        <el-icon>
                            <monitor />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="数据源端口" prop="port">
                <el-input v-model="syncForm.port" placeholder="请输入数据源端口">
                    <template #prefix>
                        <el-icon>
                            <location />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="数据源用户名" prop="username">
                <el-input v-model="syncForm.username" placeholder="请输入数据源用户名">
                    <template #prefix>
                        <el-icon>
                            <user />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="数据源密码" prop="password">
                <el-input v-model="syncForm.password" placeholder="请输入数据源密码" type="password" show-password>
                    <template #prefix>
                        <el-icon>
                            <key />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="中台表名" prop="midTable">
                <el-input v-model="syncForm.midTable" placeholder="请输入中台表名">
                    <template #prefix>
                        <el-icon>
                            <folder />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="简介" prop="desc">
                <el-input type="textarea" v-model="syncForm.desc" rows="5" placeholder="请输入简介"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <div>
                    <el-button @click="cancelSync">取 消</el-button>
                    <el-button type="primary" @click="submitSync" color="#529b2e">确 定</el-button>
                </div>
            </span>
        </template>
    </el-dialog>
    <el-scrollbar height="80vh">
        <!-- Project Logo and Name -->
        <div class="pd-header">
            <div>
                <img :src="projectDetail.logo" alt="logo"
                    style="width: 150px; height: 150px; border-radius: 4px; margin:auto;" />
                <el-icon @click="dialogVisible = true" class="edit-icon">
                    <Edit />
                </el-icon>
            </div>
            <div class="pd-intro">
                <div class="pd-name">
                    <div class="hori">
                        <h1>{{ projectDetail.projectname }}</h1>
                        <el-icon @click="introVisible = true" class="edit-icon">
                            <Edit />
                        </el-icon>
                    </div>
                    <el-button type="danger" @click="goBack()">返回</el-button>
                </div>
                <p class="pd-desc">{{ projectDetail.description }}</p>
            </div>
        </div>
        <div class="pd-body">
            <div class="line" />
            <div>
                <div class="hori">
                    <h2 style="display:flex;align-items: center;"><el-icon>
                            <user />
                        </el-icon>项目成员</h2>
                    <el-icon @click="memberVisible = true" class="edit-icon">
                        <Plus />
                    </el-icon>
                </div>
                <el-descriptions v-for="member in projectDetail.members" :key="member.id" class="margin-top"
                    :title="member.name" :column="5" size="default" border>
                    <el-descriptions-item width="fit-content" align="center">
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <iphone />
                                </el-icon>
                                电话
                            </div>
                        </template>
                        {{ member.phone }}
                    </el-descriptions-item>
                    <el-descriptions-item width="fit-content" align="center">
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Message />
                                </el-icon>
                                电子邮箱
                            </div>
                        </template>
                        <div style="width:150px">
                            {{ member.email }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item width="fit-content" align="center">
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <tickets />
                                </el-icon>
                                职务
                            </div>
                        </template>
                        <div style="width:80px">
                            <el-tag size="small">{{ member.job }}</el-tag>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item width="fit-content">
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <EditPen />
                                </el-icon>
                                编辑
                            </div>
                        </template>
                        <el-icon @click="editMember(member)" style="
                            cursor: pointer;
                            font-size: 20px;
                            color: #409eff;">
                            <Edit />
                        </el-icon>
                    </el-descriptions-item>
                    <el-descriptions-item width="fit-content">
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                                删除
                            </div>
                        </template>
                        <el-icon @click="deleteMember(member)" style="
                            cursor: pointer;
                            font-size: 20px;
                            color: red;">
                            <Delete />
                        </el-icon>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="line" />
            <div class="pd-data">
                <div class="hori">
                    <h2 style="display: flex; align-items: center;"><el-icon>
                            <Coin />
                        </el-icon>数据</h2>
                    <el-icon @click="syncVisible = true" class="edit-icon">
                        <Plus />
                    </el-icon>
                </div>
                <div v-for="table in projectDetail.tables" :key="table.id">
                    <div class="pd-table">
                        <div class="button_align">
                            <div style="display: flex; justify-content: left; align-items: center;">
                                <h3>{{ table.tableName }}</h3>
                                <el-button type="success" color="#529b2e" @click="syncConfig(table)"
                                    style="margin-left: 20px">同步配置</el-button>
                            </div>
                            <el-icon @click="deleteTable(table)" style="
                                cursor: pointer;
                                font-size: 20px;
                                color: red;">
                                <Delete />
                            </el-icon>
                        </div>
                        <p>{{ table.tableDesc }}</p>
                    </div>
                    <el-table :data="table.columns" max-height="250" style="width: 100%">
                        <el-table-column prop="name" label="列名" width="100" />
                        <el-table-column prop="data_type" label="属性" width="100" />
                        <el-table-column prop="default" label="默认值" width="100" />
                        <el-table-column prop="isPrimaryKey" label="主键" width="70" />
                        <el-table-column prop="isForeignKey" label="外键" width="70" />
                        <el-table-column prop="is_nullable" label="空类型" width="70" />
                        <el-table-column prop="comment" label="注释" />
                    </el-table>
                    <div class="dot-line" />
                </div>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
import { submitMember, deleteMember } from '@/api/project';
import { getProjectDetails } from '@/api/projectView';
import { importNewImg, submitIntro, submitSync, deleteTable } from '@/api/project';
import storage from '@/store/storage';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue'
import VueCropper from 'vue-cropper/lib/vue-cropper.vue';

export default {
    components: {
        VueCropper
    },
    data() {
        return {
            dialogVisible: ref(false),
            introVisible: ref(false),
            memberVisible: ref(false),
            syncVisible: ref(false),
            cropper: ref(null),
            uploadBtn: ref(null),
            elUpload: ref(null),
            image: ref(''),
            showButton: ref(false),
            options: reactive({
                img: '', // 原图文件
                autoCrop: true, // 默认生成截图框
                fixedBox: false, // 固定截图框大小
                canMoveBox: true, // 截图框可以拖动
                autoCropWidth: 200, // 截图框宽度
                autoCropHeight: 200, // 截图框高度
                fixed: true, // 截图框宽高固定比例
                fixedNumber: [1, 1], // 截图框的宽高比例
                centerBox: true, // 截图框被限制在图片里面
                canMove: false, // 上传图片不允许拖动
                canScale: false // 上传图片不允许滚轮缩放
            }),
            size: ref(150),
            projectDetail: {},
            isApplying: false,
            form: {
                projectname: '',
                description: ''
            },
            formrules: {
                projectname: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' }
                ]
            },
            member_form: {
                name: '',
                phone: '',
                email: '',
                job: ''
            },
            member_rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的电话号码', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur' }
                ],
                job: [
                    { required: true, message: '请输入职务', trigger: 'blur' }
                ]
            },
            isMember: false,
            syncForm: {
                database: '',
                table: '',
                host: '',
                port: '',
                username: '',
                password: '',
                midTable: '',
                desc: ''
            },
            syncRules: {
                database: [
                    { required: true, message: '请输入数据源库名', trigger: 'blur' }
                ],
                table: [
                    { required: true, message: '请输入数据源表名', trigger: 'blur' }
                ],
                host: [
                    { required: true, message: '请输入数据源主机地址', trigger: 'blur' }
                ],
                port: [
                    { required: true, message: '请输入数据源端口', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入数据源用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入数据源密码', trigger: 'blur' }
                ],
                midTable: [
                    { required: true, message: '请输入中台表名', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入简介', trigger: 'blur' }
                ]
            },
            isTable: false
        }
    },
    methods: {
        getProjectDetails() {
            getProjectDetails(storage.get('user').username).then(res => {
                this.projectDetail = res.data.projectDetail
                this.handleBoolean()
                this.form.projectname = this.projectDetail.projectname
                this.form.description = this.projectDetail.description
            }).catch(err => {
                console.log(err)
                // ElMessage.error('获取项目详情失败')
            })
        },
        isEmptyObject(obj) {
            if (typeof obj === 'object' && obj != null && Object.keys(obj).length !== 0) {
                return false;
            } else {
                return true;
            }
        },
        handleBoolean() {
            if (!this.projectDetail.tables.length) {
                ElMessage.info('该项目暂无数据')
                return
            }
            for (let i = 0; i < this.projectDetail.tables.length; i++) {
                if (this.isEmptyObject(this.projectDetail.tables[i].columns)) {
                    ElMessage.info('表' + this.projectDetail.tables[i].tableName + '暂无数据')
                    continue
                }
                for (let j = 0; j < this.projectDetail.tables[i].columns.length; j++) {
                    if (this.projectDetail.tables[i].columns[j].isPrimaryKey) {
                        this.projectDetail.tables[i].columns[j].isPrimaryKey = '√'
                    } else {
                        this.projectDetail.tables[i].columns[j].isPrimaryKey = ''
                    }
                    if (this.projectDetail.tables[i].columns[j].isForeignKey) {
                        this.projectDetail.tables[i].columns[j].isForeignKey = '√'
                    } else {
                        this.projectDetail.tables[i].columns[j].isForeignKey = ''
                    }
                    if (this.projectDetail.tables[i].columns[j].is_nullable) {
                        this.projectDetail.tables[i].columns[j].is_nullable = '√'
                    } else {
                        this.projectDetail.tables[i].columns[j].is_nullable = '×'
                    }
                }
            }
        },
        goBack() {
            this.$router.push({ name: 'DeveloperProjectView' })
        },
        getCrop() {
            // console.log(this.$refs.cropper)
            if (this.options.img === '') {
                ElMessage.error('请先选择图片')
                return
            }
            this.$refs.cropper.getCropBlob(data => {
                let formData = new FormData();
                formData.append("file", data);
                //上传接口
                importNewImg(formData).then((response) => {
                    this.projectDetail.logo = response.data.img;
                    ElMessage.success('上传成功');
                }).catch(() => {
                })

                this.closeDialog();
            });
        },
        // eslint-disable-next-line no-unused-vars
        upload(file, uploadFiles) {
            const isIMAGE = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
            const isLt5M = file.raw.size / 1024 / 1024 < 5;
            if (!isIMAGE) {
                ElMessage.warning("请选择 jpg、png 格式的图片");
                return false;
            }
            if (!isLt5M) {
                ElMessage.warning("图片大小不能超过 5MB");
                return false;
            }
            let reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = e => {
                this.options.img = e.target.result; // base64
            };
            this.$refs.elUpload.clearFiles(); //这里处理重新上传时，upload组件change事件错误问题
        },
        reupload() {
            this.$refs.uploadBtn.$el.click();
        },
        closeDialog() {
            this.dialogVisible = false;
            this.options.img = '';
        },
        showImageCropper() {
            this.dialogVisible = true
        },

        submitIntro() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    submitIntro(this.form).then(() => {
                        let user = storage.get('user')
                        user.username = this.form.projectname
                        storage.set('user', user)
                        this.getProjectDetails()
                        this.introVisible = false
                        ElMessage.success('修改成功')
                    }).catch(() => {
                        ElMessage.error('修改失败')
                    })
                }
            })
        },
        cancelIntro() {
            this.introVisible = false
            this.form.projectname = this.projectDetail.projectname
            this.form.description = this.projectDetail.description
        },
        submitMember() {
            this.$refs['member_form'].validate((valid) => {
                if (valid) {
                    const params = {
                        isMember: this.isMember,
                        name: this.member_form.name,
                        phone: this.member_form.phone,
                        email: this.member_form.email,
                        job: this.member_form.job
                    }
                    submitMember(params).then(() => {
                        this.getProjectDetails()
                        if (this.isMember) {
                            ElMessage.success('修改成功')
                        } else {
                            ElMessage.success('添加成功')
                        }
                    }).catch(() => {
                        if (this.isMember) {
                            ElMessage.error('修改失败')
                        } else {
                            ElMessage.error('添加失败')
                        }
                    }).finally(() => {
                        this.member_form.name = ''
                        this.member_form.phone = ''
                        this.member_form.email = ''
                        this.member_form.job = ''
                        this.isMember = false
                        this.memberVisible = false
                    })
                }
            })
        },
        cancelMember() {
            this.memberVisible = false
            this.member_form.name = ''
            this.member_form.phone = ''
            this.member_form.email = ''
            this.member_form.job = ''
        },
        editMember(member) {
            this.member_form.name = member.name
            this.member_form.phone = member.phone
            this.member_form.email = member.email
            this.member_form.job = member.job
            this.memberVisible = true
            this.isMember = true
        },
        deleteMember(member) {
            ElMessageBox.confirm('确认删除成员' + member.name + '?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteMember(member).then(() => {
                    this.getProjectDetails()
                    ElMessage.success('删除成功')
                }).catch(() => {
                    ElMessage.error('删除失败')
                })
            })
        },
        syncConfig() {
            this.syncVisible = true
            this.isTable = true
        },
        submitSync() {
            this.$refs['syncForm'].validate((valid) => {
                if (valid) {
                    const params = {
                        database: this.syncForm.database,
                        table: this.syncForm.table,
                        host: this.syncForm.host,
                        port: this.syncForm.port,
                        username: this.syncForm.username,
                        password: this.syncForm.password,
                        midTable: this.syncForm.midTable,
                        desc: this.syncForm.desc,
                        isTable: this.isTable
                    }
                    submitSync(params).then(() => {
                        this.getProjectDetails()
                        ElMessage.success('同步成功')
                        this.syncVisible = false
                        this.syncForm.database = ''
                        this.syncForm.table = ''
                        this.syncForm.host = ''
                        this.syncForm.port = ''
                        this.syncForm.username = ''
                        this.syncForm.password = ''
                        this.syncForm.midTable = ''
                        this.syncForm.desc = ''
                        this.isTable = false
                    }).catch(() => {
                        ElMessage.error('同步失败')
                    })
                }
            })
        },
        cancelSync() {
            this.syncVisible = false
            this.syncForm.database = ''
            this.syncForm.table = ''
            this.syncForm.host = ''
            this.syncForm.port = ''
            this.syncForm.username = ''
            this.syncForm.password = ''
            this.syncForm.midTable = ''
            this.syncForm.desc = ''
            this.isTable = false
        },
        deleteTable(table) {
            ElMessageBox.confirm('确认删除表' + table.tableName + '?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const params = {
                    projectname: this.projectDetail.projectname,
                    tablename: table.tableName
                }
                deleteTable(params).then(() => {
                    this.getProjectDetails()
                    ElMessage.success('删除成功')
                }).catch(() => {
                    ElMessage.error('删除失败')
                })
            })
        }
    },
    beforeMount() {
        this.getProjectDetails()
    }
}
</script>

<style lang="scss">
.dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .reupload {
        color: #409eff;
        cursor: pointer;
    }
}

.avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 560px;
    height: 350px;
    background-color: #f0f2f5;
    margin-right: 10px;
    border-radius: 4px;

    .upload {
        text-align: center;
        margin-bottom: 24px;
    }

    .avatar-crop {
        width: 560px;
        height: 350px;
        position: relative;

        .crop-box {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            overflow: hidden;
        }
    }
}
</style>

<style scoped>
.apply-choose {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 1000;
}

.pd-header {
    margin: 20px;
    display: flex;
    justify-content: space-between;
}

.pd-intro {
    width: 85%;
    font-size: 20px;
}

.pd-name {
    display: flex;
    justify-content: space-between;
}

.pd-desc {
    font-size: 16px;
    border: 1px #000 solid;
    border-radius: 10px;
    padding: 10px;
}

.pd-body {
    margin: auto;
    width: 100%;
    font-size: 20px;
}

.el-descriptions {
    margin-top: 20px;
}

.cell-item {
    display: flex;
    align-items: center;
    width: fit-content;
}

.margin-top {
    margin-top: 20px;
    width: fit-content;
}

.pd-data {
    font-size: 20px;
}

.pd-table {
    margin-top: 20px;
    font-size: 16px;
}

.line {
    width: 100%;
    margin: 20px auto;
    border-top: 1px solid gray;
}

.dot-line {
    width: 100%;
    margin: 20px auto;
    border-top: 1px dashed gray;
}

.button_align {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.edit-icon {
    cursor: pointer;
    font-size: 20px;
    margin-left: 10px;
    color: #409eff;
}

.hori {
    display: flex;
    align-items: center;
}
</style>