
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const API_URL = process.env.REACT_APP_API_HOST_URL || ""

export type user = {
    id: number,
    token: string,
    username: string,
    photoUrl: string
}

export type error = {
    error: string
}

interface authState {
    user: user | {} | error,
    isFetching: boolean
}

const initialState: authState = {
    user: {},
    isFetching: true
}

export const authLogin = createAsyncThunk<
    user, // return
    { username: string; password: string }, // params
    { rejectValue: error } // reject

>(
    'auth/login',
    async (credentials: { username: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials)
            return response.data

        } catch (err: any) {
            const error: error = err.response.data || { error: "Server error" }
            return rejectWithValue(error)
        }
    }
)

export const authRegister = createAsyncThunk<
    user,
    { username: string, email: string, password: string },
    { rejectValue: error }


>(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/register`, credentials);
            return data
        } catch (err: any) {
            const error: error = err.response.data || { error: "Server error" }
            return rejectWithValue(error)
        }
    }
)


export const tokenLogin = createAsyncThunk<user, void, { rejectValue: error }>(
    'auth/user',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/auth/user`);
            return data
        } catch (err: any) {
            const error: error = err.response.data || { error: "Server error" }
            return rejectWithValue(error)
        }
    }
)

export const authLogout = createAsyncThunk<number, number, { rejectValue: error }>(
    'auth/logout',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/auth/logout`);
            return id

        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // LOGIN
        builder.addCase(authLogin.fulfilled, (state: authState, action: PayloadAction<user>) => {
            const { id, token, username, photoUrl } = action.payload
            localStorage.setItem("messenger-token", token)
            state.user = {
                id: id,
                token: token,
                username: username,
                photoUrl: photoUrl
            }

        })
        builder.addCase(authLogin.rejected, (state: authState, action) => {
            state.user = action.payload!
        })

        //REGISTER
        builder.addCase(authRegister.fulfilled, (state: authState, action: PayloadAction<user>) => {
            const { id, token } = action.payload
            localStorage.setItem("messenger-token", token)
            state.user = {
                id: id,
                token: token
            }
        })
        builder.addCase(authRegister.rejected, (state: authState, action) => {
            state.user = action.payload!
        })

        //Token
        builder.addCase(tokenLogin.pending, (state) => {
            state.isFetching = true
        })
        builder.addCase(tokenLogin.fulfilled, (state, action) => {
            const { id, token, username, photoUrl } = action.payload
            state.user = {
                id: id,
                token: token,
                username: username,
                photoUrl: photoUrl
            }
            state.isFetching = false
        })
        builder.addCase(tokenLogin.rejected, (state, action) => {
            console.log(action.payload)
            state.isFetching = false
        })

        //LOGOUT
        builder.addCase(authLogout.fulfilled, (state, action) => {
            state.user = {}
            localStorage.removeItem("messenger-token");
        })

        builder.addCase(authLogout.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const getUserWithId = (userId: number) => async (): Promise<user | undefined> => {
    try {
        const response = await axios.get(`${API_URL}/api/users/id/${userId}`)
        const data: user = response.data
        return data

    } catch (err) {
        console.log(err)
        return

    }
}

export default authSlice.reducer