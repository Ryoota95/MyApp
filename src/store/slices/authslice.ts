import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface user {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: user | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string; user: user }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;