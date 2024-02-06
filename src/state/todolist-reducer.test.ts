import {TodolistType} from "../App";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";

//Initial state for tests
let todolistId1 = v1()
let todolistId2 = v1()
let todolistId3 = v1()

const initialState: Array<TodolistType> = [
    {todolistId: todolistId1, title: 'Todolist N1', filter: "all"},
    {todolistId: todolistId2, title: 'Todolist N2', filter: "all"},
    {todolistId: todolistId3, title: 'Todolist N3', filter: "all"},
]

//Remove Todolist test
test('todolist should be removed', () => {
    const action = RemoveTodolistAC(todolistId2)

    const finalState = todolistReducer(initialState, action)

    expect(finalState.length).toBe(2)
    expect(finalState[finalState.length - 1].todolistId).toBe(todolistId3)
})

//Add new Todolist test
test('new todolist should be added', () => {
    const newTodolistTitle = 'New Todolist!'

    const action = AddTodolistAC(newTodolistTitle)

    const finalState = todolistReducer(initialState, action)

    expect(finalState.length).toBe(4)
    expect(finalState[0].title).toBe(newTodolistTitle)
})

//Change Todolist filter test
test('todolist filter should be changed', () => {
    const todolistId = todolistId3
    const newFilter = 'completed'

    const action = ChangeTodolistFilterAC(todolistId, newFilter)

    const finalState = todolistReducer(initialState, action)

    expect(finalState[2].filter).toBe(newFilter)
    expect(finalState[2].todolistId).toBe(todolistId3)
})

//Change Todolist title test
test('title of todolist should be changed', () => {
    const todolistId = todolistId1
    const newTitle = `I'm new title!`

    const action = ChangeTodolistTitleAC(todolistId, newTitle)

    const resultState = todolistReducer(initialState, action)

    expect(resultState[0].title).toBe(newTitle)
    expect(resultState[0].todolistId).toBe(todolistId1)
    expect(resultState[0].filter).toBe('all')
})

