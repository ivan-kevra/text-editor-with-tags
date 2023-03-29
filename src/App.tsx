import React, {useState} from 'react';
import {v1} from 'uuid';
import style from './App.module.scss'
import {Notes, NoteType} from "./components/Notes/Notes";
import {Tags, TagType} from "./components/Tags/Tags";


export const state = {
    "notes": [
        {
            "id": v1(),
            "title": "Это результат выполнение тестового задания. Для того, чтобы редактировать текущую заметеку нажмите Кнопку 'edit note' "
        },
        {
            "id": v1(),
            "title": "Чтобы удалить заметку, нажмите кнопку 'Delete' "
        },
        {
            "id": v1(),
            "title": "Добавить новый тег можнор с помощью кнопки 'Add tag' или с помощью кнопки Add note, введя нужное слово следующим образом '#слово' "
        },
        {
            "id": v1(),
            "title": "При нажатии на один из тегов отобразятся только те заметки, в которых есть выбранный тег. Кнопка 'Показать все заметки сбрасывает фильтр по тегам'"
        },

    ],
    "tags": [
        {
            "id": v1(),
            "title": "результат"
        },
        {
            "id": v1(),
            "title": "удалить"
        },
        {
            "id": v1(),
            "title": "тег"
        },
        {
            "id": v1(),
            "title": "фильтр"
        },
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
            <h1>Текстовый редактор с заметками</h1>
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
