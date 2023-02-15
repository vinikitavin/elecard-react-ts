import React, {useRef} from "react";
import {ICard} from "../../../types/card";

interface IMainCardProps {
    card: ICard
    getClosedCards: Function
}

export function TheMainCard({card, getClosedCards}: IMainCardProps): JSX.Element {

    const closeIcon = useRef<HTMLImageElement>(null);

    function getCardId() {
        // getClosedCards(Number(closeIcon.current!.id))
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
                    Категория: {card.category}
                </li>
                <li className="main-cards__date">
                    Дата: {card.timestamp}
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
