<template>
    <v-card>
        <v-card-title class="pb-0 font-weight-regular">
            <p class="mb-0 grey--text">{{ title }}</p>
        </v-card-title>
        <v-card-text class="pb-0 font-weight-black">
            <p class="mb-0">{{ cases }}</p>
        </v-card-text>
        <v-card-subtitle class="pt-0 font-weight-regular mb-0">
            <p class=" mb-0 pb-0 grey--text">Total {{ total }}</p>
        </v-card-subtitle>
    </v-card>
</template>


<script>
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
    }
}
</script>