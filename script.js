let latitude = ""
let longitude = ""
let mylocation = ""

async function execute(){
    await getLocation();
     getWeather()
}
execute()
 function getWeather(){
    return new Promise(async function(){
    let city = document.querySelector("#cityinput").value
    if(city !== ""){
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6c43e0586fa84e79823151555233012&q=${city}&days=3`)
    }else{
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6c43e0586fa84e79823151555233012&q=${latitude},${longitude}&days=3`)
    }
    var response = await response.json()
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
    })
    
}




document.querySelector("#search").addEventListener("click", getWeather)

function getLocation() {
    return new Promise(function(func){
            navigator.geolocation.getCurrentPosition(function(position){
            latitude =  position.coords.latitude 
            longitude =  position.coords.longitude
            console.log("show position done")
            func()
            });
    })

    }
 
