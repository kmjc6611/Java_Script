const title = document.getElementById("title");
const CLICKED_CLASS = "clicked";

function handleClike() {
    // const hasClass = title.classList.contains(CLICKED_CLASS);
    // if (!hasClass) {
    //     title.classList.add(CLICKED_CLASS);
    // } else {
    //     title.classList.remove(CLICKED_CLASS);
    // }

    title.classList.toggle(CLICKED_CLASS);
}

function init() {
    title.addEventListener("click", handleClike);
}
init();

//hasClass는 element가 CLICKED_CLASS를 가지는지 체크한다.

//toggle은 toggle함수 안에 있는 값을 체크해서
// 만약 class가 있으면 add 아니면 remove
// hasClass, toggle 둘은 같은 역활을 한다.