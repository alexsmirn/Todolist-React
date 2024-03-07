import React, {useCallback} from 'react';
import '../todolist.css'
import {FilterType} from "../App";
import Button from '@mui/material/Button';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";


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
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, newFilterValue: FilterType) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void

    changeTaskStatus: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}



export const Todolist: React.FC<TodolistPropsType> = React.memo((props) => {

    console.log(`Todolist is called ${props.todolistId.slice(0, 8)}`)

    // const [filter, setFilter] = useState<FilterType>('all')
    let filteredTasks = props.tasks

    if (props.filter === 'active') filteredTasks = props.tasks.filter(el => !el.isDone)

    if (props.filter === 'completed') filteredTasks = props.tasks.filter(el => el.isDone)

    //Handlers

    const onFilterClickHandler = (todolistId: string, filterValue: FilterType) => {
        props.changeFilter(todolistId, filterValue)
    }

    const onTodolistTitleChange = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [])

    return <div>
        <EditableSpan setChanges={(newValue) => onTodolistTitleChange(newValue)} title={props.title}/>
        <AddItemForm addItem={addTask}/>
        <ul>
            {filteredTasks !== undefined ? filteredTasks.map(el => {
                return <Task task={el} key={el.id}
                             todolistId={props.todolistId}
                             removeTask={props.removeTask}
                             changeTaskTitle={props.changeTaskTitle}
                             changeTaskStatus={props.changeTaskStatus}/>
            }) : <div></div>}
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
});



