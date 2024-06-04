<template>
    <el-scrollbar height="86vh">
        <div class="au-edit">
            <h1>权限编辑</h1>
            <div style="display:flex; justify-content: left; align-items: center;">
                <el-form :model="form" ref="form" label-width="auto" style="width: 600px">
                    <el-form-item label="项目">
                        <el-col :span="10">
                            <el-select v-model="form.projectname" placeholder="请选择项目" style="width: 100%"
                                @change="form.tablename = '';">
                                <el-option v-for="project in projectOptions" :key="project.value" :label="project.label"
                                    :value="project.value" />
                            </el-select>
                        </el-col>
                        <el-col :span="4" class="text-center">
                            <span>数据表</span>
                        </el-col>
                        <el-col :span="10">
                            <el-select v-model="form.tablename" placeholder="请选择数据表"
                                @change="console.log(form.tablename);">
                                <el-option v-for="table in tableOptions" :key="table.value" :label="table.label"
                                    :value="table.value" />
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="权限等级">
                        <el-radio-group v-model="form.level">
                            <el-radio value="Null">无权限</el-radio>
                            <el-radio value="Read">只读</el-radio>
                            <el-radio value="ReadWrite">读写</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div class="button-center">
                    <el-button type="primary" @click="onSubmit">保存设定</el-button>
                    <el-button type="danger" @click="resetEdit">重置</el-button>
                </div>
            </div>
        </div>
        <div class="line" />
        <div class="au-check">
            <h1>权限查看</h1>
            <div style="display:flex; justify-content: center; align-items: center; width:100%;">
                <span style="margin: 10px;">数据表</span>
                <el-select v-model="searchForm.tablename" placeholder="请选择数据表" @change="console.log(form.tablename);"
                    style="width: 260px;">
                    <el-option v-for="table in tableOptions" :key="table.value" :label="table.label"
                        :value="table.value" />
                </el-select>
                <el-button type="primary" style="margin-left: 20px;" @click="onSearch">查询</el-button>
            </div>
            <el-table :data="tableData" max-height="400" border
                style="width: fit-content; margin: auto; margin-top: 20px">
                <el-table-column prop="projectname" label="项目名称" width="260"></el-table-column>
                <el-table-column prop="level" label="权限等级" width="180"></el-table-column>
            </el-table>
        </div>
        <div class="line" />
        <div class="au-request">
            <h1>权限请求</h1>
            <div class="body">
                <div class="search">
                    <div style="display:flex; justify-content: center; align-items: center; width:800px;">
                        <span style="margin-right: 10px;">项目</span>
                        <el-select v-model="requestForm.projectname" placeholder="请选择项目" style="width: 260px;"
                            @change="requestForm.tablename = '';">
                            <el-option v-for="project in projectOptions" :key="project.value" :label="project.label"
                                :value="project.value" />
                        </el-select>
                        <span style="margin: 10px;">数据表</span>
                        <el-select v-model="requestForm.tablename" placeholder="请选择数据表" style="width: 260px;">
                            <el-option v-for="table in tableOptions" :key="table.value" :label="table.label"
                                :value="table.value" />
                        </el-select>
                    </div>
                    <div class="search-button">
                        <el-button color="#529b2e" @click="goSearch()" round>搜索</el-button>
                        <el-button @click="refresh()" round>刷新</el-button>
                        <div v-if="isLoading">
                            <el-icon class="is-loading">
                                <Loading />
                            </el-icon>
                        </div>
                    </div>
                </div>
                <el-scrollbar height="72vh" ref="scrollbar">
                    <div v-for="message in messages" :key="message.id" class="message">
                        <div class="message-header">
                            <h1>{{ message.title }}</h1>
                        </div>
                        <div class="message-body">
                            <p>{{ message.content }}</p>
                        </div>
                        <div class="message-footer">
                            <div>
                                <h4>项目名：{{ message.projectname }}</h4>
                                <h4>时间：{{ message.time }}</h4>
                            </div>
                        </div>
                        <div class="message-button">
                            <el-button type="primary" @click="acceptMessage(message.id)">同意</el-button>
                            <el-button type="danger" @click="rejectMessage(message.id)">拒绝</el-button>
                        </div>
                    </div>
                </el-scrollbar>
                <div class="example-pagination-block">
                    <div class="inner-block">
                        <el-pagination v-model:current-page="curpage" :page-count="pages" layout="prev, pager, next"
                            @current-change="handleCurrentChange()" />
                    </div>
                </div>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
import { submitAuthEdit, searchAuth, getSearchPages, getAllPages, searchRequests, getRequests, approveRequest, rejectRequest } from '@/api/admin';
import storage from '@/store/storage';

export default {
    data() {
        return {
            projectOptions: [],
            tableOptions: [],
            form: {
                projectname: '',
                tablename: '',
                level: ''
            },
            searchForm: {
                tablename: ''
            },
            tableData: [],
            requestForm: {
                projectname: '',
                tablename: ''
            },
            scrollbar: null,
            messages: [],
            offset: 0,
            limit: 3,
            isSearching: false,
            pages: 1,
            curpage: 1,
            isLoading: false
        };
    },
    methods: {
        onSubmit() {
            if (this.form.projectname === '' || this.form.tablename === '' || this.form.level === '') {
                this.$message.error('请填写完整信息');
                return;
            }
            submitAuthEdit(this.form).then(() => {
                this.$message.success('权限设定成功');
                this.resetEdit();
            }).catch(() => {
                this.$message.error('权限设定失败');
            });
        },
        onSearch() {
            if (this.searchForm.tablename === '') {
                this.$message.error('请填写查询信息');
                return;
            }
            searchAuth(this.searchForm).then(res => {
                this.tableData = res.data.auths;
            }).catch(() => {
                this.$message.error('查询失败');
            });
        },
        resetEdit() {
            this.form.projectname = '';
            this.form.tablename = '';
            this.form.level = '';
            this.tableOptions = [];
        },
        goSearch() {
            if (this.requestForm.projectname === '' && this.requestForm.tablename === '') {
                this.$message.error('请填写搜索信息');
                return;
            }
            this.isSearching = true;
            this.offset = 0;
            this.curpage = 1;
            this.getSearchPages();
            this.searchProjects();
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' });
        },
        refresh() {
            this.isSearching = false;
            this.offset = 0;
            this.curpage = 1;
            this.requestForm = {
                projectname: '',
                tablename: ''
            };
            this.getAllPages();
            this.getNewProjects();
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' });
        },
        handleCurrentChange() {
            this.offset = (this.curpage - 1) * this.limit;
            if (this.isSearching) {
                this.searchProjects();
            } else {
                this.getNewProjects();
            }
            this.$refs.scrollbar.scrollTo({ top: 0, behavior: 'smooth' });
        },
        rejectMessage(id) {
            const params = {
                id: id
            };
            rejectRequest(params).then(() => {
                this.$message.success('已拒绝请求');
                this.refresh();
            }).catch(() => {
                this.$message.error('拒绝请求失败');
            });

        },
        acceptMessage(id) {
            const params = {
                id: id
            };
            approveRequest(params).then(() => {
                this.$message.success('已同意请求');
                this.refresh();
            }).catch(() => {
                this.$message.error('同意请求失败');
            });
        },
        getSearchPages() {
            this.isLoading = true;
            const params = {
                projectname: this.requestForm.projectname,
                tablename: this.requestForm.tablename,
                limit: this.limit
            };
            getSearchPages(params).then(res => {
                this.pages = res.data.pages;
            }).catch(() => {
                this.$message.error('获取页数失败');
            });
        },
        getAllPages() {
            this.isLoading = true;
            const params = {
                limit: this.limit
            };
            getAllPages(params).then(res => {
                this.pages = res.data.pages;
            }).catch(() => {
                this.$message.error('获取页数失败');
            });
        },
        searchProjects() {
            const params = {
                offset: this.offset,
                limit: this.limit,
                projectname: this.requestForm.projectname,
                tablename: this.requestForm.tablename
            };
            searchRequests(params).then(res => {
                this.messages = res.data.messages;
                this.isLoading = false;
            }).catch(() => {
                this.$message.error('获取数据失败');
            });
        },
        getNewProjects() {
            const params = {
                offset: this.offset,
                limit: this.limit
            };
            getRequests(params).then(res => {
                this.messages = res.data.messages;
                this.isLoading = false;
            }).catch(() => {
                this.$message.error('获取数据失败');
            });
        }
    },
    created() {
        let users = storage.get('users')
        let tables = storage.get('tables')
        for (let i = 0; i < users.length; i++) {
            if (users[i].identity === 'Developer')
                this.projectOptions.push({
                    label: users[i].username,
                    value: users[i].id
                });
        }
        for (let i = 0; i < tables.length; i++) {
            this.tableOptions.push({
                label: tables[i].table_name,
                value: tables[i].id
            })
        }
        this.getAllPages();
        this.getNewProjects();
    }
};
</script>

<style scoped>
.au-edit {
    padding: 20px;
}

.au-check {
    padding: 20px;
}

.au-request {
    padding: 20px;
}

.text-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
}

.line {
    width: 100%;
    margin: 20px auto;
    border-top: 1px solid gray;
}

.body {
    height: auto;
    background-color: #f1f0ea;
    border-radius: 15px;
    padding: auto;
}

.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: auto;
}

.search-button {
    margin: 10px;
    display: flex;
    align-items: center;
}

.message {
    margin: 20px;
    padding: 10px;
    background-color: white;
}

.message-header {
    font-size: 22px;
}

.message-body {
    margin-top: 10px;
}

.message-footer {
    display: flex;
    justify-content: flex-end;
}

.message-button {
    display: flex;
    justify-content: flex-end;
}

.example-pagination-block {
    width: 100%;
    margin-top: 10px;
    padding: 5px;
    display: flex;
    justify-content: center;
}

.inner-block {
    width: fit-content;
}
</style>