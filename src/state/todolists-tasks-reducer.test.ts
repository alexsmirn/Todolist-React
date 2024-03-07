import {AddTodolistAC, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType} from "../App";

test('ids should be equal', () => {
    const initialTasksState: TasksStateType = {}
    const initialTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('New Todolist')
    const resultTasksState = tasksReducer(initialTasksState, action)
    const resultTodolistsState = todolistReducer(initialTodolistsState, action)

    const idFromTasks = Object.keys(resultTasksState)[0]
    const idFromTodolists = resultTodolistsState[0].todolistId

    expect(idFromTasks).toBe(action.newTodolistId)
    expect(idFromTodolists).toBe(action.newTodolistId)
})