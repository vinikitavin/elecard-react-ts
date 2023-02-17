import axios from "axios";
import {cardsSlice} from "../slices/cardsSlice";
import {ICard} from "../../types/card";
import {AppDispatch} from "../index";

export function fetchCards() {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(cardsSlice.actions.fetching)
            const response = await axios.get('http://contest.elecard.ru/frontend_data/catalog.json')
            const responseData = response.data.map((card: ICard, index: number) => {
                return {
                    id: index + 1,
                    image: card.image,
                    filesize: card.filesize,
                    timestamp: card.timestamp,
                    category: card.category
                }
            })
            if (!localStorage.getItem('closedCards')) {
                dispatch(cardsSlice.actions.fetchSuccessCards(
                    responseData
                ))
                dispatch(cardsSlice.actions.fetchSuccessTree(
                    responseData
                ))
            } else {
                const closedCards = JSON.parse(localStorage.getItem('closedCards')!)
                const newArray: ICard[] = responseData.filter((card: ICard) => {
                    return !closedCards.includes(card.id)
                })
                dispatch(cardsSlice.actions.fetchSuccessCards(newArray))
                dispatch(cardsSlice.actions.fetchSuccessTree(
                    responseData
                ))
            }
        } catch (e) {
            dispatch(cardsSlice.actions.fetchError(e as Error))
        }
    }
}


