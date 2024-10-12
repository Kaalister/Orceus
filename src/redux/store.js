import { configureStore } from '@reduxjs/toolkit'
import cardsReducer from './reducers/cards'
import charactersReducer from './reducers/characters'
import imagesReducer from './reducers/images'

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
        characters: charactersReducer,
        images: imagesReducer,
    },
})