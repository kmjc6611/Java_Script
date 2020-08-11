const toDoForm = document.querySelector(".js-toDoForm"),            //gretting.js의 form과 겹치지 않기 위해 이런 변수명을 지었다.
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];     //여러개의 list를 받을 array  + list를 생성 했을 때 'toDos'array에 추가되도록 해야한다.

function deleteToDo(event) {
  const btn = event.target;     //.target : <button>X</button> 으로 나온다. 문제는 누가 부모인지 모른다.
  const li = btn.parentNode;    // 버튼에 부여된 id를 기준으로 li를 삭제하면서 버튼도 같이 지운다.   누굴 지우는지 알게 되었다.
  toDoList.removeChild(li);
  //여기 까지만 하면 삭제는 되지만 새로고침 하면 다시 원상복구 된다.

  const cleanToDos = toDos.filter(function(toDo) {      //forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행이 된다.
    return toDo.id !== parseInt(li.id);                 //filter는 array의 모든 아이템을 통해 함수를 실행하고 그리고 true인 아이템들만 가지고 새로운 array를 만든다.
    //'모든 toDos가 li의 id와 같지 않을때 리턴해라'('toDos'의 id는 숫자형이고 'li'의 id는 'string'이므로 숫자형으로 바꿔준다.)
  });                                                   // 여기에서는 li에 없는 id인 toDos를 체크하기 위해 filter를 쓴다.
  toDos = cleanToDos;                                   //li에 없는 id는 우리가 지우고 싶은 버튼이기 때문이다.
  saveToDos();
}

//*filter와 forEach를 잘 이해하자*

function saveToDos() {      //toDos를 가져와서 로컬에 저장하는 함수.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// local storage에는 자바스크립트의 data를 저장할 수 없고 오직 string만 저장할 수 있다.
// 즉 자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장한다.
// 그래서 object가 string이 되도록 만들어야한다.
// 그래서 JSON.stringify를 사용해서 object를 string으로 바꿔준다.


function paintToDo(text) {
    const li = document.createElement("li");  //뭔가를 생성할때 쓰는 문법.
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;       // 요소의 id를 1부터 시작하기 위해 length+1로 하였다.
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);   //뭔가를 그것의 부모 element 안에 넣는것이다.
    li.appendChild(span);
    li.id = newId;        //나중에 버튼을 클릭했을 때 어떤 li를 지워야 하는지 알 수 있어야하므로 li에도 id를 부여한다.
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);     //push한 후에 saveToDos를 호출해야한다. *순서주의*
    saveToDos();
}


function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //엔터를 누르면 박스안을 빈칸으로 만들기
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {       //이 form은 항상 showing이기 때문에 toDos가 null일 때 딱히 할게 없다.
                                      // console.log(loadedToDos)
        const parsedToDos = JSON.parse(loadedToDos);   //불러온 것이 string이므로 JSON을 사용해 자바스크립트가 다룰 수 있도록 object로 바꿔준다.
        //console.log(loadedToDos)
        parsedToDos.forEach(function (toDo) {      //parsedToDos의 안에 있는 것들을 모두 paintDoTo 함수에 넣어서 실행한다. 즉 화면에 보이게 한다.
            paintToDo(toDo.text);                     //forEach는 array에 담겨있는 것들을 각각 한번씩 함수를 실행시켜준다.
            // (toDo.text) -> parsedToDos에 있는 각자의 text들을 꺼내온다.
        });
    }
}

//정리하자면 toDos를 가져온 뒤, 자바스크립트 object로 변환해주고 각각에 대해서 paintToDo라는 함수를 실행해서 화면에 띄운다.


function init() {
    loadToDos();      // localStorage에서 값을 가져온다.
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
