import { configureStore } from '@reduxjs/toolkit'
import cardsReducer from './reducers/card'
import charactersReducer from './reducers/characters'

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
        characters: charactersReducer 
    },
})