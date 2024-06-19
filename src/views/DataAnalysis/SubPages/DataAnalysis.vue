<template>
    <div>
        <h1>学生个人学业能力观测</h1>
        <div>
            <el-input v-model="search" placeholder="请输入学号" style="width: 200px" />
            <el-button type="primary" @click="searchStudent">搜索</el-button>
        </div>
        <el-radio-group v-model="identity">
            <el-radio-button value="self" @click="goSelf">个人</el-radio-button>
            <el-radio-button value="class" @click="goClass">班级</el-radio-button>
            <el-radio-button value="year" @click="goYear">年级</el-radio-button>
        </el-radio-group>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="个人" v-if="identity === 'self'">
                <el-table-column label="课程业绩">
                    <el-table-column prop="public_required_gpa" label="公必绩点" width="100" />
                    <el-table-column prop="specialized_required_gpa" label="专必绩点" width="100" />
                    <el-table-column prop="specialized_elective_gpa" label="专选绩点" width="100" />
                </el-table-column>
                <el-table-column label="综合竞赛">
                    <el-table-column prop="party_building_awards" label="党建思政获奖" width="120" />
                    <el-table-column prop="art_competitions" label="艺术比赛获奖" width="120" />
                    <el-table-column prop="sports_competitions" label="体育比赛获奖" width="120" />
                    <el-table-column prop="entrepreneurship_competitions" label="实践创业竞赛获奖" width="140" />
                </el-table-column>
                <el-table-column label="专业竞赛">
                    <el-table-column prop="academic_competitions" label="学科竞赛获奖" width="120" />
                    <el-table-column prop="academic_achievements" label="学术成果获奖" width="120" />
                </el-table-column>
                <el-table-column prop="high_level_papers" label="高水平论文发表" width="140" />
                <el-table-column prop="volunteer_hours" label="志愿服务时长" width="120" />
                <el-table-column label="知识产权">
                    <el-table-column prop="patents" label="专利发明" width="120" />
                    <el-table-column prop="software_copyrights" label="软件著作权发明" width="140" />
                    <el-table-column prop="monographs_published" label="专利出版" width="120" />
                </el-table-column>
            </el-table-column>
            <el-table-column label="班级" v-if="identity === 'class'">
                <el-table-column label="课程业绩">
                    <el-table-column prop="public_required_gpa" label="公必绩点" width="100" />
                    <el-table-column prop="specialized_required_gpa" label="专必绩点" width="100" />
                    <el-table-column prop="specialized_elective_gpa" label="专选绩点" width="100" />
                </el-table-column>
                <el-table-column label="综合竞赛">
                    <el-table-column prop="party_building_awards" label="党建思政获奖" width="120" />
                    <el-table-column prop="art_competitions" label="艺术比赛获奖" width="120" />
                    <el-table-column prop="sports_competitions" label="体育比赛获奖" width="120" />
                    <el-table-column prop="entrepreneurship_competitions" label="实践创业竞赛获奖" width="140" />
                </el-table-column>
                <el-table-column label="专业竞赛">
                    <el-table-column prop="academic_competitions" label="学科竞赛获奖" width="120" />
                    <el-table-column prop="academic_achievements" label="学术成果获奖" width="120" />
                </el-table-column>
                <el-table-column prop="high_level_papers" label="高水平论文发表" width="140" />
                <el-table-column prop="volunteer_hours" label="志愿服务时长" width="120" />
                <el-table-column label="知识产权">
                    <el-table-column prop="patents" label="专利发明" width="120" />
                    <el-table-column prop="software_copyrights" label="软件著作权发明" width="140" />
                    <el-table-column prop="monographs_published" label="专利出版" width="120" />
                </el-table-column>
            </el-table-column>
            <el-table-column label="年级" v-if="identity === 'year'">
                <el-table-column label="课程业绩">
                    <el-table-column prop="public_required_gpa" label="公必绩点" width="100" />
                    <el-table-column prop="specialized_required_gpa" label="专必绩点" width="100" />
                    <el-table-column prop="specialized_elective_gpa" label="专选绩点" width="100" />
                </el-table-column>
                <el-table-column label="综合竞赛">
                    <el-table-column prop="party_building_awards" label="党建思政获奖" width="120" />
                    <el-table-column prop="art_competitions" label="艺术比赛获奖" width="120" />
                    <el-table-column prop="sports_competitions" label="体育比赛获奖" width="120" />
                    <el-table-column prop="entrepreneurship_competitions" label="实践创业竞赛获奖" width="140" />
                </el-table-column>
                <el-table-column label="专业竞赛">
                    <el-table-column prop="academic_competitions" label="学科竞赛获奖" width="120" />
                    <el-table-column prop="academic_achievements" label="学术成果获奖" width="120" />
                </el-table-column>
                <el-table-column prop="high_level_papers" label="高水平论文发表" width="140" />
                <el-table-column prop="volunteer_hours" label="志愿服务时长" width="120" />
                <el-table-column label="知识产权">
                    <el-table-column prop="patents" label="专利发明" width="120" />
                    <el-table-column prop="software_copyrights" label="软件著作权发明" width="140" />
                    <el-table-column prop="monographs_published" label="专利出版" width="120" />
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
    <div class="line" />
    <iframe
        src="http://47.121.29.57:5601/app/dashboards#/view/42357170-2bad-11ef-a7f0-11d198534a02?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&hide-filter-bar=true"
        height="78%" width="100%"></iframe>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAvgs } from '@/api/data';
import storage from '@/store/storage';
import { ElMessage } from 'element-plus';

export default {
    setup() {
        const identity = ref('self')
        const search = ref('')
        const tableData = ref([])

        const updateTableData = (key) => {
            tableData.value[0] = storage.get('avgs')[key] || []
        }

        const searchStudent = () => {
            getAvgs(search.value).then(res => {
                storage.set('avgs', res.data)
                updateTableData('avg1')
                ElMessage.success('数据获取成功')
                identity.value = 'self'
            }).catch(err => {
                console.error(err)
                ElMessage.error('获取数据失败, 请刷新页面重试')
            })
        }

        onMounted(() => {
            getAvgs(0).then(res => {
                storage.set('avgs', res.data)
                updateTableData('avg1')
                ElMessage.success('数据获取成功')
            }).catch(err => {
                console.error(err)
                ElMessage.error('获取数据失败, 请刷新页面重试')
            })
        })

        const goSelf = () => {
            identity.value = 'self'
            updateTableData('avg1')
        }

        const goClass = () => {
            identity.value = 'class'
            updateTableData('avg2')
        }

        const goYear = () => {
            identity.value = 'year'
            updateTableData('avg3')
        }

        return {
            identity,
            search,
            tableData,
            searchStudent,
            goSelf,
            goClass,
            goYear
        }
    }
}
</script>

<style scoped>
.line {
    width: 100%;
    margin: 20px auto;
    border-top: 1px solid gray;
}
</style>
