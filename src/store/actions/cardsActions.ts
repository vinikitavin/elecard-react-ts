import axios from "axios";
import {cardsSlice} from "../slices/cardsSlice";
import {ICard} from "../../types/card";
import {AppDispatch} from "../index";

export function fetchCards() {
    return async (dispatch: AppDispatch) => {
        if (!localStorage.getItem('cards')) {
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
                dispatch(cardsSlice.actions.fetchSuccessCards(
                    responseData
                ))
                dispatch(cardsSlice.actions.fetchSuccessTree(
                    responseData
                ))
            } catch (e) {
                dispatch(cardsSlice.actions.fetchError(e as Error))
            }
        } else {
            const result = JSON.parse(localStorage.getItem('cards')!)
            dispatch(cardsSlice.actions.fetchSuccessCards(result))
        }
    }
}


