import React, {ChangeEvent, useState} from 'react';
import {Note} from "./Note/Note";
import {TagType} from "../Tags/Tags";
import {v1} from "uuid";
import style from '../../App.module.scss'

export type NoteType = {
    id: string
    title: string
}

type NotesPropsType = {
    notes: Array<NoteType>
    addNote: (title: string) => void
    removeNote: (noteId: string) => void
    tags: Array<TagType>
    addTagsFromNotes: (newTags: Array<TagType>) => void
    changeNoteName: (noteId: string, title: string) => void
}

export const Notes: React.FC<NotesPropsType> = (props) => {
    const [title, setTitle] = useState('')


    const addNoteHandler = () => {
        props.addNote(title.replace(/[^a-zа-яё0-9\s]/gi, ''))
        setTitle('')
        let titleArray = title.trim().split(' ')
        let newArray: Array<TagType> = []
        for (let i = 0; i < titleArray.length; i++) {
            if (titleArray[i].startsWith('#')) {
                let newTag = {id: v1(), title: titleArray[i].replace(/[^a-zа-яё0-9\s]/gi, '')}
                newArray = [newTag, ...newArray]
                props.addTagsFromNotes(newArray)
            }
        }
    }


    const setNoteTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    return (
        <div className={style.notesContainer}>
            <div className={style.addNoteForm}>
                <button className={style.addNoteButton} onClick={addNoteHandler}>add note</button>
                <input value={title} onChange={setNoteTitle} placeholder={'Введите текст'} className={style.input}/>
            </div>
            <div className={style.notesList}>
                {props.notes.map((note) => {
                    const removeNoteHandler = () => props.removeNote(note.id)
                    const changeNoteNameHandler = (newTitle: string) => {
                        props.changeNoteName(note.id, newTitle)
                    }
                    return (
                        <div key={note.id} className={style.notes}>
                            <Note title={note.title} changeNoteName={changeNoteNameHandler} tags={props.tags}/>
                            <button onClick={removeNoteHandler} className={style.deleteNoteButton}>Delete</button>
                        </div>
                    )
                })}
            </div>



        </div>
    );
};

