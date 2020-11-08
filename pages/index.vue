<template>
<v-container class="app d-flex justify-space-between flex-wrap">
  <v-card :elevation="0" class=" primary" >
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
    <v-col cols="12" class="map-wrap">
      <MapTracker :center="$store.state.mapCenter" />
    </v-col>
  </v-row>
  </v-card >
  <v-card :elevation="0" class="mx-5">
    <h3 class="px-4">Live cases by Country</h3>
        <Table/>
      <bar-chart :height="200" />

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
   }
 },
 mounted() {
    this.setCountries()
   this.onCountryChangeAction('all') 
 },
 
 methods: {
   ...mapActions({
     onCountryChangeAction: 'onCountryChangeAction',
     setCountries: 'setCountries',

   }),
   ...mapMutations({
     selectCountry: 'selectCountry',
   }),
    onCountryChange() {
    this.onCountryChangeAction(this.value)
   }
 },

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
