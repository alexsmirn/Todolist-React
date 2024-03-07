import {Task} from "../components/Task";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task Stories',
    component: Task
}

const removeTask = action('Task Removed')
const changeTaskTitle = action('Task Title is changed')
const changeTaskStatus = action('Task Status is changed')
export const TaskBaseExample = () => {
    return <>
        <Task task={{id: '1', title: 'Task N1', isDone: false}}
              todolistId={'todolisId1'}
              removeTask={removeTask}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}/>

        <Task task={{id: '2', title: 'Task N2', isDone: true}}
              todolistId={'todolistId2'}
              removeTask={removeTask}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}/>
    </>
}