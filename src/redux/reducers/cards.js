import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    HttpPostRequest,
    HttpPutRequest,
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
    let url = '/cards?hidden=false';

    const filters = Object.entries(action.filters).map(([key, value]) => {
        return {
            key: key,
            value: value
        };
    });

    filters.forEach(filter => {
        url += `&${filter.key}=${filter.value}`
    })

    const response = await HttpGetRequest(url);

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
    const response = await HttpDeleteRequest(`/cards/${action.id}`);

    return response.json();
})

export const updateCardById = createAsyncThunk('updateCardById', async (action) => {
    const response = await HttpPutRequest(`/cards/${action.id}`, {
        ...action.card,
     });
  
    return response.json();
})

export const createCard = createAsyncThunk('createCard', async (action) => {
    const response = await HttpPostRequest(`/cards`, {
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
            const index = (state.cards || []).findIndex(card =>
                card.id === action.payload.id
            );

            if (index !== -1)
                state.cards[index].big_card = action.payload;
            else {
                if (!state.cards) state.cards = []
                state.cards.push(action.payload)
            }
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
            const index = state.adminCards.findIndex(card =>
                card.id === action.payload.id
            );
            state.isLoading = false;
            state.adminCards[index] = action.payload;
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
        builder.addCase(updateCardById.fulfilled, (state, action) => {
            const indexAdmin = (state.adminCards || []).findIndex(card =>
                card.id === action.payload.id
            );
            const index = (state.cards || []).findIndex(card =>
                card.id === action.payload.id
            );
            
            if (indexAdmin !== -1)
                state.adminCards[indexAdmin] = action.payload;

            if (index !== -1)
                state.adminCards[index] = action.payload;

            state.isLoading = false;
        });
        builder.addCase(updateCardById.rejected, (state) => {
            state.isLoading = false;
            console.error('Erreur lors de la mise a jour de la carte');
        });

        builder.addCase(createCard.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createCard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.adminCards.push(action.payload)
        });
        builder.addCase(createCard.rejected, (state) => {
            state.isLoading = false;
            console.error('Erreur lors de la creation de la carte');
        });
    }
})

export default cardsSlice.reducer