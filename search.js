let weather = {
    "apiKey": "9fd7e84f84626f28199be3bc384da8f9",
    fetchWeather: function (city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {

        const { lat, lon } = data.coord;
        const { name } = data;

        let latitude = lat;
        let longitude = lon;

        document.querySelector(".location-name").innerText = name;
        // document.querySelector(".location-temp").innerText = Math.floor(temp);


        api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${this.apiKey}`;




        weatherUpdate();




    },



    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search-btn").addEventListener("click", function () {
    weather.search();

});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

function weatherUpdate() {

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {


            let temperatureDescription = document.querySelector('.description');
            let temperatureDegree = document.querySelector('.location-temp');
            let locationTimezone = document.querySelector('.date');
            let temperatureSection = document.querySelector('.temperature-section');
            const temperatureSpan = document.querySelector('.temperature-unit');
            const cloudsVisible = document.querySelector('.clouds');
            const humidityLevel = document.querySelector('.humidity');
            const pressureLevel = document.querySelector('.pressure');
            const uvIndex = document.querySelector('.summary-uv');
            const visibilityLevel = document.querySelector('.summary-visibility');
            const windDegree = document.querySelector('.summary-wind__degree');
            const windDir = document.querySelector('.summary-wind__direction');
            const windSpeed = document.querySelector('.summary-wind__speed');
            const feelsLike = document.querySelector('.feels-like');
            const locationTime = document.querySelector('.date');
            const maxDeg = document.querySelector('.max-deg');
            const minDeg = document.querySelector('.min-deg');
            const locationCountry = document.querySelector('.location-name');



            const { temp, clouds, humidity, pressure, feels_like, wind_speed, wind_deg, uvi, dt, visibility } = data.current;
            const { description, icon } = data.current.weather[0];
            const { max, min } = data.daily[0].temp;
            const { timezone } = data;



            //Set DOM elements
            temperatureDegree.textContent = Math.floor(temp);
            temperatureDescription.textContent = capitalizeFirstLetter(description);
            locationTimezone.textContent = data.timezone;
            cloudsVisible.textContent = clouds + "%";
            humidityLevel.textContent = humidity + "%";
            pressureLevel.textContent = pressure;
            windSpeed.textContent = wind_speed + " Km/h";
            windDegree.textContent = wind_deg + "°";
            uvIndex.textContent = uvi;
            feelsLike.textContent = "Feels like: " + Math.floor(feels_like) + "°";
            maxDeg.textContent = Math.floor(max) + "°";
            minDeg.textContent = Math.floor(min) + "°/";
            locationTime.textContent = timeConverter(dt);
            visibilityLevel.textContent = visibility;
            locationCountry.textContent = timezone;


            //Set icon
            setIcons(icon, document.querySelector('.icon'));
            setIcons("03d", document.querySelector('.icon__cloud'));
            setIcons("50d", document.querySelector('.icon__pressure'));
            setIcons("09d", document.querySelector('.icon__humidity'));




            //Celsius to Farenheit

            let Farenheit = (temp * 9 / 5) + 32;

            //Switch between Celsius/Farenheit
            temperatureSection.addEventListener('click', () => {
                if (temperatureSpan.textContent === "°C") {
                    temperatureSpan.textContent = "°F";
                    temperatureDegree.textContent = Math.floor(Farenheit);
                } else {
                    temperatureSpan.textContent = "°C";
                    temperatureDegree.textContent = Math.floor(temp);

                }

            });


        });

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
}

function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    let checkIcon = icon;
    let currentIcon;

    if ((checkIcon == "01d") || (checkIcon == "01n")) {
        currentIcon = "CLEAR_DAY";
    } else if ((checkIcon == "02d") || (checkIcon == "02n")) {
        currentIcon = "PARTLY_CLOUDY_DAY";
    } else if ((checkIcon == "03d") || (checkIcon == "03n")) {
        currentIcon = "CLOUDY";
    } else if ((checkIcon == "04d") || (checkIcon == "04n")) {
        currentIcon = "CLOUDY";
    } else if (checkIcon == "09d") {
        currentIcon = "RAIN";
    } else if (checkIcon == "10d") {
        currentIcon = "RAIN";
    } else if (checkIcon == "11d") {
        currentIcon = "SLEET";
    } else if (checkIcon == "13d") {
        currentIcon = "SNOW";
    } else if (checkIcon == "50d") {
        currentIcon = "FOG";
    }
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);


}

