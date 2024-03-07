import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import '../../todolist.css'
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onEnterPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.charCode === 13) {
            addItem()
        }
    }

    const addItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }

        if (newTaskTitle.trim() === '') {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField error={!!error} onChange={onInputChangeHandler}
                       value={newTaskTitle}
                       type="text"
                       id="outlined-basic"
                       label='Add task'
                       variant="outlined"
                       onKeyPress={onEnterPressHandler}

            />
            {/*<Button onClick={() => addItem()} variant={"contained"} color={"primary"}>+</Button>*/}
            <IconButton onClick={() => addItem()}>
                <AddBoxIcon/>
            </IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
})