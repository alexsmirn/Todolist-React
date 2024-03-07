import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string

    //Callbacks
    changeTaskStatus: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task is called')
    const onCheckboxChangeHandler = () => {
        props.changeTaskStatus(props.todolistId, props.task.id)
    }
    const onChangeTaskTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    }
    const onRemoveTaskHandler = (todolistId: string, taskId: string) => {
        props.removeTask(todolistId, taskId)
    }

    return <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox checked={props.task.isDone} onChange={onCheckboxChangeHandler}/>
        <EditableSpan setChanges={(newValue) => onChangeTaskTitleChangeHandler(newValue)} title={props.task.title}/>
        <IconButton onClick={() => onRemoveTaskHandler(props.todolistId, props.task.id)}>
            <DeleteIcon/>
        </IconButton>
    </li>
})