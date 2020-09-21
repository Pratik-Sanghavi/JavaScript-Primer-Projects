//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// const completetasks = document.querySelector(".complete-button");
// const deletetrash = document.querySelector(".trashButton");
const filterOption = document.querySelector(".filter-todo");
//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", completecheck);
filterOption.addEventListener("click", filtertodo);
//Functions
function addToDo(event) {
  event.preventDefault();
  //To Do div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Add todo to local storage
  savelocaltodos(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class = "fa fa-check"></i>`;
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class = "fa fa-trash"></i>`;
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function deleteCheck(event) {
  event.stopPropagation();
  const item = event.target;
  const deleteElem = item.parentElement;
  if (item.classList[0] === "trash-button") {
    //Animation
    deleteElem.classList.add("deleted");
    removeLocalTodos(deleteElem);
    deleteElem.addEventListener("transitionend", function () {
      deleteElem.remove();
    });
  }
}
function completecheck(event) {
  event.stopPropagation();
  const item = event.target;
  const completeElem = item.parentElement;
  if (item.classList[0] === "complete-button") {
    completeElem.classList.toggle("completed");
  }
}
function filtertodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
          todo.style.textDecoration = "none";
          todo.style.opacity = "1";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

function savelocaltodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class = "fa fa-check"></i>`;
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class = "fa fa-trash"></i>`;
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
