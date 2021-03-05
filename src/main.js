function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    //hours < 10 ? hours = `0${hours}`: hours; 
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      let day = days[date.getDay()];

 return `${day}, ${hours}:${minutes}`
}



function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector('#temperature');
    let temperatureDescriptionElement = document.querySelector('#temperatureDescription');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    celsiusTemperature = response.data.main.temp;


    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    temperatureDescriptionElement.innerHTML = Math.round(response.data.main.feels_like);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        'src',
        //'http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png'
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute(
        'alt',
        //'http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png'
        `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );

}
function search(city) {
    let apiKey = '41b994c32cd18a931e3e8c1b0b2c94c9';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector('#city-input');
    search(cityInput.value);

}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
celsiusLink.classList.remove('active');
fahrenheitLink.classList.add('active');

    let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector('#temperature');
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    
    celsiusLink.classList.add('active');
    fahrenheitLink.classList.remove('active');
    
    let temperatureElement = document.querySelector('#temperature');
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}
let celsiusTemperature = null;

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displayCelsiusTemperature);

search('kiev');