var search = document.getElementById("search");
var city = document.getElementsByClassName("location")[0];
var temp = document.querySelector("#temp");
var humid = document.querySelector(".humid");
let icon = document.getElementById("icon");
let error = document.getElementById("error");
const deg = document.querySelector(".deg");

search.addEventListener("keydown", function (e) {
    if (e.code === "Enter" || e.keyCode === 13) {
        let place = search.value;
        search.value = "";
        async function currwether() {
            let response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=ef2a740e13fd55def7845174208a4a77`
            );
            let data = await response.json();
            if (response.statusText !== "OK") {
                error.innerHTML = ` ${response.statusText} , ${place} 😣`;
            } else {
                error.innerHTML = " ";
                city.innerHTML = data.name + " , " + data.sys.country;
                temp.innerHTML = data.main.temp.toFixed(0);
                humid.innerHTML = data.main.humidity + " %";
                icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                deg.innerHTML = "&degC";
            }
        }
        currwether();
    }
});

navigator.geolocation.getCurrentPosition(
    (position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var API = "ef2a740e13fd55def7845174208a4a77";

        async function currwether() {
            let response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${API}`
            );
            let data = await response.json();
            city.innerHTML += data.name + " , " + data.sys.country;
            temp.innerHTML = data.main.temp.toFixed(0);
            humid.innerHTML = data.main.humidity + " %";
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            deg.innerHTML = "&degC";
        }
        currwether();
    },
    (deny) => {
        error.innerHTML = deny.message;
    }
);
