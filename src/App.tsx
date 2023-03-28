import React, {useState} from 'react';
import {v1} from 'uuid';
import style from './App.module.css'
import {Notes, NoteType} from "./components/Notes/Notes";
import {Tags, TagType} from "./components/Tags/Tags";


export const state = {
    ["notes"]: [
        {
            "id": v1(),
            "title": "active"
        },
        {
            "id": v1(),
            "title": "completed"
        },
        {
            "id": v1(),
            "title": "all"
        }
    ],
    ["tags"]: [
        {
            "id": v1(),
            "title": "active"
        },
        {
            "id": v1(),
            "title": "completed"
        },
        {
            "id": "f706fbc4-ca5e-11ed-8023-09a570543186",
            "title": "all"
        }
    ]
}

export const App = () => {

    let [notes, setNotes] = useState<Array<NoteType>>(state.notes)
    let [tags, setTags] = useState<Array<TagType>>(state.tags)
    let [filter, setFilter] = useState<string>('')

    const addNote = (title: string) => {
        setNotes([{id: v1(), title}, ...notes])
    }
    const removeNote = (noteId: string) => {
        setNotes(notes.filter((note) => note.id !== noteId))
    }
    const changeNoteName = (noteId: string, title: string) => {
        setNotes(notes.map((note) => note.id === noteId
            ? {...note, title}
            : note))
    }

    const addTag = (title: string) => {
        setTags([{id: v1(), title}, ...tags])
    }
    const removeTag = (tagId: string) => {
        setTags(tags.filter((tag) => tag.id !== tagId))
    }


    const addTagsFromNotes = (newTags: Array<TagType>) => {
        setTags([...newTags, ...tags])
    }

    const changeTagFilter = (filterValue: string) => {
        setFilter(filterValue)
    }

    const showAllTagsHandler = () => {
        setFilter('')
    }

    let filteredNotes = notes

    if (filter) {
        filteredNotes = notes.filter((note) => note.title.includes(filter))
    }


    return (
        <div className={style.App}>
            <h1>Редактор заметок</h1>
            <Notes
                notes={filteredNotes}
                addNote={addNote}
                removeNote={removeNote}
                tags={tags}
                addTagsFromNotes={addTagsFromNotes}
                changeNoteName={changeNoteName}
            />
            <Tags tags={tags}
                  addTag={addTag}
                  removeTag={removeTag}
                  filter={filter}
                  changeTagFilter={changeTagFilter}/>
            <button onClick={showAllTagsHandler}>Show all tags</button>
        </div>
    );
}

export default App;
