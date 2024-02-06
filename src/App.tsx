import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid} from "@mui/material";

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    todolistId: string
    title: string
    filter: FilterType
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {todolistId: todolistId1, title: 'Todolist N1', filter: 'all'},
        {todolistId: todolistId2, title: 'Todolist N2', filter: 'completed'}
    ])

    const [tasks, setTasks] = useState({
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
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: !el.isDone} : el)})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newValue: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map( el => el.id === taskId ? {...el, title: newValue} : el)})
    }

    const changeFilter = (todolistId: string, newFilterValue: FilterType) => {
        setTodolists(todolists.map( el => el.todolistId === todolistId ? {...el, filter: newFilterValue} : el))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter( el => el.todolistId !== todolistId))

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {todolistId: v1(), title, filter: 'all'}

        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.todolistId]: []})
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map( el => el.todolistId === todolistId ? {...el, title: newTitle} : el))
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

export default App;
