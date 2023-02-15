import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cardsSlice from './slices/cardsSlice'

const rootReducer = combineReducers({
    cards: cardsSlice
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

