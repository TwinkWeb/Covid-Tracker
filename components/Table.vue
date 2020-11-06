<template>
    <div class="table">
         <v-simple-table
          class="mt-3"
          height="400px">
             <template v-slot:default>
                 <tbody>
              <tr
                v-for="item in $store.state.tableData"
                :key="item.name"
              >
                <td>{{ item.country }}</td>
                <td> <strong>{{ item.cases }}</strong></td>
              </tr>
               </tbody>
             </template>
         </v-simple-table>
    </div>
</template>

<script>
export default {
    computed: {
        sortTableData() {
            return this.$store.state.tableData.sort((a, b) => {
                if(a.cases > b.cases) {
                    return -1
                } else {
                    return 1;
                }
            })
        }
    }
}
</script>