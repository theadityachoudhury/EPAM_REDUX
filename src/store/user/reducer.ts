import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
    role: string;
}

const initialState: UserState = {
    isAuth: false,
    name: '',
    email: '',
    token: '',
    role: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ name: string; email: string; token: string,role:string }>) => {
            state.isAuth = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.role = action.payload.role;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("name", action.payload.name);
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("role", action.payload.role);
        },
        logout: (state) => {
            state.isAuth = false;
            state.name = '';
            state.email = '';
            state.token = '';
            state.role = '';
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
