import React, {useState} from 'react';
import '../todolist.css'
import {FilterType} from "../App";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    // const [filter, setFilter] = useState<FilterType>('all')
    let filteredTasks = props.tasks

    if (props.filter === 'active') filteredTasks = props.tasks.filter(el => !el.isDone)

    if (props.filter === 'completed') filteredTasks = props.tasks.filter(el => el.isDone)

    //Handlers
    const onRemoveTaskHandler = (todolistId: string, taskId: string) => {
        props.removeTask(todolistId, taskId)
    }

    const onFilterClickHandler = (todolistId: string, filterValue: FilterType) => {
        props.changeFilter(todolistId, filterValue)
    }

    const onTodolistTitleChange = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }


    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    return <div>
        <EditableSpan setChanges={(newValue) => onTodolistTitleChange(newValue)} title={props.title}/>
        <AddItemForm addItem={addTask}/>
        <ul>
            {filteredTasks.map(el => {

                const onCheckboxChangeHandler = () => {
                    props.changeTaskStatus(props.todolistId, el.id)
                }

                const onChangeTaskTitleChangeHandler = (newValue: string) => {
                    props.changeTaskTitle(props.todolistId, el.id, newValue)
                }

                return <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                    <Checkbox checked={el.isDone} onChange={onCheckboxChangeHandler}/>
                    <EditableSpan setChanges={(newValue) => onChangeTaskTitleChangeHandler(newValue)} title={el.title}/>
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



