export const state = () => ({
    countries: [],
    selectedCountry: '',
    countryInfo: {},
    tableData: {},
    mapCenter: [60, 100],
    cases: "cases",
    chartData: {
        downloads: null,
        labels: null
    }
})



export const mutations = {
    changeCase(state, payload) {
     state.cases = payload
    },
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
    },
   
    setMapCenter(state, payload) {
        state.mapCenter = payload
    },
    setChartData(state, payload) {
        let xArray = []
        let yArray = []
        for(let date in payload[state.cases]) {
            let  x = date;
            let y = payload[state.cases][date]
            xArray.push(x)
            yArray.push(y)
         }
         
         state.chartData.downloads = xArray
         state.chartData.labels = yArray
        //  console.log(state.chartData.labels)
        //  console.log(state.chartData.downloads)
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
         if(context.state.selectedCountry != 'all') {
            context.commit('setMapCenter', [data.countryInfo.lat, data.countryInfo.long])
         }  
        context.commit('setCountryInfo', data)
       
     })
    },
   async setCountries(context) {
    await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response) => response.json())
   .then((data) =>{

     const countries = data.map((country) => ({
       name: country.country,
       value: country.countryInfo.iso2,
     }));
     context.commit('setTableData', data)
     context.commit('setCountries' , countries)
   })
   },

   async setChartData(context) {
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
    .then((response) => response.json())
    .then((data) =>{
    context.commit('setChartData', data)
    }) 
   }

}   