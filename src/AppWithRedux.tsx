import React, {useCallback} from 'react';
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
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    todolistId: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = React.memo(() => {

    console.log('⚛App is called⚛')

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newValue))
    }, [])

    const changeFilter = useCallback((todolistId: string, newFilterValue: FilterType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, newFilterValue))
    }, [])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    },[])

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, newTitle))
    }, [])

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
                            <Grid key={el.todolistId} item>
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
})

export default AppWithRedux;
