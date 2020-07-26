const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    //삼항 연산자를 이용해  0~9까지 앞에 0을 붙여 00, 01, 02 ... 로 출력되게 한다.
}

function init() {
    getTime();
    setInterval(getTime, 1000); //1초마다 시간을 얻어온다.
}
init();

