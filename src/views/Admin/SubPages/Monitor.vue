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
                    <div style="display: flex; flex-direction: column; width: fit-content;">
                        <p style="margin:auto">CPU使用率</p>
                        <el-progress type="dashboard" :percentage="percentageCPU" :color="colors" />
                        <p style="margin:auto">{{ CPUinfo }}</p>
                    </div>
                    <div style="display: flex; flex-direction: column; width: fit-content;">
                        <p style="margin:auto">内存使用率</p>
                        <el-progress type="dashboard" :percentage="percentageMem" :color="colors" />
                        <p style="margin:auto">{{ curMem + 'MB / ' + maxMem + "MB" }}</p>
                    </div>
                    <div style="display: flex; flex-direction: column; width: fit-content;">
                        <p style="margin:auto">交换区使用率</p>
                        <el-progress type="dashboard" :percentage="percentageShare" :color="colors" />
                        <p style="margin:auto">{{ curShare + 'MB / ' + maxShare + "MB" }}</p>
                    </div>
                    <div style="display: flex; flex-direction: column; width: fit-content;">
                        <p style="margin:auto">磁盘使用率</p>
                        <el-progress type="dashboard" :percentage="percentagetDisk" :color="colors" />
                        <p style="margin:auto">{{ curDisk + 'GB / ' + maxDisk + "GB" }}</p>
                    </div>
                </div>
                <div class="line" />
                <div style="width: 100%; display:flex;">
                    <div style="width: 50%;">
                        <h2>
                            CPU使用率监控
                        </h2>
                        <div class="echart" id="cpu" style="width: 100%; height: 300px;"></div>
                    </div>
                    <div style="width: 50%;">
                        <h2>
                            内存使用率监控
                        </h2>
                        <div class="echart" id="mem" style="width: 100%; height: 300px;"></div>
                    </div>
                </div>
                <div style="width: 100%; display:flex;">
                    <div style="width: 50%;">
                        <h2>
                            交换区使用率监控
                        </h2>
                        <div class="echart" id="share" style="width: 100%; height: 300px;"></div>
                    </div>
                    <div style="width: 50%;">
                        <h2>
                            磁盘使用率监控
                        </h2>
                        <div class="echart" id="disk" style="width: 100%; height: 300px;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="line" />
    </el-scrollbar>
</template>

<script>
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import { getSysInfo } from '@/api/admin'
import * as echarts from 'echarts'


export default {
    setup() {
        const maxMem = ref(100)
        const maxShare = ref(100)
        const maxDisk = ref(100)
        const curMem = ref(0)
        const curCPU = ref(0)
        const curShare = ref(0)
        const curDisk = ref(0)
        const percentageCPU = ref(0)
        const percentageMem = ref(0)
        const percentageShare = ref(0)
        const percentagetDisk = ref(0)
        var factor = 0

        const colors = [
            { color: '#f56c6c', percentage: 20 },
            { color: '#e6a23c', percentage: 40 },
            { color: '#5cb87a', percentage: 60 },
            { color: '#1989fa', percentage: 80 },
            { color: '#6f7ad3', percentage: 100 },
        ]

        const system = reactive({
            info: 'Windows10',
            IP: '192.168.1.1',
            runtime: 20,
        })

        const CPUinfo = ref('6核心')

        const cpuChart = ref({})

        const cpuX = ref([])

        const cpuY = ref([])

        const initCPUCharts = () => {

            const option = {
                title: {
                    text: 'CPU使用情况',
                    subtext: '近30小时数据',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { type: ['line'] },
                        saveAsImage: {}
                    }
                },
                calculable: false,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: cpuX.value
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }],
                series: [{
                    name: 'CPU核数',
                    type: 'line',
                    data: cpuY.value,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }]
            }
            cpuChart.value = echarts.init(document.getElementById('cpu'))
            cpuChart.value.setOption(option)
        }

        const memX = ref([])
        const memY = ref([])
        const memChart = ref({})
        const initmemChart = () => {
            const option = {
                title: {
                    text: '内存使用情况',
                    subtext: '近30小时数据',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { type: ['line'] },
                        saveAsImage: {}
                    }
                },
                calculable: false,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: memX.value
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }],
                series: [{
                    name: '内存占用',
                    type: 'line',
                    data: memY.value,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }]
            }
            memChart.value = echarts.init(document.getElementById('mem'))
            memChart.value.setOption(option)
        }

        const shareX = ref([])
        const shareY = ref([])
        const shareChart = ref({})
        const initshareChart = () => {
            const option = {
                title: {
                    text: '交换区使用情况',
                    subtext: '近30小时数据',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { type: ['line'] },
                        saveAsImage: {}
                    }
                },
                calculable: false,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: shareX.value
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }],
                series: [{
                    name: '交换区占用',
                    type: 'line',
                    data: shareY.value,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }]
            }
            shareChart.value = echarts.init(document.getElementById('share'))
            shareChart.value.setOption(option)
        }

        const diskX = ref([])
        const diskY = ref([])
        const diskChart = ref({})

        const initdiskChart = () => {
            const option = {
                title: {
                    text: '磁盘使用情况',
                    subtext: '近30小时数据',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { type: ['line'] },
                        saveAsImage: {}
                    }
                },
                calculable: false,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: diskX.value
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }],
                series: [{
                    name: '磁盘占用',
                    type: 'line',
                    data: diskY.value,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }]
            }
            diskChart.value = echarts.init(document.getElementById('disk'))
            diskChart.value.setOption(option)
        }


        onMounted(() => {
            getSysInfo().then((res) => {
                system.info = res.data.sysinfo.info;
                system.IP = res.data.sysinfo.IP;
                system.runtime = res.data.sysinfo.runtime;
                CPUinfo.value = res.data.cpuinfo;
                curCPU.value = res.data.curcpu;
                curMem.value = res.data.curmem;
                curShare.value = res.data.curshare;
                curDisk.value = res.data.curdisk;
                maxMem.value = res.data.maxmem;
                maxShare.value = res.data.maxshare;
                maxDisk.value = res.data.maxdisk;
                cpuX.value = res.data.dateX;
                cpuY.value = res.data.cpuY;
                memX.value = res.data.dateX;
                memY.value = res.data.memY;
                shareX.value = res.data.dateX;
                shareY.value = res.data.shareY;
                diskX.value = res.data.dateX;
                diskY.value = res.data.diskY;


                initCPUCharts()
                initmemChart()
                initshareChart()
                initdiskChart()
                let id1 = setInterval(() => {
                    factor = factor + 10
                    percentageCPU.value = Math.floor(factor / 100 * curCPU.value)
                    percentageMem.value = Math.floor(factor * (curMem.value / maxMem.value))
                    percentageShare.value = Math.floor(factor * (curShare.value / maxShare.value))
                    percentagetDisk.value = Math.floor(factor * (curDisk.value / maxDisk.value))
                }, 100)
                setTimeout(() => {
                    clearInterval(id1)
                }, 1000)
            }).catch((err) => {
                console.log(err)
            })
        })


        return {
            system,
            percentageCPU,
            percentageMem,
            percentageShare,
            percentagetDisk,
            colors,
            CPUinfo,
            factor,
            maxMem,
            maxShare,
            maxDisk,
            curMem,
            curShare,
            curDisk,
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

.demo-progress {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
}

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    max-width: 600px;
}

.demo-progress .el-progress--circle {
    margin-right: 15px;
}
</style>