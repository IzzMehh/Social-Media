import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loginStatus: false,
    userData: null,
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
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer