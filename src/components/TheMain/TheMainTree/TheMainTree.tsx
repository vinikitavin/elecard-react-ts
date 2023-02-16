import React, {useState} from "react";
import {ICard} from "../../../types/card";
import {firstCursiveLetter, timeConverter} from "../../../utils";

interface IMainTreeProps {
    card: ICard,
}

export function TheMainTree({card}: IMainTreeProps): JSX.Element {
    const [isModal, setIsModal] = useState(false)
    const [isOpenedList, setIsOpenedList] = useState(false)

    function openModal() {
        setIsModal(true)
    }

    function closeModal() {
        setIsModal(false)
    }

    function openList() {
        const summary: HTMLElement | null = document.getElementById('summary')
        setIsOpenedList(!isOpenedList)
        summary!.click()
    }

    return (
        <div className="main-tree">
            <div className="main-tree__tree-summaries">
                {isOpenedList ? (
                        <img onClick={openList} alt="minus-icon" className="main-tree__minus" src="minus.svg"/>
                    )
                    : (
                        <img onClick={openList} alt="plus-icon" className="main-tree__plus" src="plus.svg"/>
                    )}
                <details>
                    <summary onClick={() => setIsOpenedList(!isOpenedList)} id="summary" className="main-tree__header">Карточка №{card.id}</summary>
                    <ul className="main-tree__list">
                        <li>
                            Размер файла: {Math.round(Number(card.filesize) / 1024)} КБ
                        </li>
                        <li>
                            Дата: {timeConverter(card.timestamp)}
                        </li>
                        <li>
                            Категория: {firstCursiveLetter(card.category)}
                        </li>
                        <li>
                            <p className="main-tree__img-head">Картинка:</p>
                            <img alt="tree-img"
                                 className="main-tree__img"
                                 src={`http://contest.elecard.ru/frontend_data/${card.image}`}
                                 onClick={openModal}
                            />
                        </li>
                    </ul>
                </details>
            </div>
            {isModal ? (
                <div className="modal__mask">
                    <div className="modal__wrapper">
                        <div className="modal__container">
                            <div className="modal__content">
                                <img alt="card-img" className="modal__img"
                                     src={`http://contest.elecard.ru/frontend_data/${card.image}`}/>
                                <button className="modal__btn" onClick={closeModal}>Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
