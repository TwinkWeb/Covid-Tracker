

<script>
import { Line, mixins } from 'vue-chartjs'
import numeral from "numeral";

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
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
    watch: {
  chartData () {
    this.$data._chart.update()
  }
},
   async mounted() {
           await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) =>{
            let xArray = []
        let yArray = []
        let lastDataPoint;
      for(let date in data[this.$store.state.cases]) {
        console.log(data[this.$store.state.cases])
        let  x = date;
        let y = data[this.$store.state.cases][date]
        xArray.push(x)
        yArray.push(y)
         }
         this.downloads = xArray
         this.labels = yArray
        }) 
        this.renderChart({
        labels: this.downloads,
        datasets: [
          {
            label: 'cases',
            backgroundColor: "rgba(204, 16, 52, 0.5)",
            borderColor: "#CC1034",
            data: this.labels
          }
        ]
      }, this.options)
    }
}
</script>

