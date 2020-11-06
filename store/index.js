export const state = () => ({
    countries: [],
    selectedCountry: '',
    countryInfo: {},
    tableData: {}
})

export const getters = {
    sortedTableData: s => s.tableData
}



export const mutations = {
    selectCountry(state, payload) {
        state.selectedCountry = payload
    },
    setCountryInfo(state, payload) {
        state.countryInfo = payload
    },
    setCountries(state, payload) {
        state.countries = payload
    },
    setTableData(state, payload) {
        state.tableData = payload
    }

}

export const actions = {
   async onCountryChangeAction(context, payload) {
    context.commit('selectCountry', payload)
     const url =
      context.state.selectedCountry == 'all' ?   
      'https://disease.sh/v3/covid-19/all' : 
      'https://disease.sh/v3/covid-19/countries/' + context.state.selectedCountry
     await fetch(url)
     .then(response => response.json())
     .then(data => {
        context.commit('setCountryInfo', data)
     })
    },
   async setCountries(context) {
    await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response) => response.json())
   .then((data) =>{
     const countries = data.map((country) => ({
       name: country.country,
       value: country.countryInfo.iso2
     }));
     context.commit('setTableData', data)
     context.commit('setCountries' , countries)
   })
   }
}