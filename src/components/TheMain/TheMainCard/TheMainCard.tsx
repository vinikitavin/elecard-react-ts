import React, {useRef} from "react";
import {ICard} from "../../../types/card";
import {firstCursiveLetter, timeConverter} from "../../../utils";

interface IMainCardProps {
    card: ICard
    getClosedCards: Function
}

export function TheMainCard({card, getClosedCards}: IMainCardProps): JSX.Element {

    const closeIcon = useRef<HTMLImageElement>(null);

    function getCardId() {
        getClosedCards(card.id)
    }

    return (
        <div className="main-cards">
            <img alt="card-img"
                 className="main-cards__img"
                 src={`http://contest.elecard.ru/frontend_data/${card.image}`}
            />
            <ul className="main-cards__description">
                <li className="main-cards__category">
                    Категория: {firstCursiveLetter(card.category)}
                </li>
                <li className="main-cards__date">
                    Дата: {timeConverter(card.timestamp)}
                </li>
                <li className="main-cards__size">
                    Размер файла: { Math.round(Number(card.filesize) / 1024) } КБ
                </li>
            </ul>
            <img ref={closeIcon}
                 alt="close-icon"
                 className="main-cards__close-icon"
                 src="close-icon.png"
                 onClick={getCardId}
            />
        </div>
    )
}
