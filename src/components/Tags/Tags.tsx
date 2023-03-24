import React, {ChangeEvent, useState} from 'react';

export type TagType = {
    id: string
    title: string
}

type TagsPropsType = {
    tags: Array<TagType>
    addTag: (title: string) => void
    removeTag: (id: string) => void
}

export const Tags: React.FC<TagsPropsType> = (props) => {

    const [title, setTitle] = useState('')
    const addTagHandler = () => {
        props.addTag(title)
        setTitle('')
    }
    const setTagTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    return (
        <div>
            <h2>
                <button onClick={addTagHandler}>Add tag</button>
                <input value={title} onChange={setTagTitle}/>
            </h2>

            {props.tags.map((tag) => {
                    const removeTagHandler = () => props.removeTag(tag.id)
                    return (
                        <div key={tag.id}>
                            <button>{tag.title}</button>
                            <button onClick={removeTagHandler}>X</button>
                        </div>
                    )
                }
            )}
        </div>
    );
};

