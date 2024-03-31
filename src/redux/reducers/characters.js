import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HttpGetRequest, HttpPutRequest } from "../../HttpRequests";
import { notification } from 'antd';

const initialState = {
    isLoading: false,
    characters: null,
    selectedCharacter: null,
}

export const getCharacters = createAsyncThunk('getCharacters', async () => {
    const response = await HttpGetRequest('/characters');

    return response.json();
});

export const createCharacter = createAsyncThunk('createCharacter', async () => {
    const response = await HttpPutRequest('/characters/create');

    return response.json();
});

export const saveCharacter = createAsyncThunk('saveCharacter', async (action) => {
    const response = await HttpPutRequest(
        `/characters/${action.id}`,
        action.character
    );

    return response.json();
})

export const charactersSlice = createSlice({
    name: 'Characters',
    initialState,
    reducers: {
        selectCharacter: (state, action) => {
            state.selectedCharacter = action.id
        },
        unselectCharacter: (state) => {
            state.selectedCharacter = null
        },
        updateCharacter: (state, action) => {
            const index = state.characters.findIndex(char =>
                char.id === state.selectedCharacter
            );

            if (index === -1) {
                console.error("impossible de mettre a jour le personnage")
                return;
            }
            state.characters[index] = action.character
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCharacters.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCharacters.fulfilled, (state, action) => {
            state.isLoading = false;
            state.characters = action.payload;
        });
        builder.addCase(getCharacters.rejected, (state) => {
            state.isLoading = false;
            state.characters = [];
            console.error('Erreur lors de la recupération des personnages');
        });
        
        builder.addCase(createCharacter.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createCharacter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedCharacter = action.payload.id;
        });
        builder.addCase(createCharacter.rejected, (state) => {
            state.isLoading = false;
            console.error('Erreur lors de la création de personnage');
        });

        builder.addCase(saveCharacter.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(saveCharacter.fulfilled, (state, action) => {
            state.isLoading = false;
            notification.open({
                className: "notification",
                message: 'Sauvegarde réussie !'
            });
        });
        builder.addCase(saveCharacter.rejected, (state) => {
            state.isLoading = false;
            console.error('Erreur lors de la création de personnage');
        });
    }
})

export default charactersSlice.reducer