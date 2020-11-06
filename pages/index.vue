<template>
<v-container class="app d-flex flex-wrap">
  <v-card :elevation="0" class="flex-grow-1 primary" >
  <v-row class="app__countries">
  <v-col cols="6" >
  <h1>The Covid 19 Tracker</h1>
  </v-col>
  <v-spacer></v-spacer>
  <v-col cols="4" >
  <v-select
   :items="$store.state.countries"
   @change="onCountryChange"
   v-model="value"
   item-value="name"
   item-text="name"
    label="Select country"
    solo>
    </v-select>
  </v-col>
  </v-row>

  <v-row class="app__stats">
    <v-col cols="4">
      <info-box title="Coronavirus Cases" 
      :cases="$store.state.countryInfo.todayCases" 
      :total="$store.state.countryInfo.cases" />
    </v-col>
     <v-col cols="4">
      <info-box  title="Recovered" 
      :cases="$store.state.countryInfo.todayRecovered" 
      :total="$store.state.countryInfo.recovered"/>
    </v-col>
     <v-col cols="4">
      <info-box  title="Deaths" 
      :cases="$store.state.countryInfo.todayDeaths" 
      :total="$store.state.countryInfo.deaths"/>
    </v-col>
  </v-row>
  <v-row>
    <v-card>
      <h3>im map</h3>
    </v-card>
  </v-row>
  </v-card >
  <v-card :elevation="0" class="flex-grow-1 mx-5">
    <h3>Live cases by Country</h3>
        <Table/>
    <h3>Worldwide new cases</h3>
      <bar-chart :data="barChartData" :options="barChartOptions" :height="200" />

  </v-card>
</v-container>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
 data() {
   return {
    countries: [],
    value: '',
      barChartData: {
        labels: [
          '2019-06',
          '2019-07',
          '2019-08',
          '2019-09',
          '2019-10',
          '2019-11',
          '2019-12',
          '2020-01',
          '2020-02',
          '2020-03',
          '2020-04',
          '2020-05'
        ],
        datasets: [
          {
            label: 'Visits',
            data: [10, 15, 20, 30, 40, 50, 60, 70, 34, 45, 11, 78, 45],
            backgroundColor: '#003f5c'
          },
          {
            label: 'Pages Views',
            data: [30, 24, 57, 23, 68, 72, 25, 64, 133, 143, 165, 33, 56],
            backgroundColor: '#2f4b7c'
          },
          {
            label: 'Users',
            data: [45, 65, 30, 53, 34, 35, 26, 37, 34, 45, 67, 87, 98],
            backgroundColor: '#665191'
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Google analytics data',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
   }
 },
 async mounted() {
       this.showLine = true // showLine will only be set to true on the client. This keeps the DOM-tree in sync.

    this.setCountries()
   this.onCountryChangeAction('all')
 },
   asyncData () {
    const lineData = {} // some data
    const options = {} // some options
    return { lineData, options }
  },
 methods: {
   ...mapActions({
     onCountryChangeAction: 'onCountryChangeAction',
     setCountries: 'setCountries'

   }),
   ...mapMutations({
     selectCountry: 'selectCountry',
   }),
    onCountryChange() {
    this.onCountryChangeAction(this.value)
   }
 },
//  computed: {
//    ...mapGetters({
//      getCountries: 'getCountries'
//    })
//  }
}
</script>


<style>
body {
  background-color: #f5f5fb !important;
}

.v-messages {
  display:none !important;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
    display:none !important;

}




</style>
