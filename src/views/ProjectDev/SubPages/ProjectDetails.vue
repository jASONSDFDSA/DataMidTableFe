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
    <el-scrollbar height="80vh">
        <!-- Project Logo and Name -->
        <div class="pd-header">
            <div>
                <img :src="projectDetail.logo" alt="logo"
                    style="width: 150px; height: 150px; border-radius: 4px; margin:auto;" />
                <el-icon @click="dialogVisible = true" style="cursor: pointer; font-size: 20px; margin-left: 10px;">
                    <Edit />
                </el-icon>
            </div>

            <div class="pd-intro">
                <div class="pd-name">
                    <h1>{{ projectDetail.projectname }}</h1>
                    <el-button type="danger" @click="goBack()">返回</el-button>
                </div>
                <p class="pd-desc">{{ projectDetail.description }}</p>
            </div>
        </div>
        <div class="pd-body">
            <div class="line" />
            <div>
                <h2 style="display:flex;align-items: center;"><el-icon>
                        <user />
                    </el-icon>项目成员</h2>
                <el-descriptions v-for="member in projectDetail.members" :key="member.id" class="margin-top"
                    :title="member.name" :column="3" size="default" border>
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
                </el-descriptions>
            </div>
            <div class="line" />
            <div class="pd-data">
                <h2 style="display: flex; align-items: center; margin-top: 20px;"><el-icon>
                        <Coin />
                    </el-icon>数据</h2>

                <div v-for="table in projectDetail.tables" :key="table.id">
                    <div class="pd-table">
                        <div class="button_align">
                            <h3>{{ table.tableName }}</h3>
                            <el-button type="success" color="#529b2e" @click="applyAuth(table)">申请权限</el-button>
                        </div>
                        <p>{{ table.tableDesc }}</p>
                    </div>
                    <el-table :data="table.columns" max-height="250" style="width: 100%">
                        <el-table-column prop="columnName" label="列名" width="100" />
                        <el-table-column prop="columnType" label="属性" width="100" />
                        <el-table-column prop="isPrimaryKey" label="主键" width="70" />
                        <el-table-column prop="isForeignKey" label="外键" width="70" />
                        <el-table-column prop="isNotNull" label="空类型" width="70" />
                        <el-table-column prop="desc" label="描述" />
                    </el-table>
                    <div class="dot-line" />
                </div>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
import { getProjectDetails } from '@/api/projectView'
import { applyAuth, importNewImg } from '@/api/project';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue'
import VueCropper from 'vue-cropper/lib/vue-cropper.vue';

export default {
    components: {
        VueCropper
    },
    data() {
        return {
            dialogVisible: ref(false),
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
            applyOptions: [
                {
                    value: '无权限',
                    label: '无权限'
                },
                {
                    value: '只读',
                    label: '只读'
                },
                {
                    value: '读写',
                    label: '读写'
                }
            ],
            authType: '',
            chosenTable: {},
        }
    },
    methods: {
        getProjectDetails() {
            getProjectDetails(this.$route.params.projectname).then(res => {
                this.projectDetail = res.data.projectDetail
                this.handleBoolean()
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
                    if (this.projectDetail.tables[i].columns[j].isNotNull) {
                        this.projectDetail.tables[i].columns[j].isNotNull = '√'
                    } else {
                        this.projectDetail.tables[i].columns[j].isNotNull = ''
                    }
                }
            }
        },
        goBack() {
            this.$router.push({ name: 'DeveloperProjectView' })
        },
        applyAuth(table) {
            this.isApplying = true;
            this.chosenTable = table;
        },
        cancelApply() {
            this.isApplying = false;
            this.chosenTable = {};
            this.authType = '';
        },
        confirmApply() {
            if (this.authType === '') {
                ElMessage.error('请选择权限类别')
                return
            }
            const params = {
                projectname: this.projectDetail.projectname,
                tableName: this.chosenTable.tableName,
                authType: this.authType
            }
            applyAuth(params).then(() => {
                ElMessage.success('申请成功')
                this.isApplying = false;
                this.chosenTable = {};
                this.authType = '';
            }).catch(err => {
                console.log(err)
                this.chosenTable = {};
            })
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
    width: 80%;
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
</style>