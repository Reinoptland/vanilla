export function addLineThroughEventListener(checkbox) {
  checkbox.addEventListener("click", () => {
    checkbox.parentElement.classList.toggle("todo--done");
  });
}

export function createTodoElement(todoText) {
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
