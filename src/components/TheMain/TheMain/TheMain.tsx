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

    const [pageNumber, setPageNumber] = useState(0)

    const [isDisabledReset, setIsDisabledReset] = useState(true)

    const handleChangeContent = (change: string) => {
        setChangeContent(change)
    }

    useEffect(() => {
        dispatch(fetchCards())
    }, [dispatch])

    const isLS = localStorage.getItem("cards")

    useEffect(() => {
        isLS
            ? setIsDisabledReset(false)
            : setIsDisabledReset(true)
    }, [isLS]);

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

    const cardsPerPage: number = 6
    const start: number = pageNumber * cardsPerPage
    const end: number = start + cardsPerPage
    const paginatedCountries = cards.slice(start, end)

    const nextPage = () => setPageNumber(prev => prev + 1)
    const prevPage = () => setPageNumber(prev => prev - 1)

    return (
        <main className="main">
            <div className="main__form radio">
                <div className="radio__wrapper">
                    <TheChangeContent onChange={handleChangeContent}/>
                </div>
            </div>
            {changeContent === 'cards' ? (
                <>
                    <div className="main__sort">
                        <TheSort getSortedCardsArr={getSortedCardsArr}/>
                    </div>
                    <div className="main__reset">
                        <button disabled={isDisabledReset} className="main__reset-btn"
                                onClick={resetCardsArray}>Сбросить
                        </button>
                    </div>
                </>
            ) : null}
            {loading ? (
                <div className="main__spinner spinner">
                    <img alt="spinner" src="spinner.gif"/>
                </div>
            ) : !error ? (
                <div className="main__content content">
                    {changeContent === 'cards' ? (
                        <div className="content__card">
                            {
                                paginatedCountries.map((card: ICard) => <TheMainCard key={card.id}
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
            {changeContent === 'cards' ? (
                <div className="main__pagination pagination">
                    <button
                        disabled={pageNumber === 0}
                        onClick={prevPage}
                        className="pagination__prev-btn btn"
                    >Назад
                    </button>
                    <button
                        disabled={pageNumber >= (cards.length / cardsPerPage) - 1}
                        onClick={nextPage}
                        className="pagination__next-btn btn"
                    >Вперед
                    </button>
                </div>
            ) : null}
        </main>
    )
}
