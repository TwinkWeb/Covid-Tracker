<template>
  <div>
    <div id="map-wrap" style="height: 100vh; width: 100%;">
      <client-only>
        <l-map class="app__map" :zoom="13" :center="center">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
          <!-- <l-marker :lat-lng="tracker"></l-marker> -->
          <Circle
          :center="[60, 100]"
          color = "red"
          fillColor = "#f03"
          :fillOpacity ="0.5"
          :radius ="50"
          />
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
import { Circle ,Popup} from 'nuxt-leaflet'
export default {
  data() {
    return {
       casesTypeColors:{
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
}
    }
  },
    props: {
     center: {
         type: Array,
         default: () => [60, 100]
     },
    //  tracker: {
    //    type: Array
    //  }
     
    },
  mounted() {
    console.log(this.$store.state.tableData)
  }
};
</script>


<style>
.app__map {
 width: 100% !important;
  height: 100% !important;
  padding: 1rem !important;
  border-radius: 20px !important;
}
</style>