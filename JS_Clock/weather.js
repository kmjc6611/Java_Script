const weather = document.querySelector(".js-weather")
const API_KEY = '50fc61c2391522cc3c60d4954aad74b7'
const COORDS = 'coords'

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {                 //then을 사용해서 데이터가 우리에게 넘어왔을 때 함수를 실행한다.
            return response.json()
        })
        .then(function (json) {
            const temperture = json.main.temp
            const place = json.name
            weather.innerText = `${temperture} @ ${place}`
        })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucces(position) {        //위도와 경도를 얻어오는 함수
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordObj = {
        // latitude: latitude,
        // longitude: longitude
        latitude,
        longitude
    };                          //tip : 객체에 변수의 이름과 객체의 key의 이름을 같게 저장할 때는 그냥 latitude만 써도 된다.
    saveCoords(coordObj)
    getWeather(latitude, longitude)
}


function handleGeoError() {
    console.log("몰라 여기 어딘지")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)


}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS)
    if (loadedCoords === null) {
        askForCoords();     //localStorage에 아무 것도 없으면 getWeather을 실행시켜 정보를 가져온다.
    } else {
        const parseCoords = JSON.parse(loadedCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init() {
    loadCoords()
}

init()