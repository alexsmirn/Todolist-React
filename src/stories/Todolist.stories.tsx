import {Todolist} from "../components/Todolist";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist Stories',
    component: Todolist
}

const addTask = action(`Task has been added to the todolist`)
const changeFilter = action(`Todolist filter has been changed`)
const deleteTodolist = action(`Todolist has been deleted`)
const changeTodolistTitle = action('Todolist title has been changed')
const changeTaskStatus = action('Tasks status has been changed')
const changeTaskTitle = action('Tasks title has been changed')
const removeTask = action('Task has been removed')
export const TodolistBaseExample = () => {
    return <Todolist
        title={'Todolist N1'}
        tasks={[
            {id: 'asdasdasd', title: 'Task 1', isDone: false},
            {id: 'asdasdasdasasd', title: 'Task 2', isDone: false}
        ]}
        filter={'all'}
        todolistId={'todolistId1'}
        addTask={addTask}
        changeFilter={changeFilter}
        deleteTodolist={deleteTodolist}
        changeTodolistTitle={changeTodolistTitle}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask} />
}