import React, {ChangeEvent, useState} from 'react';
import style from '../../../App.module.scss'
import Highlighter from "react-highlight-words";
import {TagType} from "../../Tags/Tags";


type NotePropsType = {
    title: string
    changeNoteName: (newTitle: string) => void
    tags: Array<TagType>
}

export const Note: React.FC<NotePropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)


    const activateEditMode = () => setEditMode(true);

    const activateViewMode = () => {
        setEditMode(false);
        props.changeNoteName(title);
    }


    const changeTitleHandler = (event: ChangeEvent<HTMLTextAreaElement>) => setTitle(event.currentTarget.value)

    const tags = props.tags.map((tag) => tag.title)

    return (
        <div className={style.note}>
            {editMode
                ? <div>
                    <textarea value={title} onChange={changeTitleHandler} className={style.textInput}/>
                    <Highlighter
                        searchWords={tags}
                        autoEscape={true}
                        textToHighlight={title}
                    />
                    <button onClick={activateViewMode}>save note</button>
                </div>
                : <div>
                    {title}
                    <button onClick={activateEditMode}>edit note</button>
                </div>}
        </div>
    )
};

