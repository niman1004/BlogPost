import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData: null
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers:{
        login: (state , action)=>{
            state.status = true;
            state.userData = action.payload.userData
        },
        logout: (state)=>{
            state.status = false;
            state.userData= null
        }
    }

})

export const {login , logout}= authSlice.actions
//a module can have only one default export
//default export can be imported with any name
export default authSlice.reducer
