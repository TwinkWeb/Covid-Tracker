<template>
    <v-card @click="changeCaseType()">
        <v-card-title class="pb-0 font-weight-regular">
            <p class="mb-0 grey--text">{{ title }}</p>
        </v-card-title>
        <v-card-text class="pb-0 font-weight-bold cases--text display-1">
            <p class="mb-0">+{{ refactCases }}K</p>
        </v-card-text>
        <v-card-subtitle class="pt-0 font-weight-regular mb-0">
            <p class=" mb-0 pb-0 grey--text">Total {{ changeFormat }}</p>
        </v-card-subtitle>
    </v-card>
</template>


<script>
import numeral from "numeral";

export default {
    props: {
      title: {
          type: String,
          default: () => ''
      },
      cases: {
          type: Number,
          default: () => 0
      },
      total: {
          type: Number,
          default: () => 0
      }
    },
    computed: {
        refactCases() {
            return (this.cases / 1000).toFixed(1)
        },
        changeFormat() {
            return numeral(this.total).format("0.0a")
        }
    },
    methods: {
changeCaseType() {
    
}
    }
}
</script>