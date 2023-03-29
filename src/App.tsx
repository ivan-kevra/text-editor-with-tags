import React, {useState} from 'react';
import {v1} from 'uuid';
import style from './App.module.scss'
import {Notes, NoteType} from "./components/Notes/Notes";
import {Tags, TagType} from "./components/Tags/Tags";


export const state = {
    "notes": [
        {
            "id": v1(),
            "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500srm."
        },
        {
            "id": v1(),
            "title": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        },
        {
            "id": v1(),
            "title": "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content her. Various versions have evolved over the years, sometimes by accidnd the like)."
        },

    ],
    "tags": [
        {
            "id": v1(),
            "title": "Lorem"
        },
        {
            "id": v1(),
            "title": "established"
        },
        {
            "id": v1(),
            "title": "readable"
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
            <h1>Notes editor</h1>
            <div className={style.notesAndTags}>
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
            </div>
            <div className={style.showAllTagsContainer}>
                <button onClick={showAllTagsHandler}>Show all tags</button>
            </div>

        </div>
    );
}

export default App;
