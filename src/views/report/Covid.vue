<template>
  <div class="canvas">
    <div class="tabContent">
      <div style="background-color: rgb(255, 250, 247)">
        <p style="color: rgb(229, 118, 49)">
          +{{
            data.diseaseh5Shelf && data.diseaseh5Shelf.chinaAdd.localConfirmH5
          }}
        </p>
        <p>本土确诊</p>
      </div>
      <div style="background-color: rgb(254, 247, 255)">
        <p style="color: rgb(202, 63, 129)">
          +{{ data.diseaseh5Shelf && data.diseaseh5Shelf.chinaAdd.noInfectH5 }}
        </p>
        <p>本土无症状</p>
      </div>
      <div style="background-color: rgb(255, 244, 244)">
        <p style="color: rgb(190, 33, 33)">
          +{{
            data.diseaseh5Shelf && data.diseaseh5Shelf.chinaTotal.confirmAdd
          }}
        </p>
        <p>确诊病例</p>
      </div>
      <div style="background-color: rgb(255, 250, 247)">
        <p style="color: rgb(229, 118, 49)">
          {{
            data.diseaseh5Shelf && data.diseaseh5Shelf.chinaTotal.localConfirm
          }}
        </p>
        <p>现有本土确诊</p>
      </div>
      <div style="background-color: rgb(254, 247, 255)">
        <p style="color: rgb(202, 63, 129)">
          {{
            data.diseaseh5Shelf && data.diseaseh5Shelf.chinaTotal.nowLocalWzz
          }}
        </p>

        <p>现有本土无症状</p>
      </div>
      <div style="background-color: rgb(255, 244, 244)">
        <p style="color: rgb(190, 33, 33)">
          {{ data.diseaseh5Shelf && data.diseaseh5Shelf.chinaTotal.nowConfirm }}
        </p>
        <p>现有确诊病例</p>
      </div>
      <div style="background-color: rgb(255, 247, 247)">
        <p style="color: rgb(242, 58, 59)">
          {{
            data.diseaseh5Shelf &&
            data.diseaseh5Shelf.chinaTotal.highRiskAreaNum
          }}
        </p>
        <p>高风险地区</p>
      </div>
      <div style="background-color: rgb(255, 250, 247)">
        <p style="color: rgb(240, 89, 38)">
          {{
            data.diseaseh5Shelf &&
            data.diseaseh5Shelf.chinaTotal.mediumRiskAreaNum
          }}
        </p>
        <p>中风险地区</p>
      </div>
      <div style="background-color: rgb(243, 246, 248)">
        <p style="color: rgb(78, 90, 101)">
          {{ data.diseaseh5Shelf && data.diseaseh5Shelf.chinaTotal.dead }}
        </p>
        <p>累计死亡</p>
      </div>
    </div>

    <div class="grid">
      <div class="column column1">
        <div class="chart" id="chart1"></div>
        <div class="chart" id="chart2"></div>
      </div>
      <div class="map-container" id="mapContainer"></div>
      <div class="column column3">
        <div class="chart" id="chart3"></div>
        <div class="chart" id="chart4"></div>
      </div>
    </div>
    <!-- 地图 -->
  </div>
</template>

<script setup>
import { getLine, getOnsInfo } from '@/api/covid'
import { onMounted, reactive, ref } from 'vue'
// 引入 ECharts 主模块
import * as echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
const data = ref({})
// const lineData = ref({})
const chinaDayAddListNew = reactive([])
const chinaDayListNew = reactive([])

const drawMap = () => {
  // 基于准备好的dom，初始化echarts实例
  echarts.dispose(document.getElementById('mapContainer'))
  var chinaMap = echarts.init(document.getElementById('mapContainer'))
  // window.onresize = chinaMap.resize // 窗口或框架被调整大小时执行chinaMap.resize
  chinaMap.setOption({
    // 进行相关配置
    tooltip: {}, // 鼠标移到图里面的浮动提示框
    title: {
      show: true,
      text: '全国疫情分布(含港澳台)',
      x: 'center'
    },
    // dataRange: {
    //   show: false,
    //   min: 0,
    //   max: 1000,
    //   text: ['High', 'Low'],
    //   realtime: true,
    //   calculable: true,
    //   color: ['orangered', '#FF9B52', '#FFD068']
    // },
    visualMap: {
      // min: 0, // 最小值
      // max: 20000, // 最大值
      // text: ['20000', '0'],
      // realtime: false,
      // calculable: false,
      // inRange: {
      //   color: ['#e6f7ff', '#1890FF', '#0050b3'] // 渐变颜色
      // }
      show: true,
      type: 'piecewise',
      splitNumber: 6,
      pieces: [
        { min: 1000, label: '1000人及以上' },
        { min: 100, max: 999, label: '100-999人' },
        { min: 30, max: 99, label: '30-99人' },
        { min: 10, max: 29, label: '10-29人' },
        { min: 1, max: 9, label: '1-9人' },
        { max: 0, label: '0人' }
      ]
    },
    geo: {
      // 这个是重点配置区
      map: 'china', // 表示中国地图
      roam: false,
      label: {
        normal: {
          show: true, // 是否显示对应地名
          textStyle: {
            color: '#222'
          }
        }
      },
      itemStyle: {
        normal: {
          // borderColor: '#293171',
          // borderWidth: '2',
          // areaColor: '#0A0F33'
        }
        // emphasis: {
        //   areaColor: null,
        //   shadowOffsetX: 0,
        //   shadowOffsetY: 0,
        //   shadowBlur: 20,
        //   borderWidth: 0,
        //   shadowColor: 'rgba(0, 0, 0, 0.5)'
        // }
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo' // 对应上方配置
      },
      {
        name: '新增确诊', // 浮动框的标题
        type: 'map',
        geoIndex: 0,
        data: data.value.diseaseh5Shelf.areaTree[0].children.map(item => ({
          name: item.name,
          value: item.children[0].today.local_confirm_add
        }))
      }
    ]
  })
}

const drawChart1 = () => {
  echarts.dispose(document.getElementById('chart1'))
  const chart = echarts.init(document.getElementById('chart1'))
  const option = {
    title: {
      show: true,
      text: '全国新增本土确诊',
      top: 'auto',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: chinaDayAddListNew.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: 30,
      bottom: 24,
      left: 45,
      right: 10
    },
    series: [
      {
        data: chinaDayAddListNew.map(item => item.localConfirmadd),
        type: 'line',
        smooth: true
      }
    ]
  }
  chart.setOption(option)
}

const drawChart2 = () => {
  echarts.dispose(document.getElementById('chart2'))
  const chart = echarts.init(document.getElementById('chart2'))
  const option = {
    title: {
      show: true,
      text: '全国新增本土无症状',
      top: 'auto',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: chinaDayAddListNew.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: 30,
      bottom: 24,
      left: 45,
      right: 10
    },
    series: [
      {
        data: chinaDayAddListNew.map(item => item.localinfectionadd),
        type: 'line',
        smooth: true
      }
    ]
  }
  chart.setOption(option)
}

const drawChart3 = () => {
  echarts.dispose(document.getElementById('chart3'))
  const chart = echarts.init(document.getElementById('chart3'))
  const option = {
    title: {
      show: true,
      text: '全国现有本土确诊',
      top: 'auto',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: chinaDayListNew.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: 30,
      bottom: 24,
      left: 45,
      right: 10
    },
    series: [
      {
        data: chinaDayListNew.map(item => item.localConfirmH5),
        type: 'line',
        smooth: true
      }
    ]
  }
  chart.setOption(option)
}

const drawChart4 = () => {
  echarts.dispose(document.getElementById('chart4'))
  const chart = echarts.init(document.getElementById('chart4'))
  const option = {
    title: {
      show: true,
      text: '全国现有本土无症状',
      top: 'auto',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: chinaDayListNew.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: 30,
      bottom: 24,
      left: 45,
      right: 10
    },
    series: [
      {
        data: chinaDayListNew.map(item => item.noInfectH5),
        type: 'line',
        smooth: true
      }
    ]
  }
  chart.setOption(option)
}

onMounted(() => {
  getOnsInfo().then(res => {
    data.value = res.data
    drawMap()
  })
  getLine().then(res => {
    chinaDayAddListNew.push(...res.data.chinaDayAddListNew)
    chinaDayListNew.push(...res.data.chinaDayListNew)
    drawChart1()
    drawChart2()
    drawChart3()
    drawChart4()
  })
})
</script>

<style scoped>
.canvas {
  display: flex;
  flex-direction: column;
}
.map-container {
  flex: 1;
  width: 640px;
  height: 400px;
}
.grid {
  display: flex;
  flex: 1;
}
.column1,
.column3 {
  width: 310px;
}
.chart {
  width: 310px;
  height: 210px;
  margin-bottom: 5px;
}
.tabContent {
  display: flex;
  justify-content: space-between;
  height: 110px;
  margin-bottom: 20px;
}
.tabContent > div {
  width: 120px;
  text-align: center;
  color: #222;
}
.tabContent > div p:first-child {
  font-size: 20px;
}
</style>
