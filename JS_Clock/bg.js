const body = document.querySelector("body");

const IMG_NUMBER = 6;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER );   //Math.floor를 사용하면 소수점을 버린다.
  return number;
}

function init() {   //숫자를 생성해서 이미지를 랜덤으로 body에 붙여넣는다
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();