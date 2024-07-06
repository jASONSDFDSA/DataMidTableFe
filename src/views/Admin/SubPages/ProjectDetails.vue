<template>
    <el-scrollbar height="80vh">
        <!-- Project Logo and Name -->
        <div class="pd-header">
            <img :src="'http://127.0.0.1:2020'+projectDetail.logo" alt="logo"
                style="width: 150px; height: 150px; border-radius: 10px; margin:auto;" />
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
                </div>
                <div class="dot-line" />
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
import { getProjectDetails } from '@/api/projectView'
import { ElMessage } from 'element-plus';
export default {
    data() {
        return {
            projectDetail: {},
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
                    if (this.projectDetail.tables[i].columns[j].key === 'PRI') {
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
            this.$router.push({ name: 'AdminUserManagement' })
        },
    },
    created() {
        this.getProjectDetails()
    }
}
</script>

<style scoped>
.pd-header {
    margin: 20px;
    display: flex;
    justify-content: center;
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