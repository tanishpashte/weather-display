document.addEventListener('DOMContentLoaded', () => {
    let outsideBox = document.getElementById("outside-box");
    let insideCircle = document.getElementById("inside-circle");
    let toggleButton = document.getElementById("dark-light-toggle")
    let toggleIcon = document.getElementById("toggle-icon");
    let date = document.getElementById("current-date");
    let searchButton = document.getElementById("city-search-button");
    let searchCity = document.getElementById("search-input-text");
    let displayedData = document.getElementById("content");
    let currentCity = document.getElementById("current-city");
    let currentTemp = document.getElementById("current-temp");
    let weatherMain = document.getElementById("weather-info-main");
    let weatherIcon = document.getElementById("weather-info-icon");
    let currentTempFeels = document.getElementById("weather-info-feels");
    let currentMaxTemp = document.getElementById("max-temp");
    let currentMinTemp = document.getElementById("min-temp");
    let windSpeed = document.getElementById("wind-info");
    let humidity = document.getElementById("humidity-info");
    let visibility = document.getElementById("visibility-info");

    const API_key = "51a3ad615fcd7eef651c364a03d5f1a5";
    
    displayDate();

    searchButton.addEventListener('click', async () => {
        let city = searchCity.value.trim();
        if(!city) return;
        
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    })

    toggleButton.addEventListener('click', () => {
        toggleDisplay();
    })




    function toggleDisplay(){
        insideCircle.classList.toggle("translate-x-8")

        setTimeout(() => {
            outsideBox.classList.toggle("fa-sun")
            toggleIcon.classList.toggle("fa-moon")
            outsideBox.classList.toggle("bg-slate-200")
            outsideBox.classList.toggle("bg-zinc-900")
            outsideBox.classList.toggle("border")
        }, 280)
        
    }

    function displayDate(){
        let currentDate = new Date();
        console.log(currentDate);
        const months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        date.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${days[currentDate.getDay()]}`
        
    }

    async function getWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
        
    }

    function displayWeatherData(data){
        const { name, main, weather } = data;
        displayedData.classList.remove("hidden");
        document.getElementById("welcome-text").classList.add("hidden");
        currentCity.textContent = name;
        currentTemp.textContent = `${Math.round(main.temp)}\u00B0`;
        weatherMain.textContent = weather[0].main;
        let iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        weatherIcon.innerHTML = `<img src=${iconUrl} alt="Weather Icon">`;
        currentTempFeels.textContent = `Feels like: ${Math.round(main.feels_like)}\u00B0`;
        currentMaxTemp.textContent = `Max: ${Math.round(main.temp_max)}\u00B0`;
        currentMinTemp.textContent = `Min: ${Math.round(main.temp_min)}\u00B0`;
        windSpeed.textContent = `${wind.speed} km/h`;
        humidity.textContent = `${main.humidity}%`;
        visibility.textContent = `${visibility/1000} km`

    }

    function showError(){

    }
})