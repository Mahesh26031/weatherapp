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

        let todayDate = new Date();
        document.getElementById('date').innerText=dateManage(todayDate);

     },
     search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);

     }

};

//local storage//
function show(){
let stored=localStorage.getItem('textinput')
let ul=document.querySelector(".lis")

if(stored==null){
    listarr=[]
}else{
    listarr=JSON.parse(stored);
}
let newtag1=''
if(listarr.length==0)
{
    newtag1+=`No recent searches`
    ul.innerHTML=newtag1 
   
}

if(listarr.length==1)
{
    newtag1+=` <li onclick="change('${listarr[listarr.length-1]}')"><a >${listarr[listarr.length-1]}</a><span class="close" onclick="deletetask(${listarr.length-1})">x</span></li>`

    ul.innerHTML=newtag1

}

if(listarr.length==2)
{
    for(let i=1;i<=2;i++){
    newtag1+=` <li onclick="change('${listarr[listarr.length-i]}')"><a  >${listarr[listarr.length-i]}</a><span class="close" onclick="deletetask(${listarr.length-i})">x</span></li>`
    ul.innerHTML=newtag1
    }

}

if(listarr.length>2){
for(let i=1;i<=3;i++){
newtag1+=` <li onclick="change('${listarr[listarr.length-i]}')"><a >${listarr[listarr.length-i]}</a><span class="close" onclick="deletetask(${listarr.length-i})">x</span></li>`
ul.innerHTML=newtag1;
}}

}

show()


function change(city)
{
    weather.fetchWeather(city);
}



//delete span//
function deletetask(index){
    let stored=localStorage.getItem('textinput')
    listarr=JSON.parse(stored);
    listarr.splice(index,1);
    localStorage.setItem('textinput',JSON.stringify(listarr))
    show()

}

document.querySelector(".f button").addEventListener("click",function(){
    listarr=[];
    localStorage.setItem('textinput',JSON.stringify(listarr))
    show()


})




//click event//
document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
    let stored=localStorage.getItem('textinput')
    if(stored==null){
      listarr=[]
    }else{
      listarr=JSON.parse(stored);
    }
    listarr.push(document.querySelector(".search-bar").value)
    localStorage.setItem('textinput',JSON.stringify(listarr))
    show()
    document.querySelector(".search-bar").value=""   
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
      let stored=localStorage.getItem('textinput')
      if(stored==null){
        listarr=[]
      }else{
        listarr=JSON.parse(stored);
      }  
      listarr.push(document.querySelector(".search-bar").value)
       localStorage.setItem('textinput',JSON.stringify(listarr))
      show() 
      document.querySelector(".search-bar").value=""
 
    }
  });


//current location//  
let api;
if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(onSuccess,onError)

}else{
    alert("Your browser doesnt support")
}

function onError(error)
{
    alert(error.message)
}

function onSuccess(position)
{
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    let api="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+weather.apiKey
    fetch(api)
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) =>  weather.displayWeather(data));
}

//get date//
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return ` ${day},${month} ${date}, ${year}`;
}


//recent searches//
const searchwrapper=document.querySelector(".search-bar")
const a=document.querySelector(".search")

searchwrapper.onkeyup=(e)=>{
    userdata=e.target.value
    if(userdata){

    a.classList.add("active");

    }
    else{
        a.classList.remove("active")
    }
    
}





