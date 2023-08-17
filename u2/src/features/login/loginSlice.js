// import {createSlice} from "@reduxjs/toolkit";
// import * as authenticationActions from "../../actions/AuthenticationActions"
// const initialState = {
//     user: null,
//     loginPending: false,
//     showLoginDialog: false,
//     error: null,
//     accessToken:null
// }
//
// export const loginSlice = createSlice({
//     name: "login",
//     initialState,
//     reducers: {
//         // showLoginDialog:(state) => {
//         //     state.showLoginDialog = true
//         //     console.log("showig")
//         // },
//         // hideLoginDialog:(state) => {
//         //     state.showLoginDialog = false
//         //     console.log("hiding")
//         //
//         // }
//         // login: (state,action) => {
//         //     state.user = action.payload
//         // },
//         // logout: (state )=>{
//         //     state.user = null
//         // }
//         rootReducer: (state = initialState, action) => {
//             console.log("in reducer")
//             switch (action.type) {
//                 case (authenticationActions.AUTHENTICATION_SUCCESS):{
//                     return{
//                         ...state,
//                         showLoginDialog: false,
//                         loginPending:false,
//                         user:action.payload.user,
//                         accessToken: action.payload.accessToken
//                     }
//                 }
//                 case (authenticationActions.AUTHENTICATION_PENDING):{
//                     return{
//                         ...state,
//                         showLoginDialog: false,
//                         loginPending:true,
//
//                         user:action.payload.user,
//                         accessToken: action.payload.accessToken
//                     }
//                 }
//                 case (authenticationActions.AUTHENTICATION_ERROR):{
//                     return{
//                         ...state,
//                        error: "Authentication Failed",
//                         pending:false
//                     }
//                 }
//             }
//         }
//     }
// })
//
// export const {rootReducer} = loginSlice.actions;
// export default loginSlice.reducer
// export const selectUser = (state) => state.login.user
// export const selectError = (state) => state.login.error
// export const selectAccesToken = (state) => state.login.accessToken
//
