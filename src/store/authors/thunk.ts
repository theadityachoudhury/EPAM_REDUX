import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthors } from "../../services";
import { addAuthorAction, setAuthorsAction } from "./actions";
import instance from "../../helpers/axios";

export const fetchAuthors = createAsyncThunk<any, void>("authors/fetchAuthors", async (_, { dispatch }) => {
    const data = await getAuthors();
    dispatch(setAuthorsAction(data));
});

export const addAuthorToServer = createAsyncThunk<any, string>("authors/addAuthor", async (author, { dispatch }) => {
    try {
        const { data } = await instance.post("/authors/add", { name: author });
        dispatch(addAuthorAction(data.result));
    } catch (error) {
        console.log(error);
    }
});