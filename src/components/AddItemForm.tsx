import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import '../todolist.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onEnterPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        setError(null)

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

    return(
        <div>
            <input className={error ? 'error' : ''} onChange={(e) => onInputChangeHandler(e)}
                   value={newTaskTitle}
                   type="text"
                   placeholder={'Add task'}
                   onKeyPress={(e) => onEnterPressHandler(e)}
            />
            <button onClick={() => addItem()}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}