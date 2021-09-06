const locationInput = document.getElementById('location');
const searchButton = document.getElementById('searchButton');
const currentTemp = document.getElementById('currentTemp');
const currentName = document.getElementById('name');
const timeDetils = document.getElementById('timeDetails');
const cloudy = document.getElementById('cloudy');
const humidity = document.getElementById('humidity');
const feels = document.getElementById('feels');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const minTemp = document.getElementById('minTemp');
const maxTemp = document.getElementById('maxTemp');
const weatherMain = document.getElementsByClassName('weatherMain');
const weatherIcon = document.getElementById('weatherIcon');
const mainDiv = document.getElementById('main');


let initialSearch = 0;


// Initial Search

$(document).ready(function(){

    weatherSearch('Delhi');

});

// Search on button click
$(searchButton).click(function(){
    const searchText = $(locationInput).val();
    if(searchText != ""){
     weatherSearch(searchText);
     $(locationInput).val("");
     $(locationInput).blur();
    }
   
});

// Search on enter press

$(locationInput).on('keypress',(e)=>{
    if(e.key === 'Enter'){
    const searchText = $(locationInput).val();
    if(searchText != ""){
     weatherSearch(searchText);
     $(locationInput).val("");
     $(locationInput).blur();
    } 
    }
})

// Weather Search

function weatherSearch(searchText){


        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=74902e1e123fa827aec68daa44b0c23c`;

        fetch(url)
        .then((res) =>{
            return res.json();
        })
        .then((data) =>{
            console.log(data);
           setData(data);

        })
        .catch((err) =>{
            console.log(err);
            alert('Location Invalid');
        })
    

}


function setData(data){

    // Setting Main Temperature
    $(currentTemp).text(temperatureConversion(data.main.temp)); 

    // Setting Name
    $(currentName).text(data.name);

    // Setting Date and time

    let d = new Date();
     let currentDay = day(d.getDay());
     let currentTime = time();
    let currentDate = date();
    $(timeDetils).text(currentTime+' - '+currentDay+" "+ currentDate);

    // Setting cloudy
    $(cloudy).text(data.clouds.all.toString()+'%');

    // Setting Humidity
    $(humidity).text(data.main.humidity.toString()+'%');

    // Setting wind;
    let currentWind =(Math.ceil((data.wind.speed)*(18/5))).toString();
    $(wind).text(currentWind+' km/h');

    // Setting feels like temperature
    $(feels).text(temperatureConversion(data.main.feels_like));

    // Setting Pressure
    $(pressure).text(data.main.pressure.toString()+' hPa');

    // Setting Visibility
    $(visibility).text((data.visibility/1000).toString()+' km');

    // Setting Min temp
    $(minTemp).text(temperatureConversion(data.main.temp_min));

    // Setting Max temp
    $(maxTemp).text(temperatureConversion(data.main.temp_max));

    // Setting weather main info
    $(weatherMain).text(data.weather[0].main);
    

    // settting icon
    let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    $(weatherIcon).attr('src',iconUrl);

    // Setting background image
    let backgroundUrl = backgroundImage(data.weather[0].main);
    $(main).css('background-image',`url(${backgroundUrl})`);

    

    
}


// Conversion of temperature to celsius
function temperatureConversion(temp){

    return (Math.ceil(temp - 273.15)).toString()+'\u00B0';
    

}

// Getting current day name from code
function day(currentDay){

    switch(currentDay){
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wedneday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';    
        default: return 'Invalid';
    }
}

// Current time
function time(){

    let d = new Date();
    let hour = d.getHours().toString();
    if(hour < 10){
        hour = '0'+hour;
    }
    let min = d.getMinutes().toString();
    if(min < 10){
        min = '0'+min;
    }

    return hour+":"+min;
}

// Current Date
function date(){

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    let today = new Date();
    let dd = String(today.getDate());
    let monthName = monthNames[today.getMonth()];
    let yy = today.getFullYear();
    yy %=100;

    today = dd + ' ' + monthName +' '+ yy;
    return today;
    

}

// Background according to weather
function backgroundImage(weather){
    switch(weather){

        case 'Thunderstorm':{
            return 'thunderstorm.jpg'
        }
        case 'Drizzle':{
            return 'drizzle.jpg';
        }
        case 'Snow':{
            return 'snow.jpg';
        }
        case 'Clear':{
            return 'clear.jpg';
        }
        case 'Clouds':{
            return 'clouds.jpg';
        }
        default:{
            return 'fog.jpg';
        }


    }


}
