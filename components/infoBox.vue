<template>
  <v-card @click="changeId(id)">
    <v-card-title class="pb-0 font-weight-regular">
      <p class="mb-0 grey--text">{{ title }}</p>
    </v-card-title>
    <v-card-text
      :class="[
        this.title === 'Recovered'
          ? 'pb-0 font-weight-bold recoveredCases--text display-1'
          : 'pb-0 font-weight-bold cases--text display-1',
      ]"
    >
      <p class="mb-0">+{{ refactCases }}K</p>
    </v-card-text>
    <v-card-subtitle class="pt-0 font-weight-regular mb-0">
      <p class="mb-0 pb-0 grey--text">Total {{ changeFormat }}</p>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import numeral from 'numeral'

export default {
  data() {
    return {
      num: 1,
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: () => '',
    },
    cases: {
      type: Number,
      default: () => 0,
    },
    total: {
      type: Number,
      default: () => 0,
    },
  },
  methods: {
    changeId(id) {
      this.num = id
    },
  },
  computed: {
    refactCases() {
      return (this.cases / 1000).toFixed(1)
    },
    changeFormat() {
      return numeral(this.total).format('0.0a')
    },
  },
}
</script>

<style>
.border-top-trasparent {
  border-top: 10px transparent solid !important;
}
</style>
