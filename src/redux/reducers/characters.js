import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    HttpGetRequest,
    HttpPutRequest,
    HttpPostRequest,
} from "../../HttpRequests";
import { notification } from 'antd';

const initialState = {
    isLoading: false,
    characters: null,
    selectedCharacter: null,
}

export const getCharacterById = createAsyncThunk('getCharacterById', async (action) => {
    const response = await HttpGetRequest(`/characters/${action.id}`)

    return response.json();
})

export const getCharacters = createAsyncThunk('getCharacters', async () => {
    const response = await HttpGetRequest('/characters');

    return response.json();
});

export const createCharacter = createAsyncThunk('createCharacter', async () => {
    const response = await HttpPostRequest('/characters');

    return response.json();
});

export const saveCharacter = createAsyncThunk('saveCharacter', async (action) => {
    const character = action.character;
    let skills = [ ...character.skills ];
    let inventory = [ ...character.inventory ];

    skills = skills.map(skill => {
        if (skill.isNew) {
            return {
                name: skill.name,
                desc: skill.desc,
            }
        }

        return {
            id: skill.id,
            name: skill.name,
            desc: skill.desc,
        }
    })

    inventory = inventory.map(item => {
        if (item.stage === '') item.stage = null;

        if (item.isNew) {
            return {
                name: item.name,
                type: item.type,
                stage: item.stage,
                desc: item.desc,
                carac: item.carac,
                nb: item.nb,
            }
        }

        return {
            id: item.id,
            name: item.name,
            type: item.type,
            stage: item.stage,
            desc: item.desc,
            carac: item.carac,
            nb: item.nb,
        }
    })

    const response = await HttpPutRequest(
        `/characters/${action.id}`,
        {
            ...character,
            skills,
            inventory,
        }
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
            state.characters = [
                ...state.characters,
                action.payload,
            ];
        });
        builder.addCase(createCharacter.rejected, (state) => {
            state.isLoading = false;
            console.error('Erreur lors de la création de personnage');
        });

        builder.addCase(saveCharacter.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(saveCharacter.fulfilled, (state) => {
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

        builder.addCase(getCharacterById.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCharacterById.fulfilled, (state, action) => {
            state.selectedCharacter = action.payload.id;
            state.characters = [
                ...(state.characters || [])
                    .filter((c) => c.id !== action.payload.id),
                action.payload,
            ]
            state.isLoading = false;
        })
        builder.addCase(getCharacterById.rejected, (state, action) => {
            state.isLoading = false;
            console.error(`Erreur lors de la recupération du personnage: ${action.id}`);
        });
    }
})

export default charactersSlice.reducer