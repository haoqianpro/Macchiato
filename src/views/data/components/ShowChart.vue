<template>
  <div class="chart" id="chart1" width="800px" heigth="600px"></div>
  <!-- <button @click="fresh">刷新</button> -->
  <el-button type="primary" @click="fresh">刷新</el-button>
</template>

<script>
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
export default {
  name: 'ShowChart',
  props: {
    checkData: Array
  },
  data() {
    return {
      passData: null,
      option: {
        title: {
          text: '各省份当日疫情确诊人数'
        },
        xAxis: {
          type: 'category',
          data: null
        },
        yAxis: {
          type: 'value'
        },
        series: {
          name: '确诊人数',
          type: 'bar',
          data: null
        }
      }
    }
  },
  // mounted() {
  //   // 基于准备好的dom，初始化echarts实例
  //   var myChart = echarts.init(document.getElementById('chart1'))
  //   // 绘制图表
  //   myChart.setOption(this.option)
  // },
  methods: {
    fresh() {
      // 绘制图表
      this.passData = this.checkData
      this.passData = this.checkData
      this.option.xAxis.data =
        this.passData && this.passData.map(item => item.name)
      this.option.series.data =
        this.passData && this.passData.map(item => item.today.confirm)
      var myChart = echarts.init(document.getElementById('chart1'))
      myChart.dispose()
      myChart = echarts.init(document.getElementById('chart1'))
      myChart.setOption(this.option)
    }
  }
  // created() {
  //   // 基于准备好的dom，初始化echarts实例
  //   var myChart = echarts.init(document.getElementById('chart1'))
  //   // 绘制图表
  //   myChart.setOption({
  //     title: {
  //       text: '各省疫情确诊人数'
  //     },
  //     tooltip: {},
  //     xAxis: {
  //       type: 'category',
  //       // eslint-disable-next-line
  //       data: checkData.map(item => item.name)
  //     },
  //     yAxis: {
  //       type: 'value'
  //     },
  //     series: [
  //       {
  //         name: '销量',
  //         type: 'bar',
  //         // eslint-disable-next-line
  //         data: checkData.map(item => item.today.confirm)
  //       }
  //     ]
  //   })
  // }
}
</script>

<style>
.chart {
  box-sizing: border-box;
  width: 100%;
  height: 70vh;
  padding: 10px 5%;
  margin-bottom: 5px;
}
</style>
