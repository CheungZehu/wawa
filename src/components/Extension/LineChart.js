import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    lineData: Object
  },
  created() {
    console.log(this.lineData)
  },
  mounted() {
    var _this = this;
    // Overwriting base render method with actual data.
    this.renderChart(_this.lineData, { responsive: true, maintainAspectRatio: true })
  }
}