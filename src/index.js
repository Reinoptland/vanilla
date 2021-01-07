import {
  createTodoElement,
  addLineThroughEventListener,
} from "./components/todos";

import axios from "axios";
// import moment from "moment";
import "./style.scss";
import { format } from 'date-fns'

async function getData() {
  const date = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
  console.log(date);
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon");

  console.log(response.data);
}
getData();

function newTodo() {
  const value = document.getElementById("todoInput").value;
  const newTodoItem = createTodoElement(value);
  document.getElementById("todoList").appendChild(newTodoItem);
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

function initApp() {
  // when the app starts add event listeners to make the app interative

  addNewTodoEventListener();
  addRemoveTodoEventListener();
  addTodoLineThroughEventListeners();
}

// wait until the entire page has loaded
document.addEventListener("DOMContentLoaded", initApp);

console.log("hello world");
