// find the elements
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todoInput");
const addTodoButton = document.querySelector("#addTodoButton");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#showMessage");

// showMessage 
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
        messageElement.textContent = ``;
        messageElement.classList.remove(`bg-${status}`);
    },1000)
}

// create todo 
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.classList.add("li-style");
    todoElement.id = todoId;
    todoElement.innerHTML =`
        <span> ${todoValue}</span>
        <span><button id="deleteButton" class="btn" type="delete"><i class="fa-solid fa-trash"></i></button></span>    
    `;

    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
}

// delete Todo 
const deleteTodo = (event) =>{
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage("Todo is deleted", "danger");

    const todoId = selectedTodo.id; 
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo)=>todo.todoId != todoId);
    localStorage.setItem("mytodos", JSON.stringify(todos));
}


// getTodosFromLocalStorage
const getTodosFromLocalStorage = ()=>{
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
}

// add todo function
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;

    // unique id 
    const todoId = Date.now().toString();
    createTodo(todoId, todoValue);
    showMessage("Todo is added", "success");

    // add todos localStorage 
    const todos = getTodosFromLocalStorage();
    todos.push({todoId, todoValue});
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoInput.value = "";
};

// load todos 
const loadTodos = () =>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo)=> createTodo(todo.todoId, todo.todoValue));
}

// adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);