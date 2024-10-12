import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    HttpPostRequest,
    HttpDeleteRequest
} from "../../HttpRequests";

const initialState = {
  isLoading: false,
  lastImage: null,
}

export const uploadImage = createAsyncThunk('uploadImage', async (formData) => {
    const response = await HttpPostRequest('/images/upload', formData, true);
    return response.json();
});

export const deleteImage = createAsyncThunk('deleteImage', async (action) => {
    const response = await HttpDeleteRequest(`/images/${action.id}`);

    return response.json();
});

export const imagesSlice = createSlice({
    name: 'Images',
    initialState,
    reducers: {
        deleteImage: (state, action) => {
        },
        uploadImage: (state) => {
            state.selectedCard = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(uploadImage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(uploadImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.lastImage = action.payload;
        });
        builder.addCase(uploadImage.rejected, (state) => {
            state.isLoading = false;
            state.lastImage = null;
            console.error(`Erreur lors de l'upload de l'image`);
        });

        builder.addCase(deleteImage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.lastImage = null;
        });
        builder.addCase(deleteImage.rejected, (state) => {
            state.isLoading = false;
            state.lastImage = null;
            console.error(`Erreur lors de la suppression de l'image`);
        });
    }
})

export default imagesSlice.reducer