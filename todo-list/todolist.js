/////////// 날짜 가져오기 

const $date = document.querySelector("#date");


function getDate(){
  const clock = new Date();
  const year = clock.getFullYear();
  const month = clock.toLocaleString("en-US", { month: "short" });
  const date = String(clock.getDate()).padStart(2,"0");
  $date.innerText = `${date}.${month}.${year}`;
}
getDate();




/////todolist 추가

const $todoForm = document.querySelector("#todo_form");
const $todoInput =  document.querySelector("#todo_input");
const $todoList = document.querySelector("#todo_list");
const $addButton = document.querySelector("#add_button");

let list =[];

function addList(newItem){
    // <div>
    //   <input>
    //   <span></span>
    //   <button></button>
    // </div>
  const div = document.createElement("div");
  const checkBox = document.createElement("input");
  const span = document.createElement("span");
  const deleteButton = document.createElement("button");

  $todoList.appendChild(div);
  div.appendChild(checkBox);
  div.appendChild(span);
  div.appendChild(deleteButton);

  div.id = newItem.id;
  checkBox.type = 'checkbox';
  span.textContent = newItem.text;
  deleteButton.textContent = 'x';
  $todoInput.value = '';

  deleteButton.addEventListener("click",deleteList);
  checkBox.addEventListener("change", ()=>{
    if(checkBox.checked === true){
      span.style.textDecoration = "line-through";
    }else{
      span.style.textDecoration = "";
    }
  });
}
$addButton.addEventListener("click", submit);


//리스트 삭제
function deleteList(event){
  const div = event.target.parentElement;
  div.remove();
  let targetId = event.target.parentElement.id;
  list = list.filter(item => item.id !== parseInt(targetId));
  saveList();
}

//리스트 저장

function saveList(){
  localStorage.setItem("todoList", JSON.stringify(list));
}

function submit(event){
  event.preventDefault();
  const newItem = $todoInput.value;
  const newItemObj ={
    text: newItem,
    id: Date.now(),
  }
  list.push(newItemObj);
  addList(newItemObj);
  saveList();
}

const savedList = localStorage.getItem("todoList");
if(savedList !== null){
  const parsed = JSON.parse(savedList);
  list = parsed;
  parsed.forEach(addList);
}
