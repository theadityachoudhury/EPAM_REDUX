import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Author } from "./types";

interface AuthorsState {
    authors: Author[];
}

const initialState: AuthorsState = {
    authors: [],
};

const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        setAuthors: (state, action: PayloadAction<Author[]>) => {
            state.authors = action.payload;
        },
        addAuthor: (state, action: PayloadAction<Author>) => {
            state.authors.push(action.payload);
        },
    },
});
export const { setAuthors, addAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
