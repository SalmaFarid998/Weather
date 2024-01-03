let latitude = ""
let longitude = ""
let mylocation = ""
let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
    let lightstatus = response.current.is_day
    if(lightstatus == 0){
        document.querySelector("body").classList.add("dark")
    }
    
    let location = response.location
    let weather = response.forecast.forecastday
    
    document.querySelector(".city").innerHTML = location.name
    let divs = ``;
    for (let i = 0; i<weather.length; i++){
        let rain = weather[i].day.daily_will_it_rain
    if (rain !== 0){
        rainIcon = "fa-solid fa-cloud-rain"
        rainState = "Rain"
    }else{
        rainIcon = "fa-solid fa-cloud"
        rainState = "No Rain"
    }

        const d = new Date(weather[i].date);
        let weekday = d.getDay()
        divs += `<div class="day">
        <p>${week[weekday]} ${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}</p>
        
        <img src="${weather[i].day.condition.icon}">
        <p class="temp"> ${weather[i].day.avgtemp_c}°C </p>
        <p class="status">${weather[i].day.condition.text}</p>
        
        
        <span><i class="${rainIcon}"></i> ${rainState}</span> |
        <span><i class="fa fa-wind"></i> ${weather[i].day.avgvis_km}kph</span>
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
 
