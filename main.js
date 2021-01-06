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

function addLineThroughEventListener(checkbox) {
  checkbox.addEventListener("click", () => {
    checkbox.parentElement.classList.toggle("todo--done");
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
