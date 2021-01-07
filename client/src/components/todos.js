export function addLineThroughEventListener(checkbox) {
  checkbox.addEventListener("click", () => {
    checkbox.parentElement.classList.toggle("todo--done");
  });
}

export function createTodoElement(todoText, done) {
  const newTodoItem = document
    .querySelector("#todoItemTemplate")
    .content.cloneNode(true);

  const checkbox = newTodoItem.querySelector('input[type="checkbox"]');

  if (done) {
    // if the todo is done
    // - make sure the checkbox is checked
    // - add the todo--done class
    checkbox.checked = true;
    checkbox.parentElement.classList.add("todo--done");
  }

  addLineThroughEventListener(checkbox);

  const text = document.createTextNode(todoText);
  newTodoItem.querySelector("li").appendChild(text);

  return newTodoItem;
}
