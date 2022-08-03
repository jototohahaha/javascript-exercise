
const logInForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const todoFormId = document.querySelector("#todo-form");
const todoListId = document.querySelector("#todo-list");
const quoteId = document.querySelector("#quote");
const blur = document.querySelector(".blur");
const content = document.querySelector("#content");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY =  "username";

function onLoginSubmit(event){
  event.preventDefault();
  logInForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY,username);
  paintGreeting(username);
  // todoFormId.classList.remove(HIDDEN_CLASSNAME);
  // todoListId.classList.remove(HIDDEN_CLASSNAME);
  // quoteId.classList.remove(HIDDEN_CLASSNAME);

  blur.classList.add("change");
  blur.classList.remove("blur");
  content.classList.add("content");
}

function paintGreeting(username){
  greeting.innerText = `Hello ${username}!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  // greeting.id = `greeting`;
  todoFormId.classList.remove(HIDDEN_CLASSNAME);
  todoListId.classList.remove(HIDDEN_CLASSNAME);
  quoteId.classList.remove(HIDDEN_CLASSNAME);
  blur.classList.add("change");
  blur.classList.remove("blur");
  content.classList.add("content");
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null){
  logInForm.classList.remove(HIDDEN_CLASSNAME);
  logInForm.addEventListener("submit",onLoginSubmit);
}else{
  paintGreeting(savedUsername);
}