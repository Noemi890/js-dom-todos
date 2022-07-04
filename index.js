const getToDos = () => {
    const toDoList = document.querySelector('#todo-list')
    toDoList.innerHTML = '<li>Loading..</li>'
    fetch ("http://localhost:3000/todos")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        toDoList.innerHTML = ''
        data.forEach(toDo => {
            const myTodo = document.createElement('li')
            if (toDo.completed) {
                myTodo.setAttribute('class', 'completed')
            }
            const text = document.createElement('label')
            text.htmlFor = `todo-${toDo.id}`
            text.innerHTML = `&nbsp; ${toDo.title}`
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.id = `todo-${toDo.id}`
            checkbox.checked = toDo.completed
            checkbox.setAttribute('class', 'complete_button')
            myTodo.append(checkbox)
            myTodo.append(text)
            toDoList.append(myTodo)
            setUpCompleteTodo(toDo, checkbox)
        })
    })
}

const setUpCompleteTodo = (toDo, checkbox) => {
    checkbox.addEventListener('click', () => {
        fetch(`http://localhost:3000/todos/${toDo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: !toDo.completed
            })
        })
        .then(() => getToDos())
    })
}

const setComplete = (todo) => {
    
}

const setUpNewToDoForm = () => {
    const myForm = document.forms[0]

    myForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(myForm)
        fetch("http://localhost:3000/todos", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': `${formData.get('title')}`,
                'completed': false
            })
        })
        .then(() => getToDos())
    })
}

getToDos()
setUpNewToDoForm()