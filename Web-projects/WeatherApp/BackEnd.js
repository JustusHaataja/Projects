const container = document.querySelector(".container");
const search = document.querySelector(".search_box button");
const weatherBox = document.querySelector(".weather_box");
const weatherDetails = document.querySelector(".weather_details");
const error1006 = document.querySelector(".location_not_found");

// OpenWeather


search.addEventListener('click', () => {

    const APIKey = "1048e98be6279a00f7852a3127316ab4";
    const city = document.querySelector('.search_box input').value;

    if (city === '') {
        return;
    }

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
        .then((response) => response.json())
        .then((data) => {
        if (data.cod === "404") {
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
        const humidity = document.querySelector(
            ".weather_details .humidity span"
        );
        const wind = document.querySelector(".weather_details .wind span");
        
        
        switch (data.weather[0].main) {
            case "Clear":
            image.src = "images/clear.png";
            break;

            case "Rain":
            image.src = "images/rain.png";
            break;

            case "Snow":
            image.src = "images/snow.png";
            break;

            case "Clouds":
            image.src = "images/cloud.png";
            break;

            case "Haze":
            image.src = "images/mist.png";
            break;

            default:
            image.src = "";
        }
        
        temperature.innerHTML = `${parseInt(data.main.temp)}<span> °C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity} %`;
        wind.innerHTML = `${parseInt(data.wind.speed)} km/h`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "550px";
        });

});
