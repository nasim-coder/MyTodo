//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", afterDocumentLoaded());
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //todo div into the
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li element
  const newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Add to do to localstorage
  saveTodoToLocalStorage(todoInput.value);
  //create check mark complete button element
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //create trash todoButton

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APPEND TO LISTS TO
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  //delete todo input
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //for animation
    todo.classList.add("fall");
    removelocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check mark for
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveTodoToLocalStorage(todoVal) {
  //check if value already there in local store
  //   let todos;
  //   if (localStorage.getItem("todos") == null) {
  //     todos = [];
  //   } else {
  //     todos = JSON.parse(localStorage.getItem("todos"));
  //   }
  let todos = checkLocalStore();
  todos.push(todoVal);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = checkLocalStore();
  todos.forEach(function (todo) {
    //todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li element
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //create check mark complete button element
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //create trash todoButton

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LISTS TO
    todoList.appendChild(todoDiv);
  });
}

function removelocalTodos(todo) {
  let todos = checkLocalStore();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//check if data is already present
function checkLocalStore() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function afterDocumentLoaded() {
  saveName();
  getTodos();
}

//save name to localStorage
function saveName() {
  if (!localStorage.getItem("name")) {
    localStorage.setItem("name", myPrompt());
  }
  let name = localStorage.getItem("name");
  let nameElement = document.querySelector(".myName");
  nameElement.innerHTML = name + "'s";
  console.log("name is " + name);
}

//function to take valuefrom the user
function myPrompt() {
  let person = prompt("Please enter your name :");
  let name;
  if (person == null || person == "") {
    name = "";
  } else {
    name = person;
  }
  return name;
}
