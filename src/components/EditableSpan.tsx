import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    setChanges: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')


    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.setChanges(title)
    }

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <input autoFocus
                     onBlur={activateViewMode}
                     onChange={onInputChangeHandler}
                     type={'text'}
                     value={title}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}