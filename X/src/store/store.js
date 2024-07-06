import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import serviceSlice from "./serviceSlice"

const store = configureStore({
    reducer:{
        auth:authSlice,
        service:serviceSlice,
    }
})

export default store