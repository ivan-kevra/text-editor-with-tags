import React, {ChangeEvent, useState} from 'react';
import style from '../../../App.module.scss'

type NotePropsType = {
    title: string
    changeNoteName: (newTitle: string) => void
}

export const Note: React.FC<NotePropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => setEditMode(true);

    const activateViewMode = () => {
        setEditMode(false);
        props.changeNoteName(title);
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)



    return (
        <div className={style.note}>
            {editMode
                ? <input value={title} onChange={changeTitleHandler} autoFocus onBlur={activateViewMode}/>
                : <span onDoubleClick={activateEditMode}>{title}</span>}
        </div>
    )
};

