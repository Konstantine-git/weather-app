const container = document.getElementById("container")
const input = document.getElementById("cityInput")
const getWeather = document.getElementById("searchBtn")
const cityName = document.getElementById("cityName")
const temperature = document.getElementById("temp")
const weatherStatus = document.getElementById("status")
const weatherIcon = document.getElementById("icon")
const toggleBtn = document.getElementById("toggleBtn")


let measurment = 'Metric';

toggleBtn.addEventListener("click", () => {
    if(measurment === 'Metric'){
        measurment = 'Imperial'
        toggleBtn.textContent = 'Switch to °C'
    }
    else{
        measurment = 'Metric'
        toggleBtn.textContent = 'Switch to °F'
    }
})

function displayWeather(city){
    weatherIcon.style.animation = ''

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=20e999a0df1f3f061d72fda392e44c03&units=${measurment}`
 
    localStorage.setItem('lastCity', city)
 
    fetch(url)
    .then(result => {
     if(!result.ok){
         cityName.textContent = `Error! The city ${city} does not exist!`
         temperature.textContent = ''
         weatherStatus.textContent = ''
         container.style.backgroundColor = '#FB4B4E'
         throw new Error("Could Not Fetch Result!")
     }
     else{
         return result.json()
     }
    })
      .then(data => {
 
         let weather = data.weather[0].description
 
         cityName.textContent = data.name
         temperature.textContent = `Temperature (in ${measurment}): ${data.main.temp}`
         weatherStatus.textContent = `Status: ${weather}`
 
         weatherIcon.src = ''
         document.body.style.backgroundColor = ''
 
         if(weather === 'clear sky'){
             document.body.style.background = 'linear-gradient(#89CFF0 25%, #00BFFF)'
             container.style.backgroundColor = '#FADA5E'
             weatherIcon.src = 'Images/sun.png'
             getWeather.style.color = '#F7FFF7'
             getWeather.style.backgroundColor = '#00BFFF'
             toggleBtn.style.color = '#F7FFF7'
             toggleBtn.style.backgroundColor = '#00BFFF'
         }
         else if(weather.includes('clouds')){
             document.body.style.background = 'linear-gradient(#b2beb5 25%, #708090)'
             container.style.backgroundColor = '#003260'
             weatherIcon.src = 'Images/cloudy.png'
             getWeather.style.color = '#F7FFF7'
             getWeather.style.backgroundColor = '#010B13'
             toggleBtn.style.color = '#F7FFF7'
             toggleBtn.style.backgroundColor = '#010B13'
         }
         else if(weather.includes('rain') || weather.includes('drizzle')){
             document.body.style.background = 'linear-gradient(#b2beb5 25%, #708090)'
             container.style.backgroundColor = '#003260'
             weatherIcon.src = 'Images/heavy-rain.png'
             getWeather.style.color = '#F7FFF7'
             getWeather.style.backgroundColor = '#010B13'
             toggleBtn.style.color = '#F7FFF7'
             toggleBtn.style.backgroundColor = '#010B13'
         }
         else if(weather.includes('snow') || weather.includes('sleet')){
             document.body.style.background = 'linear-gradient(#f8f8ff 25%, #708090)'
             container.style.backgroundColor = '#FFFAF0'
             weatherIcon.src = 'Images/snowflake.png'
             getWeather.style.color = '#010B13'
             getWeather.style.backgroundColor = '#EFDFBB'
             toggleBtn.style.color = '#010B13'
             toggleBtn.style.backgroundColor = '#EFDFBB'
         }
         else if(weather.includes('thunderstorm')){
             document.body.style.background = 'linear-gradient(#3b3c36 25%, #100c08)'
             container.style.backgroundColor = '#6C6F7D'
             weatherIcon.src = 'Images/storm.png'
             getWeather.style.color = '#F7FFF7'
             getWeather.style.backgroundColor = '#4A412A'
             toggleBtn.style.color = '#F7FFF7'
             toggleBtn.style.backgroundColor = '#4A412A'
             
         }
         else if(weather === 'mist' || weather === 'smoke' || weather === 'haze' || weather === 'dust' || weather === 'fog' || weather === 'sand' || weather === 'ash'){
             document.body.style.background = 'linear-gradient(#b2beb5 25%, #708090)'
             container.style.backgroundColor = '#003260'
             weatherIcon.src = 'Images/fog.png'
             getWeather.style.color = '#F7FFF7'
             getWeather.style.backgroundColor = '#010B13'
             toggleBtn.style.color = '#F7FFF7'
             toggleBtn.style.backgroundColor = '#010B13'
         }
         weatherIcon.style.animation = 'slideDown 1s ease-out forwards'
      })
    .catch(error => console.log(error))
}

getWeather.addEventListener("click", () => {
   const city = input.value.trim();

   if(city){
    displayWeather(city)
   }
})

window.addEventListener("load", () => {
    const lastCity = localStorage.getItem('lastCity')
    if(lastCity){
        displayWeather(lastCity)
        input.value = lastCity
    }
})

