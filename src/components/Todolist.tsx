import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './todolist.css'
import {FilterType} from "./App";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    todolistId: string

    //Callbacks
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, newFilterValue: FilterType) => void
    deleteTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    // const [filter, setFilter] = useState<FilterType>('all')

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const [error, setError] = useState<string | null>('')

    let filteredTasks = props.tasks

    if (props.filter === 'active') filteredTasks = props.tasks.filter(el => !el.isDone)

    if (props.filter === 'completed') filteredTasks = props.tasks.filter(el => el.isDone)

    //Handlers

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onEnterPressHandler = (todolistId: string, event: KeyboardEvent<HTMLInputElement>) => {

        setError(null)

        if (event.charCode === 13) {
            addTask(todolistId)
        }
    }

    const onRemoveTaskHandler = (todolistId: string, taskId: string) => {
        props.removeTask(todolistId, taskId)
    }

    const addTask = (todolistId: string) => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(todolistId, newTaskTitle)
            setNewTaskTitle('')
        }

        if (newTaskTitle.trim() === '') {
            setError('Title is required')
        }
    }

    const onFilterClickHandler = (todolistId: string, filterValue: FilterType) => {
        props.changeFilter(todolistId, filterValue)
    }

    const onCheckboxChangeHandler = (todolistId: string, taskId: string) => {
        props.changeTaskStatus(todolistId, taskId)
    }

    return <div>
        <div>{props.title}</div>
        <input className={error ? 'error' : ''} onChange={(e) => onInputChangeHandler(e)}
               value={newTaskTitle}
               type="text"
               placeholder={'Add task'}
               onKeyPress={(e) => onEnterPressHandler(props.todolistId, e)}
        />
        <button onClick={() => addTask(props.todolistId)}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
        <ul>
            {filteredTasks.map(el => {
                return <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                    <Checkbox checked={el.isDone} onChange={ () => onCheckboxChangeHandler(props.todolistId, el.id) }/>
                    <span>{el.title}</span>
                    <button onClick={() => onRemoveTaskHandler(props.todolistId, el.id)}>x</button>
                </li>
            })}
        </ul>
        <div className={'filter-button-container'}>
            <Button size='small' variant={props.filter === 'all' ? 'contained' : 'outlined'} className={props.filter === 'all' ? 'current-filter' : 'filter-button'}
                    onClick={() => onFilterClickHandler(props.todolistId, 'all')}>All
            </Button>
            <Button size='small' variant={props.filter === 'active' ? 'contained' : 'outlined'} className={props.filter === 'active' ? 'current-filter' : 'filter-button'}
                    onClick={() => onFilterClickHandler(props.todolistId, 'active')}>Active
            </Button>
            <Button size='small' variant={props.filter === 'completed' ? 'contained' : 'outlined'} className={props.filter === 'completed' ? 'current-filter' : 'filter-button'}
                    onClick={() => onFilterClickHandler(props.todolistId, 'completed')}>Completed
            </Button>
        </div>
        <Button size='small' variant="outlined" color='error'
            className={'delete-todolist'} onClick={() => props.deleteTodolist(props.todolistId)}>Delete Todolist</Button>
    </div>
};

