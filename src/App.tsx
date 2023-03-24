import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Notes, NoteType} from "./components/Notes/Notes";
import {Tags, TagType} from "./components/Tags/Tags";


export const App = () => {

    const [notes, setNotes] = useState<Array<NoteType>>([
        {id: v1(), title: '1st note'},
        {id: v1(), title: '2nd note'},
    ])
    const [tags, setTags] = useState<Array<TagType>>([
        {id: v1(), title: '12345'},
        {id: v1(), title: 'TagWord'}
    ])

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

    return (
        <div className="App">
            <h1>Редактор заметок</h1>
            <Notes
                notes={notes}
                addNote={addNote}
                removeNote={removeNote}
                tags={tags}
                addTagsFromNotes={addTagsFromNotes}/>
            <Tags tags={tags}
                  addTag={addTag}
                  removeTag={removeTag}/>
        </div>
    );
}

export default App;
