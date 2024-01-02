let latitude = ""
let longitude = ""
let mylocation = ""

getWeather()
async function getWeather(){
    let city = document.querySelector("#cityinput").value
    await this.getLocation()
    
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6c43e0586fa84e79823151555233012&q=${latitude},${longitude}&days=3`)
    console.log(mylocation)

    if(city == ""){
        if(latitude==""){
            return false
        }else{
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6c43e0586fa84e79823151555233012&q=${latitude},${longitude}&days=3`)
    }
    }else{
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6c43e0586fa84e79823151555233012&q=${city}&days=3`)
    }
    response = await response.json()
    let location = response.location
    let weather = response.forecast.forecastday
    console.log(weather)
    let divs = "";
    for (let i = 0; i<weather.length; i++){
        divs += `<div class="day">
        <p> ${weather[i].day.maxtemp_c} </p>
        <img src="${weather[i].day.condition.icon}">
        <p>${location.name}</p>
        </div>`
    }
    document.querySelector(".forecast").innerHTML = divs
    
}




document.querySelector("#search").addEventListener("click", getWeather)

function getLocation() {
    if (navigator.geolocation) {
      mylocation = navigator.geolocation.getCurrentPosition(showPosition);
    } 
  }
 function showPosition(position) {
    latitude =  position.coords.latitude 
    longitude =  position.coords.longitude
    // console.log(latitude)
   
  }
