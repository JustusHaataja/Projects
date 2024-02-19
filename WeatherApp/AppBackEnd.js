const container = document.querySelector(".container");
const search = document.querySelector(".search_box button");
const weatherBox = document.querySelector(".weather_box");
const weatherDetails = document.querySelector(".weather_details");
const error1006 = document.querySelector(".location_not_found");

// WeatherAPI

search.addEventListener("click", () => {

    const APIKey = `78c0b4d617bc400e84f184252241402`;
    const city = document.querySelector(".search_box input").value;

    const Url = `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`;
    
    if (city === "") {
        return;
    }

    fetch(Url).then(response => response.json()).then(weatherData => {
        
        if (weatherData.error) {
            container.style.height = "450px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error1006.style.display = "block";
            error1006.classList.add("fadeIn");
            return;
        }
        
        error1006.style.display = "none";
        error1006.classList.remove("fadeIn");

        const image = document.querySelector(".weather_box img");
        const temperature = document.querySelector(".weather_box .temperature");
        const description = document.querySelector(".weather_box .description");
        const humidity = document.querySelector(".weather_details .humidity span");
        const wind = document.querySelector(".weather_details .wind span");

        const condition = weatherData.current.condition.text.toLowerCase();
        
        if (condition.includes("clear")) {
          image.src = "images/clear.png";
        } else if (condition.includes("rain")) {
          image.src = "images/rain.png";
        } else if (condition.includes("snow")) {
          image.src = "images/snow.png";
        } else if (condition.includes("cloudy")) {
          image.src = "images/cloud.png";
        } else if (condition.includes("fog")) {
          image.src = "images/mist.png";
        } else {
          image.src = "images/cloud.png";
        }

        temperature.innerHTML = `${weatherData.current.temp_c}<span> °C</span>`;
        description.innerHTML = `${weatherData.current.condition.text}`;
        humidity.innerHTML = `${weatherData.current.humidity} %`;
        wind.innerHTML = `${weatherData.current.wind_kph} km/h`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "550px";

    });

});
