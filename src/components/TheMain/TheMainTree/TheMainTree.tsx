import React, {useState} from "react";
import {ICard} from "../../../types/card";

interface IMainTreeProps {
    card: ICard,
}

export function TheMainTree({card}: IMainTreeProps): JSX.Element {
    const [isModal, setIsModal] = useState(false)

    function openModal() {
        setIsModal(true)
    }

    function closeModal() {
        setIsModal(false)
    }

    return (
        <div className="main-tree">
            <ul className="main-tree__tree-padding main-tree__tree-summaries">
                <li>
                    <details>
                        <summary className="main-tree__header">Карточка №{card.id}</summary>
                        <ul>
                            <li>
                                <details>
                                    <summary className="main-tree__img-wrapper">
                                        <p className="main-tree__img-head">Картинка:</p>
                                        <img alt="tree-img"
                                             className="main-tree__img"
                                             src={`http://contest.elecard.ru/frontend_data/${card.image}`}
                                             onClick={openModal}
                                        />
                                    </summary>
                                </details>
                            </li>
                            <li>
                                <details>
                                    <summary>Размер файла: КБ</summary>
                                </details>
                            </li>
                            <li>
                                <details>
                                    <summary>Дата:</summary>
                                </details>
                            </li>
                            <li>
                                <details>
                                    <summary>Категория:</summary>
                                </details>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
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
