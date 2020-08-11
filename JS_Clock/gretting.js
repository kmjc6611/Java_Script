const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),            //바로 클래스에 input을 넣어서 가져와도 된다. 지금은 부모-자식 관계를 이용해 input을 선택했다.
  greeting = document.querySelector(".js-greetings");

  // querySelector는 찾은 것중 첫번째 것을 가져온다.
  // queryAll은 모든걸 가져온다. 클레스명에 따른 element들을 가져오는데 array 형식으로 반환한다.
  // getElementByTagName은 태그로 element를 가져오는 것이다. input,body,html, div, secion등을 가져올 때 사용한다.


  //local Storage는 작은 정보를 나의 유저 컴퓨터에 저장하는 방법이다.
  //Inspect에 들어가서 storage를 보면 key, value가 있다. 이것을 이용해 모멘텀을 만들것이다.

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {   //localStorage에 내가 입력한 값을 저장시킨다.
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();         //엔터를 눌렀을 때 나의 정보를 어딘가로 보내는 기본작업을 하기 때문에 그 작없을 Kill한다. 이 함수를 실행하면 박스에 입력한 텍스트들이 엔터를 눌러도 사라지지 않는다.
  const currentValue = input.value;
  paintGreeting(currentValue);    //paintGreeting함수에 내가 입력한 값을 넣어 화면에 보여줄 것이기 때문이다.
  saveName(currentValue);     //입력한 값을 localStorage에 저장한다.
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);    //텍스트를 표시 하기위해서는 form을 지워야한다.
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {        //localStorage에서 값을 가져오는 함수
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();   //현재 이름이 설정되어 있지않으면 askForName 함수를 통해 이름을 설정한다.
  } else {
    paintGreeting(currentUser);   //이름이 설정되어 있으면 로컬에서 가져온 텍스트(이름)을 표시한다.
  }
}

function init() {
  loadName();
}

init();