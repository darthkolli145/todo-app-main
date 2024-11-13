const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const filters = document.querySelectorAll('.filters button');
const clearCompletedBtn = document.getElementById('clear-completed');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let todos = [];
let filter = 'all';

newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && newTodoInput.value.trim() !== '') {
        todos.push({ text: newTodoInput.value.trim(), completed: false });
        newTodoInput.value = '';
        updateList();
    }
});


function updateList() {
    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
    });

    todoList.innerHTML = filteredTodos.map((todo, index) => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-index="${index}">
            <span class="text">${todo.text}</span>
            <button onclick="toggleComplete(${index})">
                <img src="images/icon-check.svg" alt="Complete">
            </button>
            <button onclick="deleteTodo(${index})">
                <img src="images/icon-cross.svg" alt="Delete">
            </button>
        </li>
    `).join('');

    const activeTodos = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeTodos} items left`;
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    updateList();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    updateList();
}


filters.forEach(button => {
    button.addEventListener('click', () => {
        filters.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filter = button.getAttribute('data-filter');
        updateList();
    });
});


clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    updateList();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    themeIcon.src = document.body.classList.contains('dark-mode')
        ? 'images/icon-sun.svg'
        : 'images/icon-moon.svg';
});

updateList();
