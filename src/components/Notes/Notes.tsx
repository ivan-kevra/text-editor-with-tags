import React, {ChangeEvent, useState} from 'react';
import {Note} from "./Note/Note";
import {TagType} from "../Tags/Tags";
import {v1} from "uuid";

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
}

export const Notes: React.FC<NotesPropsType> = (props) => {
    const [title, setTitle] = useState('')
    const addNoteHandler = () => {
        props.addNote(title.replace(/[^a-zа-яё0-9\s]/gi, ' '))
        setTitle('')

        let titleArray = title.trim().split(' ') // из строки сделали массив для обработки
        let newArray: Array<TagType> = []

        for (let i = 0; i < titleArray.length; i++) {
            if (titleArray[i].startsWith('#')) {
                let newTag = {id: v1(), title: titleArray[i].replace(/[^a-zа-яё0-9\s]/gi, ' ')}
                newArray = [newTag, ...newArray]
                props.addTagsFromNotes(newArray)
            }
        }
    }
    const setNoteTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    return (
        <div>
            <h2>
                <button onClick={addNoteHandler}>add note</button>
                <input value={title} onChange={setNoteTitle}/>
            </h2>
            {props.notes.map((note) => {
                const removeNoteHandler = () => props.removeNote(note.id)

                return (
                    <div key={note.id}>
                        <button onClick={removeNoteHandler}>X</button>
                        <Note id={note.id} title={note.title}/>
                    </div>
                )
            })}
        </div>
    );
};

