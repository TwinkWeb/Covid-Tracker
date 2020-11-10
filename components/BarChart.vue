<script>
import { Line } from 'vue-chartjs'
import numeral from 'numeral'

export default {
  extends: Line,
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      downloads: [],
      labels: [],
      options: {
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              return numeral(tooltipItem.value).format('+0,0')
            },
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                parser: 'MM/DD/YY',
                tooltipFormat: 'll',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                callback: function (value, index, values) {
                  return numeral(value).format('0a')
                },
              },
            },
          ],
        },
      },
    }
  },
  watch: {
    chartData() {
      this.updateChart()
    },
  },
  mounted() {
    this.updateChart()
  },
  methods: {
    updateChart() {
      this.renderChart(
        {
          labels: this.$store.state.chartData.downloads,
          datasets: [
            {
              label: 'cases',
              backgroundColor: 'rgba(204, 16, 52, 0.5)',
              borderColor: '#CC1034',
              data: this.chartData,
            },
          ],
        },
        this.options
      )
    },
  },
}
</script>
