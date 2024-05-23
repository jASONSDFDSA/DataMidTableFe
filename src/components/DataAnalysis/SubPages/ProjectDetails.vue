<template>
    <el-scrollbar height="80vh">
        <div class="pd-header">
            
        </div>
    </el-scrollbar>
</template>

<script>
import { getProjectDetails } from '@/api/projectView'
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
            }).catch(() => {
                this.$message.error('获取项目详情失败')
            })
        }
    },
    beforeMount() {
        this.getProjectDetails()
    }
}
</script>