import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Notes, NoteType} from "./components/Notes/Notes";
import {Tags, TagType} from "./components/Tags/Tags";


export const App = () => {

    const state = {
        "notes": [
            {
                "id": "f706d4b0-ca5e-11ed-8023-09a570543186",
                "title": "active"
            },
            {
                "id": "f706fbc0-ca5e-11ed-8023-09a570543186",
                "title": "completed"
            },
            {
                "id": "f706fbc1-ca5e-11ed-8023-09a570543186",
                "title": "all"
            }
        ],
        "tags": [
            {
                "id": "f706fbc2-ca5e-11ed-8023-09a570543186",
                "title": "active"
            },
            {
                "id": "f706fbc3-ca5e-11ed-8023-09a570543186",
                "title": "completed"
            },
            {
                "id": "f706fbc4-ca5e-11ed-8023-09a570543186",
                "title": "all"
            }
        ]
    }


    const [notes, setNotes] = useState<Array<NoteType>>(state.notes)
    const [tags, setTags] = useState<Array<TagType>>(state.tags)


    let [filter, setFilter] = useState<string | null>(null)

    const addNote = (title: string) => {
        setNotes([{id: v1(), title}, ...notes])
    }
    const removeNote = (noteId: string) => {
        setNotes(notes.filter((note) => note.id !== noteId))
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
        console.log('filter changed')
        setFilter(filterValue)
    }
    const showAllTagsHandler = () => {
        setFilter(null)
    }

    let filteredNotes = notes

    if (filter) {
        filteredNotes = filteredNotes.filter((note) => note.title == filter)
    }

    return (
        <div className="App">
            <h1>Редактор заметок</h1>
            <Notes
                notes={filteredNotes}
                addNote={addNote}
                removeNote={removeNote}
                tags={tags}
                addTagsFromNotes={addTagsFromNotes}/>
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
