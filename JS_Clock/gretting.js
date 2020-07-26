const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

// 입력한 name을 저장한다.


function handleSubmit(event) {
    //기본적으로 form에 text를 작성하고 enter를 누르면 페이지가 새로고침이 되는데 그걸 막는다.
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}


// paintGreeting function은 form을 지우고 나에게 greeting을 보여주고 내가 넣은 text를 넣는다.

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();

//local storage은 작은 정보를 User 컴퓨터에 저장하는 방법이다.
// 누군가 submit을 했을 때 paintGreeting + savename을 한다.