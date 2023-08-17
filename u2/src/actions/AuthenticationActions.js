import {getGoToPersonalPageAction} from "./NavigationActions";
import jwtDecode from "jwt-decode";


export const SHOW_LOGINDIALOG = "SHOW_LOGINDIALOG"
export const HIDE_LOGINDIALOG = "HIDE_LOGINDIALOG"
export const LOGOUT = "LOGOUT"


export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING"
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS"
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGINDIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGINDIALOG
    }
}

export function getLogoutAction() {
    return {
        type: LOGOUT
    }
}

export function getAuthenticationUserPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationUserSuccessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        accessToken: userSession.accessToken,
        userID: userSession.userID,
        isAdministrator: userSession.isAdministrator
    }
}

export function getAuthenticationUserErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function authenticateUser(userID, password) {
    console.log("authenticating user")
    return dispatch => {
        // console.log("here")

        dispatch(getAuthenticationUserPendingAction());
        // console.log("here")
        loginUser(userID, password)
            .then(
                userSession => {
                    // console.log(userSession)
                    const action = getAuthenticationUserSuccessAction(userSession)
                    dispatch(getGoToPersonalPageAction())
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getAuthenticationUserErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getAuthenticationUserErrorAction(error))
            })
    }
}

function loginUser(userID, password) {
    console.log("logging in")
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(userID + ":" + password)
        },
        // body: JSON.stringify({userID, password})
    }
    // console.log("here")
    return fetch("https://localhost/authenticate", requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession
        })
}

function handleResponse(response) {
    console.log("handling response")
    // console.log(response)
    const authorizationHeader = response.headers.get("Authorization")
    // console.log(authorizationHeader)
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        let token
        if (authorizationHeader) {
            token = authorizationHeader.split(" ")[1]
            // console.log(token)
        }
        if (!response.ok) {
            if (response.status === 401) logoutUser()
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        } else {
            let decoded = jwtDecode(token)
            let userSession = {
                userID: decoded.userID,
                isAdministrator : decoded.isAdministrator,
                accessToken: token
            }
            // console.log(userSession)
            return userSession
        }
    })
}

function logoutUser() {
    console.log("logout user")
}