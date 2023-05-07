const content = document.querySelector('.content')
const countryInput = document.querySelector('#country')
const regionInput = document.querySelector('#region')
const darkBtn = document.querySelector('.head-button_dark')
const lightBtn = document.querySelector('.head-button_light')
const body = document.querySelector('body')
const decor = document.querySelector('.decor')
const loader = document.querySelector('.lds-ring')

const createTemplate = (json) => {
    let template = ''
    json.forEach((item) => {
        template += `
            <div class="country">
                 <img src="${item.flags.png}" alt="" class="country__img">
                 <div class="country__text">
                     <h3 class="country__name">${item.name}</h3>
                     <p class="country__population">Population: <span class="country__population_qty">${item.population}</span></p>
                     <p class="country__region">Region: <span class="country__region_name">${item.region}</span></p>
                     <p class="country__capital">Capital: <span class="country__capital_name">${item.capital ?? 'No'}</span></p>
                 </div>
             </div>`
    })
    return template
}

const getCountryByName = () => {
    if (countryInput.value === "") {
        fetch('https://restcountries.com/v2/all')
        .then(response => {
            preLoader()
           return response.json()
        })
        .then(json => {
            filterRegion(json)
        })
        .catch(() => content.innerHTML = "Not Found" )
    } else {
        fetch(`https://restcountries.com/v2/name/${countryInput.value}`)
        .then(response => {
           return response.json()
        })
        .then(json => {
            filterRegion(json)
        })
        .catch(() => content.innerHTML = "Not Found" )
    }
    
}

const filterRegion = (json) => {
    switch(regionInput.value) {
        case 'All' : 
            content.innerHTML = createTemplate(json)
        break;
        case 'Africa' :
           filter(json)
        break
        case 'Americas' :
           filter(json)
        break
        case 'Asia' :
           filter(json)
        break
        case 'Europe' :
           filter(json)
        break
        case 'Oceania' :
           filter(json)
        break
        case 'Antarctic Ocean' :
           filter(json)
        break
        case 'Polar' :
           filter(json)
        break
        case 'Antarctic' :
           filter(json)
        break
    }
}

const filter = (json) => {
    const filteredObjects = json.filter(obj => obj.region === regionInput.value);
    content.innerHTML = createTemplate(filteredObjects)
}

countryInput.addEventListener('input', getCountryByName)

const getCountryByRegion = () => {
    if (regionInput.value === 'All') {
        getAllCountries()
    } else {
    fetch(`https://restcountries.com/v2/region/${regionInput.value}`)
    .then(response => {
        preLoader()
       return response.json()
    })
    .then(json => {
        content.innerHTML = createTemplate(json)
   })
   .catch(() => content.innerHTML = "Not Found" )
} 
}

regionInput.addEventListener('input', getCountryByRegion)


const getAllCountries = () => {
    fetch('https://restcountries.com/v2/all')
    .then(response => {
        preLoader()
       return response.json()
    })
    .then(json => {
        content.innerHTML = createTemplate(json)
})
}

getAllCountries()

const darkMode = () => {
    darkBtn.style.display = 'none'
    lightBtn.style.display = 'block'
    body.classList.add('dark')
    countryInput.classList.add('dark')
    regionInput.classList.add('dark')
    decor.classList.add('dark')
    content.classList.add('dark')
}

darkBtn.addEventListener('click', darkMode)

const lightMode = () => {
    lightBtn.style.display = 'none'
    darkBtn.style.display = 'block'
    body.classList.remove('dark')
    countryInput.classList.remove('dark')
    regionInput.classList.remove('dark')
    decor.classList.remove('dark')
    content.classList.remove('dark')
}

lightBtn.addEventListener('click', lightMode)

const preLoader = () => {
    content.innerHTML=`<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
}
 
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode()
}

