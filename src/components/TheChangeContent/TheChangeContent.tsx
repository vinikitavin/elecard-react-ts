import React, {useState} from "react";

interface IOnChange {
    onChange: Function
}

export function TheChangeContent({onChange}: IOnChange): JSX.Element {
    const [value, setValue] = useState('cards');

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
        onChange(event.target.value);
    }

    return (
        <form className="change__radio">
            <label className="radio">
                <input
                    name="change"
                    type="radio"
                    value="cards"
                    checked={value === 'cards'}
                    onChange={changeHandler}
                />
                <span>Карточки</span>
            </label>
            <label className="radio">
                <input
                    name="change"
                    type="radio"
                    value="tree"
                    checked={value === 'tree'}
                    onChange={changeHandler}
                />
                <span>Дерево</span>
            </label>
        </form>
    )
}
