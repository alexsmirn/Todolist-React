import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    todolistId: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchTodolistsReducer] = useReducer(todolistReducer, [
        {todolistId: todolistId1, title: 'Todolist N1', filter: 'all'},
        {todolistId: todolistId2, title: 'Todolist N2', filter: 'completed'}
    ])

    const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JAVA SCRIPT', isDone: true},
            {id: v1(), title: 'REACT', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'GET UP AT 7:00', isDone: true},
            {id: v1(), title: 'DO EXERCISE', isDone: true},
            {id: v1(), title: 'GO TO SLEEP AT 23:30', isDone: false}
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasksReducer(removeTaskAC(todolistId, taskId))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasksReducer(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string) => {
        dispatchTasksReducer(changeTaskStatusAC(todolistId, taskId))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newValue: string) => {
        dispatchTasksReducer(changeTaskTitleAC(todolistId, taskId, newValue))
    }

    const changeFilter = (todolistId: string, newFilterValue: FilterType) => {
        dispatchTodolistsReducer(ChangeTodolistFilterAC(todolistId, newFilterValue))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatchTodolistsReducer(RemoveTodolistAC(todolistId))
        dispatchTasksReducer(RemoveTodolistAC(todolistId))
    }

    const addTodolist = (title: string) => {
        dispatchTodolistsReducer(AddTodolistAC(title))
        dispatchTasksReducer(AddTodolistAC(title))
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchTodolistsReducer(ChangeTodolistTitleAC(todolistId, newTitle))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {todolists.map(el => {
                        return (
                            <Grid item>
                                <Todolist key={el.todolistId}
                                          todolistId={el.todolistId}
                                          title={el.title}
                                          tasks={tasks[el.todolistId]}
                                          filter={el.filter}

                                          removeTask={removeTask}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          changeFilter={changeFilter}
                                          deleteTodolist={deleteTodolist}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Grid>
                            )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
