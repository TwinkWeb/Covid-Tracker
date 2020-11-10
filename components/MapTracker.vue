<template>
  <div>
    <div id="map-wrap" style="height: 400px; width: 100%">
      <client-only>
        <l-map class="app__map" :zoom="3" :center="center">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-circle
            v-for="country in $store.state.tableData"
            :key="country.country"
            :lat-lng="[country.countryInfo.lat, country.countryInfo.long]"
            :color="casesTypeColors[$store.state.cases].rgb"
            :fillColor="casesTypeColors[$store.state.cases].half_op"
            :fillOpacity="0.5"
            :radius="
              countRadius(
                country[$store.state.cases],
                casesTypeColors[$store.state.cases].multiplier
              )
            "
          >
          </l-circle>
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      casesTypeColors: {
        cases: {
          hex: '#CC1034',
          rgb: 'rgb(204, 16, 52)',
          half_op: 'rgba(204, 16, 52, 0.5)',
          multiplier: 300000,
        },
        recovered: {
          hex: '#7dd71d',
          rgb: 'rgb(125, 215, 29)',
          half_op: 'rgba(125, 215, 29, 0.5)',
          multiplier: 300000,
        },
        deaths: {
          hex: '#fb4443',
          rgb: 'rgb(251, 68, 67)',
          half_op: 'rgba(251, 68, 67, 0.5)',
          multiplier: 2000000,
        },
      },
    }
  },
  props: {
    center: {
      type: Array,
      default: () => [60, 100],
    },
  },
  methods: {
    countRadius(number, multi) {
      return Math.sqrt(number * multi)
    },
  },
}
</script>

<style>
.app__map {
  width: 100% !important;
  height: 100% !important;
  padding: 1rem !important;
  border-radius: 20px !important;
}
</style>
