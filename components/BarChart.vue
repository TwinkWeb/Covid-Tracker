

<script>
import {
  Line,
  mixins
} from 'vue-chartjs'
const {
  reactiveProp
} = mixins
import numeral from "numeral";
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
    extends: Line,
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
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
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
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
}
        }
    },
props: {
    chartData: {
      type: Array,
      required: true
    },
    // chartLabels: {
    //   type: Array,
    //   required: true
    // }
},
watch: {
  chartData () {
    this.$data._chart.update()
  }
},
methods: {
 
},
...mapActions({
     setChartData: 'setChartData'
   }),
   async mounted() {
        this.renderChart({
        labels: this.$store.state.chartData.downloads,
        datasets: [
          {
            label: 'cases',
            backgroundColor: "rgba(204, 16, 52, 0.5)",
            borderColor: "#CC1034",
            data: this.chartData
          }
        ]
      }, this.options)
        
    }
}
</script>

