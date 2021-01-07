import {
  createTodoElement,
  addLineThroughEventListener,
} from "./components/todos";

import "./style.scss";

async function postTodo(text) {
  console.log(text);
  const response = await fetch("http://localhost:8000/", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ text: text }),
  });

  console.log(response);
}

function newTodo() {
  const text = document.getElementById("todoInput").value;
  postTodo(text);
  renderTodo(text);
}

const removeDoneTodos = () => {
  document
    .querySelectorAll("li > input[type='checkbox']")
    .forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.parentElement.remove();
      }
    });
};

function renderTodo(text, done = false) {
  const newTodoItem = createTodoElement(text, done);
  document.getElementById("todoList").appendChild(newTodoItem);
}

function addRemoveTodoEventListener() {
  document
    .getElementById("clearButton")
    .addEventListener("click", removeDoneTodos);
}

function addTodoLineThroughEventListeners() {
  // Select all checkboxes
  const checkboxes = document.getElementsByTagName("input");

  // Add an event listener to strikethrough the text on click
  for (const checkbox of checkboxes) {
    addLineThroughEventListener(checkbox);
  }
}

function addNewTodoEventListener() {
  const button = document.getElementById("newTodo");
  button.addEventListener("click", newTodo);
}

async function fetchTodos() {
  // 1. fetch the data
  // 2. Parse the response so we have javascript objects
  try {
    const response = await fetch("http://localhost:8000/");
    const json = await response.json();
    return { data: json, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function loadTodos() {
  const response = await fetchTodos();
  // console.log("todos:", response);
  if (response.error) {
    console.log("handle error here"); // give feedback like try again
  } else {
    // 3. Create a new todo element on the page, for each todo object from the server
    response.data.forEach((todo) => {
      renderTodo(todo.text, todo.done);
    });
  }
}

function initApp() {
  // when the app starts add event listeners to make the app interative
  loadTodos();
  addNewTodoEventListener();
  addRemoveTodoEventListener();
  addTodoLineThroughEventListeners();
}

// wait until the entire page has loaded
document.addEventListener("DOMContentLoaded", initApp);
