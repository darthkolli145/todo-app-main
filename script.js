const html = document.documentElement;
html.dataset.theme = 'theme-light';

const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const todoInput = document.getElementById('new-todo');
const todoUl = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filters button');

let todos = [];

function toggleTheme() {
    if (html.dataset.theme === 'theme-light') {
        html.dataset.theme = 'theme-dark';
        themeIcon.src = './images/icon-sun.svg';
        themeIcon.alt = 'Sun icon';
    } else {
        html.dataset.theme = 'theme-light';
        themeIcon.src = './images/icon-moon.svg';
        themeIcon.alt = 'Moon icon';
    }
}

function createTodoItem(text) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
        <label class="check-label">
            <input type="checkbox" class="toggle-complete">
            <span class="check-round"></span>
        </label>
        <span class="todo-text">${text}</span>
        <button class="btn delete"><img src="./images/icon-cross.svg" alt="Delete"></button>
    `;
    return todoItem;
}

function updateItemsLeft() {
    const activeTodos = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeTodos} items left`;
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const newTodo = { text, completed: false };
    todos.push(newTodo);

    const todoItem = createTodoItem(text);
    todoUl.appendChild(todoItem);
    todoInput.value = '';

    updateItemsLeft();
    bindTodoItemEvents(todoItem, newTodo);
}

function toggleTodoCompletion(todo, todoItem) {
    todo.completed = !todo.completed;
    todoItem.classList.toggle('completed', todo.completed);
    updateItemsLeft();
}

function deleteTodo(todo, todoItem) {
    todos = todos.filter(t => t !== todo);
    todoItem.remove();
    updateItemsLeft();
}


function bindTodoItemEvents(todoItem, todo) {
    const toggleComplete = todoItem.querySelector('.toggle-complete');
    const deleteBtn = todoItem.querySelector('.delete');

    toggleComplete.addEventListener('change', () => toggleTodoCompletion(todo, todoItem));
    deleteBtn.addEventListener('click', () => deleteTodo(todo, todoItem));
}


function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.completed);
    Array.from(todoUl.children).forEach(todoItem => {
        if (todoItem.classList.contains('completed')) {
            todoItem.remove();
        }
    });
    updateItemsLeft();
}

function filterTodos(filter) {
    Array.from(todoUl.children).forEach(todoItem => {
        const isCompleted = todoItem.classList.contains('completed');
        switch (filter) {
            case 'all':
                todoItem.style.display = '';
                break;
            case 'active':
                todoItem.style.display = isCompleted ? 'none' : '';
                break;
            case 'completed':
                todoItem.style.display = isCompleted ? '' : 'none';
                break;
        }
    });
}

themeBtn.addEventListener('click', toggleTheme);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

clearCompletedBtn.addEventListener('click', clearCompletedTodos);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterTodos(button.getAttribute('data-filter'));
    });
});
