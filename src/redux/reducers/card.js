import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    HttpPostRequest,
    HttpGetRequest,
    HttpDeleteRequest
} from "../../HttpRequests";

const initialState = {
  isLoading: false,
  cards: null,
  selectedCard: null,
  adminCards: null,
}

export const getAllCards = createAsyncThunk('getAllCards', async () => {
    const response = await HttpGetRequest('/cards');

    return response.json();
});

export const getFilteredCards = createAsyncThunk('getFilteredCards', async (action) => {
    const response = await HttpPostRequest('/cards', action.filters);

    return response.json();
});

export const getCardById = createAsyncThunk('getCardById', async (action) => {
    const response = await HttpGetRequest(`/cards/${action.id}`);
  
    return response.json();
});

export const getAdminCardById = createAsyncThunk('getAdminCardById',
    async (action) => {
        const response = await HttpGetRequest(`/cards/${action.id}`);
    
        return response.json();
});

export const deleteCardById = createAsyncThunk('deleteCardById', async (action) => {
    const response = await HttpDeleteRequest(`/card/${action.id}`);
  
    return response.json();
})

export const updateCardById = createAsyncThunk('updateCardById', async (action) => {
    const response = await HttpPostRequest(`/card/${action.id}`, {
        ...action.card,
     });
  
    return response.json();
})

export const createCard = createAsyncThunk('createCard', async (action) => {
    const response = await HttpPostRequest(`/card/`, {
        ...action.card,
     });
  
    return response.json();
})

export const cardsSlice = createSlice({
    name: 'Cards',
    initialState,
    reducers: {
        selectCard: (state, action) => {
            state.selectedCard = action.id;
            if (action.id === null)
                state.adminCards.push({
                    name: '',
                    desc: '',
                    type: null,
                    specie: null,
                    card: '',
                    big_card: '',
                    tags: [],
                    card_num: -1,
                    hidden: "false"
                })
        },
        unselectCard: (state) => {
            state.selectedCard = false;
        },
        deleteCard: (state, action) => {
            const index = state.adminCards.findIndex(card => card.id === action.id);
            state.adminCards.splice(index, 1);
        },
        updateAdminCard: (state, action) => {
            const index = (state.selectedCard)
            ? state.adminCards.findIndex(card => card.id === state.selectedCard)
            : state.adminCards.findIndex(card => !card.id)

            state.adminCards[index] = action.card
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCards.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllCards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.adminCards = action.payload;
        });
        builder.addCase(getAllCards.rejected, (state) => {
            state.isLoading = false;
            state.adminCards = [];
            console.error('Erreur lors de la recupération des cartes administrateurs');
        });

        builder.addCase(getFilteredCards.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFilteredCards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cards = action.payload;
        });
        builder.addCase(getFilteredCards.rejected, (state) => {
            state.isLoading = false;
            state.cards = [];
            console.error('Erreur lors de la recupération des cartes');
        });

        builder.addCase(getCardById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCardById.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.cards.findIndex(card => card.id === action.payload[0].id);
            state.cards[index].big_card = action.payload[0].big_card;
        });
        builder.addCase(getCardById.rejected, (state) => {
            state.isLoading = false;
            state.cards = [];
            console.error('Erreur lors de la recupération de la carte');
        });

        builder.addCase(getAdminCardById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAdminCardById.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.adminCards.findIndex(card => card.id === action.payload[0].id);
            state.adminCards[index].big_card = action.payload[0].big_card;
        });
        builder.addCase(getAdminCardById.rejected, (state) => {
            state.isLoading = false;
            state.adminCards = [];
            console.error('Erreur lors de la recupération de la carte');
        });

        builder.addCase(deleteCardById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCardById.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(deleteCardById.rejected, (state) => {
            state.isLoading = false;
            console.error('Erreur lors de la suppression de la carte');
        });

        builder.addCase(updateCardById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCardById.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateCardById.rejected, (state) => {
            state.isLoading = false;
            console.error('Erreur lors de la récupération des cartes administrateurs');
        });

        builder.addCase(createCard.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createCard.fulfilled, (state, action) => {
            state.isLoading = false;

            const index = state.adminCards.findIndex(card => !card.id)

            state.adminCards[index].id = action.payload.id
        });
        builder.addCase(createCard.rejected, (state) => {
            state.isLoading = false;
            console.error('Erreur lors de la récupération des cartes administrateurs');
        });
    }
})

export default cardsSlice.reducer