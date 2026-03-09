import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser:null,
    error:null,
    loading:null,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        singInStart:(state)=>{
            state.loading = true
            state.error = false
        },
         signInSuccess:(state,action)=>{
           state.currentUser = action.payload
           state.loading = false
           state.error = false
        },
         signInFailure:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        signOutSuccess:(state)=>{
            state.currentUser = null
            state.error = null
            state.loading = false
        }
    },
})

export const {singInStart,signInFailure,signInSuccess,signOutSuccess} = userSlice.actions

export default userSlice.reducer