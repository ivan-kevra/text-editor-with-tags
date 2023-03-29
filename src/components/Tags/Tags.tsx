import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.scss'

export type TagType = {
    id: string
    title: string
}
type TagsPropsType = {
    tags: Array<TagType>
    addTag: (title: string) => void
    removeTag: (id: string) => void
    changeTagFilter: (filterValue: string) => void
    filter: string | null
}

export const Tags: React.FC<TagsPropsType> = (props) => {

    const [title, setTitle] = useState('')
    const addTagHandler = () => {
        props.addTag(title)
        setTitle('')
    }
    const setTagTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    return (
        <div className={style.tagsContainer}>
            <div className={style.addTagForm}>
                <button onClick={addTagHandler} className={style.addTagButton}>Add tag</button>
                <input value={title} onChange={setTagTitle} className={style.input}/>
            </div>
            <div className={style.tags}>
                {props.tags.map((tag) => {
                        const removeTagHandler = () => props.removeTag(tag.id)

                        const changeTagFilterHandler = () => props.changeTagFilter(tag.title)

                        return (
                            <div key={tag.id} className={style.tagForm}>
                                <button onClick={changeTagFilterHandler} className={style.tag}>{tag.title}</button>
                                <button onClick={removeTagHandler} className={style.deleteTagButton}>X</button>
                            </div>
                        )
                    }
                )}

            </div>

        </div>
    );
};

