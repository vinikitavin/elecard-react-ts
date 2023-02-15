import React, {useEffect, useState} from "react";
import {TheChangeContent} from "../../TheChangeContent/TheChangeContent"
import {TheSort} from "../../TheSort/TheSort"
import {TheMainCard} from "../TheMainCard/TheMainCard"
import {TheMainTree} from "../TheMainTree/TheMainTree"
import {fetchCards} from "../../../store/actions/cardsActions";
import {useAppDispatch, useAppSelector} from "../../../hook/redux";
import {cardsSlice} from "../../../store/slices/cardsSlice";
import {ICard} from "../../../types/card";

export function TheMain(): JSX.Element {
    const dispatch = useAppDispatch()
    const {error, loading, cards, tree} = useAppSelector((state) => state.cards)

    const [changeContent, setChangeContent] = useState('cards')

    const handleChangeContent = (change: string) => {
        setChangeContent(change)
    }

    useEffect(() => {
        dispatch(fetchCards())
    }, [dispatch])

    function getClosedCards(closedCard: number) {
        let cardsCopy = Object.assign([], cards);
        const result = cardsCopy.filter((card: ICard) => {
            return card.id !== closedCard
        })
        dispatch(cardsSlice.actions.fetchSuccessCards(result))
        localStorage.setItem('cards', JSON.stringify(result))
    }

    function getSortedCardsArr(value: string) {
        let cardsCopy = Object.assign([], cards);
        if (value === 'image') {
            const result = cardsCopy.sort((a: any, b: any) =>
                a.image.split('/')[1]
                > b.image.split('/')[1]
                    ? 1
                    : -1
            )
            dispatch(cardsSlice.actions.fetchSuccessCards(result))
        } else {
            const result = cardsCopy.sort((a: any, b: any) =>
                a[value]
                > b[value]
                    ? 1
                    : -1
            )
            dispatch(cardsSlice.actions.fetchSuccessCards(result))
        }
    }

    function resetCardsArray() {
        localStorage.removeItem('cards')
        dispatch(fetchCards())
    }

    return (
        <main className="main">
            <div className="main__form radio">
                <div className="radio__wrapper">
                    <TheChangeContent onChange={handleChangeContent}/>
                </div>
            </div>
            <div className="main__sort">
                <TheSort getSortedCardsArr={getSortedCardsArr}/>
            </div>
            <div className="main__reset">
                <button className="main__reset-btn" onClick={resetCardsArray}>Сбросить
                </button>
            </div>
            {loading ? (
                <div className="main__spinner spinner">
                    <img alt="spinner" src="spinner.gif"/>
                </div>
            ) : !error ? (
                <div className="main__content content">
                    {changeContent === 'cards' ? (
                        <div className="content__card">
                            {
                                cards.map((card: ICard) => <TheMainCard key={card.id}
                                                                        card={card}
                                                                        getClosedCards={getClosedCards}
                                />)
                            }
                        </div>
                    ) : (
                        <div className="content__tree">
                            {
                                tree.map((card: ICard) => <TheMainTree key={card.id}
                                                                        card={card}
                                />)
                            }
                        </div>
                    )}
                </div>
            ) : <div>Ошибка при получении данных</div>}
        </main>
    )
}
