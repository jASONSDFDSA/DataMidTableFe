<template>
    <el-scrollbar height="80vh">
        <div class="pd-body">
            <div class="pd-data">
                <div style="display: flex; align-items: center;">
                    <h2 style="display: flex; align-items: center; margin-top: 20px; margin-right: 50px;"><el-icon>
                            <setting />
                        </el-icon>系统</h2>
                    <span>系统信息：{{ system.info }}</span>
                    <span style="margin-left: 20px">IP地址：{{ system.IP }}</span>
                    <span style="margin-left: 20px">运行时间：{{ system.runtime }}小时</span>
                </div>
                <div class="line" />
                <h2 style="display: flex; align-items: center; margin-top: 20px;">
                    状态
                </h2>
                <div class="demo-progress">
                    <el-progress type="dashboard" :percentage="percentageCPU" :color="colors" />
                    <el-progress type="dashboard" :percentage="percentageMem" :color="colors" />
                    <div>
                        <el-button-group>
                            <el-button :icon="Minus" @click="decrease" />
                            <el-button :icon="Plus" @click="increase" />
                        </el-button-group>
                    </div>
                </div>
                <div class="line" />
                <h3 style="margin-top: 20px;">
                    项目开发用户
                </h3>
            </div>
        </div>
        <div class="line" />
    </el-scrollbar>
</template>

<script>
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import { Minus, Plus } from '@element-plus/icons-vue'


export default {
    setup() {
        const maxCPU = ref(100)
        const maxMem = ref(100)
        const maxShare = ref(100)
        const maxDisk = ref(100)
        const percentageCPU = ref(100)
        const percentageMem = ref(0)
        const percentageShare = ref(0)
        const percentagetDisk = ref(0)
        const factor = ref(0)

        const colors = [
            { color: '#f56c6c', percentage: 20 },
            { color: '#e6a23c', percentage: 40 },
            { color: '#5cb87a', percentage: 60 },
            { color: '#1989fa', percentage: 80 },
            { color: '#6f7ad3', percentage: 100 },
        ]

        onMounted(() => {
            setInterval(() => {
                percentageCPU.value = Math.floor(Math.random() * maxCPU.value)
                percentageMem.value = Math.floor(Math.random() * maxMem.value)
                percentageShare.value = Math.floor(Math.random() * maxShare.value)
                percentagetDisk.value = Math.floor(Math.random() * maxDisk.value)
            }, 100)
        })
        const system = reactive({
            info: 'Windows10',
            IP: '192.168.1.1',
            runtime: 20,
        })

        return {
            system,
            percentageCPU,
            percentageMem,
            percentageShare,
            percentagetDisk,
            colors,
            Minus,
            factor,
            Plus
        }
    }
}

</script>

<style scoped>
.pd-body {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
}

.pd-data {
    display: flex;
    flex-direction: column;
}

.line {
    height: 1px;
    background-color: #ebeef5;
    margin: 20px 0;
}

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    max-width: 600px;
}

.demo-progress .el-progress--circle {
    margin-right: 15px;
}
</style>