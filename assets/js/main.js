function toDoList() {
    const text = document.querySelector('.txt');
    const addItem = document.querySelector('.add');
    const list = document.querySelector('.list');

    addItem.addEventListener('click', function () {
        if (!text.value) return;
        createToDo(text.value);
    });

    text.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (!text.value) return;
            createToDo(text.value);
        }
    });

    function createToDo(txt) {
        const li = createLi();
        li.innerText = txt;
        list.appendChild(li);
        cleanScreen();
        createButton(li);
        saveTasks();
    }

    function createLi() {
        const li = document.createElement('li');
        return li;
    }

    function cleanScreen() {
        text.value = '';
        text.focus();
    }
    
    function createButton(li) {
        li.innerText += ' ';
        const button = document.createElement('button');
        button.innerText = 'Apagar';
        li.appendChild(button);
        button.setAttribute('class', 'delete');
        button.setAttribute('title', 'Apagar esta tarefa');
    }

    document.addEventListener('click', function (elemt) {
        const element = elemt.target;

        if (element.classList.contains('delete')) {
            element.parentElement.remove();
            saveTasks();
        }
    });

    function saveTasks() {
        const numberOfLi = list.querySelectorAll('li');
        const taskSaver = [];

        for (let taskList of numberOfLi) {
            let textTask = taskList.innerText;
            textTask = textTask.replace('Apagar', '').trim();
            taskSaver.push(textTask);
        }

        const JsonString = JSON.stringify(taskSaver);
        localStorage.setItem('tasksSaved', JsonString);
    }

    function useSavedTasks() {
        const tasksSaved = localStorage.getItem('tasksSaved');
        const taskSaver = JSON.parse(tasksSaved);
        
        for (let taskList of taskSaver) {
            createToDo(taskList);
        }
    }

    useSavedTasks();
}

toDoList();