let weather = {
    apiKey: "60c907d8676c855bf7c4154744fb0dcf",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) =>  this.displayWeather(data));
    },

    displayWeather: function (data) {

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, temp_min,temp_max } = data.main;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".coldest").innerText = "Coldest : " + temp_min + "°C";
        document.querySelector(".warmest").innerText = "Warmest : " + temp_max + "°C";
        document.querySelector(".weather").classList.remove("loading");

     },
     search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
     }

};

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
    
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  weather.fetchWeather("Delhi");
