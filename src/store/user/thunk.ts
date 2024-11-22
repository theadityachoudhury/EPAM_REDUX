import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../helpers/axios";
import { loginSuccessAction, logoutAction } from "./actions";

export const fetchUser = createAsyncThunk<any,string>(
    "user/fetchUser",
    async (token: string, { dispatch }) => {
        try {
            const response = await instance.get("/users/me", {
                headers: {
                    Authorization: token,
                },
            });
            console.log(response.data);
            dispatch(loginSuccessAction({
                ...response.data.result,
                token,
            })); // Dispatch side effect
        } catch (error) {
            console.log(error);
            dispatch(logoutAction()); // Dispatch side effect
            // throw error; // Rethrow or reject to handle errors correctly
        }
    }
);


export const logoutUser = createAsyncThunk<any, void>("user/logoutUser", async (_, { dispatch }) => { 
    try {
        const _ = await instance.delete("/logout");
    } catch (error) {
        console.log(error);        
    } finally {
        dispatch(logoutAction()); // Dispatch side effect
    }
}); // Dispatch side effect
