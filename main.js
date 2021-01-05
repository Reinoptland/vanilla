function createTodoElement(todoText) {
  const newTodoItem = document
    .querySelector("#todoItemTemplate")
    .content.cloneNode(true);

  addLineThroughEventListener(
    newTodoItem.querySelector('input[type="checkbox"]')
  );

  const text = document.createTextNode(todoText);
  newTodoItem.querySelector("li").appendChild(text);

  return newTodoItem;
}

function newTodo() {
  const input = document.getElementById("todoInput");
  const value = input.value;
  const newTodoItem = createTodoElement(value);
  const list = document.getElementById("todoList");
  list.appendChild(newTodoItem);
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
  const button = document.getElementById("clearButton");
  button.addEventListener("click", removeDoneTodos);
}

function addLineThroughEventListener(checkbox) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      checkbox.parentElement.style.textDecoration = "line-through";
    } else {
      checkbox.parentElement.style.textDecoration = "none";
    }
  });
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
