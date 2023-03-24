import React, {ChangeEvent, useState} from 'react';

type NotePropsType = {
    id: string
    title: string
}

export const Note: React.FC<NotePropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const editNoteHandler = () => setEditMode(!editMode)
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    return (
        <span key={props.id}>
            {editMode
                ? <input value={title} onChange={changeTitleHandler}/>
                : title}

            <button onClick={editNoteHandler}>edit note</button>
        </span>

    );
};

