import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICard} from "../../types/card";

export interface IState {
    loading: boolean,
    error: string,
    cards: ICard[]
}

const initialState: IState = {
    loading: false,
    error: '',
    cards: []
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        fetching(state: IState) {
            state.loading = true
        },
        fetchSuccess(state: IState, action: PayloadAction<ICard[]>) {
            state.loading = false
            state.cards = action.payload
        },
        fetchError(state: IState, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default cardsSlice.reducer
