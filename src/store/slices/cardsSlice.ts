import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICard} from "../../types/card";

export interface IState {
    loading: boolean,
    error: string,
    cards: ICard[],
    tree: ICard[]
}

const initialState: IState = {
    loading: false,
    error: '',
    cards: [],
    tree: []
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        fetching(state: IState) {
            state.loading = true
        },
        fetchSuccessCards(state: IState, action: PayloadAction<ICard[]>) {
            state.loading = false
            state.cards = action.payload
        },
        fetchSuccessTree(state: IState, action: PayloadAction<ICard[]>) {
            state.tree = action.payload
        },
        fetchError(state: IState, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default cardsSlice.reducer
