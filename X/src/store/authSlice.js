import {createSlice} from "@reduxjs/toolkit"
import randomId from "../hooks/randomId.js"

const initialState = {
    loginStatus: false,
    userData: null,
    id:randomId(),
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login: (state,action)=>{
        state.loginStatus = true
        state.userData = action.payload.userData
        },
        logout:(state)=>{
            state.loginStatus = false
            state.userData = null
        },
        regenerateId:(state)=>{
            state.id = randomId()
        }
    }
})

export const {login, logout, regenerateId} = authSlice.actions

export default authSlice.reducer