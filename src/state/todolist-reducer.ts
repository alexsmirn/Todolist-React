import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    filter: FilterType
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType

export const todolistReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter( el => el.todolistId !== action.todolistId )
        }

        case 'ADD-TODOLIST': {
            const newTodolistId = v1()
            const newTodolist: TodolistType = {todolistId: newTodolistId, title: action.title, filter: "all"}

            return [newTodolist, ...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map( el => el.todolistId === action.todolistId ? {...el, filter: action.filter} : el)
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map( el => el.todolistId === action.todolistId ? {...el, title: action.title} : el)
        }

        default: {
            throw Error(`I don't understand this action type`)
        }
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title}
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter}
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title}
}