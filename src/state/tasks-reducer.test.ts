import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";

test('Correct task should be deleted from correct array', () => {
    const initialState = {
        'todolistId1': [
            {id: '1', title: 'Task N1', isDone: false},
            {id: '2', title: 'Task N2', isDone: true},
            {id: '3', title: 'Task N3', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Task N1.1', isDone: false},
            {id: '2', title: 'Task N2.1', isDone: true},
            {id: '3', title: 'Task N3.1', isDone: false}
        ]
    }

    const todolistToChange = 'todolistId2'
    const taskToChange = '2'

    const action = removeTaskAC(todolistToChange, taskToChange)
    const resultState = tasksReducer(initialState, action)

    expect(resultState['todolistId1'].length).toBe(3)
    expect(resultState[todolistToChange].length).toBe(2)
    expect(resultState[todolistToChange].every(el => el.id !== taskToChange)).toBeTruthy()

    console.log(resultState)
})

test('Correct task should be added to correct array', () => {
    const initialState = {
        'todolistId1': [
            {id: '1', title: 'Task N1', isDone: false},
            {id: '2', title: 'Task N2', isDone: true},
            {id: '3', title: 'Task N3', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Task N1.1', isDone: false},
            {id: '2', title: 'Task N2.1', isDone: true},
            {id: '3', title: 'Task N3.1', isDone: false}
        ]
    }

    const todolistToChange = 'todolistId2'
    const newTaskTitle = 'New Task N1'

    const action = addTaskAC(todolistToChange, newTaskTitle)
    const resultState = tasksReducer(initialState, action)

    const newTaskInResultArray = resultState[todolistToChange][0]

    expect(resultState['todolistId1'].length).toBe(3)
    expect(resultState[todolistToChange].length).toBe(4)
    expect(newTaskInResultArray.id).toBeDefined()
    expect(newTaskInResultArray.title).toBe(newTaskTitle)
    expect(newTaskInResultArray.isDone).toBe(false)

    console.log(resultState)
})

test('Status of correct task should be changed in correct array', () => {
    const initialState = {
        'todolistId1': [
            {id: '1', title: 'Task N1', isDone: false},
            {id: '2', title: 'Task N2', isDone: true},
            {id: '3', title: 'Task N3', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Task N1.1', isDone: false},
            {id: '2', title: 'Task N2.1', isDone: true},
            {id: '3', title: 'Task N3.1', isDone: false}
        ]
    }

    const todolistToChange = 'todolistId2'
    const taskToChange = '2'

    const action = changeTaskStatusAC(todolistToChange, taskToChange)
    const resultState = tasksReducer(initialState, action)

    expect(resultState[todolistToChange][1].isDone).toBeFalsy()
    expect(resultState['todolistId1'][1].isDone).toBeTruthy()

    console.log(resultState)
})

test('Title of correct task should be changed in correct array', () => {
    const initialState = {
        'todolistId1': [
            {id: '1', title: 'Task N1', isDone: false},
            {id: '2', title: 'Task N2', isDone: true},
            {id: '3', title: 'Task N3', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Task N1.1', isDone: false},
            {id: '2', title: 'Task N2.1', isDone: true},
            {id: '3', title: 'Task N3.1', isDone: false}
        ]
    }

    const todolistToChange = 'todolistId2'
    const taskToChange = '2'
    const newTitle = 'New Task Title'

    const action = changeTaskTitleAC(todolistToChange, taskToChange, newTitle)
    const resultState = tasksReducer(initialState, action)

    expect(resultState['todolistId1'][1].title).toBe('Task N2')
    expect(resultState[todolistToChange][1].title).toBe(newTitle)

    console.log(resultState)
})

test('New property with new array should be added when new todolist is created', () => {
    const initialState = {
        'todolistId1': [
            {id: '1', title: 'Task N1', isDone: false},
            {id: '2', title: 'Task N2', isDone: true},
            {id: '3', title: 'Task N3', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Task N1.1', isDone: false},
            {id: '2', title: 'Task N2.1', isDone: true},
            {id: '3', title: 'Task N3.1', isDone: false}
        ]
    }

    const action = AddTodolistAC('')
    const resultState = tasksReducer(initialState, action)

    const keys = Object.keys(resultState)
    const newTodolistKey = keys.find(el => el !== 'todolistId1' && el !== 'todolistId2')
    if (!newTodolistKey) throw Error('New key should be added')

    expect(resultState[newTodolistKey]).toStrictEqual([])
})

test('Property with correct todolistId should be deleted from object', () => {
    const initialState = {
        'todolistId1': [
            {id: '1', title: 'Task N1', isDone: false},
            {id: '2', title: 'Task N2', isDone: true},
            {id: '3', title: 'Task N3', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'Task N1.1', isDone: false},
            {id: '2', title: 'Task N2.1', isDone: true},
            {id: '3', title: 'Task N3.1', isDone: false}
        ]
    }

    const todolistToRemove = 'todolistId2'

    const action = RemoveTodolistAC(todolistToRemove)
    const resultState = tasksReducer(initialState, action)

    expect(Object.keys(resultState).length).toBe(1)
    expect(Object.keys(resultState)[0]).toBe('todolistId1')
    expect(resultState[todolistToRemove]).not.toBeDefined()
})