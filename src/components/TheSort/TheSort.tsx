import React, {useEffect, useRef, useState} from "react";

export function TheSort({getSortedCardsArr}: {getSortedCardsArr: Function}): JSX.Element {
    const [value, setValue] = useState('');
    let [isOpen, setIsOpen] = useState(false);

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value)
        setIsOpen(!isOpen)
    }

    function handleOpen(): void {
        setIsOpen(!isOpen)
    }

    const sortEl = useRef<HTMLDivElement>(null);
    const sortMenu = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: any): void => {
            if (
                !sortEl.current!.contains(e.target) &&
                !sortMenu.current!.contains(e.target)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="sort">
            <div ref={sortEl} onClick={handleOpen} className="sort__menu">Сортировать</div>
            <div ref={sortMenu} className={isOpen ? "sort__content_active" : "sort__content_disabled"}>
                <form className="sort__radio">
                    <label className="radio">
                        <input
                            name="sort"
                            type="radio"
                            value="category"
                            checked={value === 'category'}
                            onChange={changeHandler}
                            onClick={() => { getSortedCardsArr("category") }}
                        />
                        <span>Категории</span>
                    </label>
                    <label className="radio">
                        <input
                            name="sort"
                            type="radio"
                            value="timestamp"
                            checked={value === 'timestamp'}
                            onChange={changeHandler}
                            onClick={() => { getSortedCardsArr("timestamp") }}
                        />
                        <span>Дата</span>
                    </label>
                    <label className="radio">
                        <input
                            name="sort"
                            type="radio"
                            value="image"
                            checked={value === 'image'}
                            onChange={changeHandler}
                            onClick={() => { getSortedCardsArr("image") }}
                        />
                        <span>Название</span>
                    </label>
                    <label className="radio">
                        <input
                            name="sort"
                            type="radio"
                            value="filesize"
                            checked={value === 'filesize'}
                            onChange={changeHandler}
                            onClick={() => { getSortedCardsArr("filesize") }}
                        />
                        <span>Размер</span>
                    </label>
                </form>
            </div>
        </div>
    )
}
