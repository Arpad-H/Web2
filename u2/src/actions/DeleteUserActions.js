import {getUsers} from "./UserManagementActions";


export const SHOW_CONFIRM_DELETE = "SHOW_CONFIRM_DELETE"
export const HIDE_CONFIRM_DELETE = "HIDE_CONFIRM_DELETE"
export const ERROR_DELETE_USER = "ERROR_DELETE_USER"
export const SUCCESS_DELETE_USER = "SUCCESS_DELETE_USER"
export const PENDING_DELETE_USER = "PENDING_DELETE_USER"


export function getShowConfirmDeleteAction(user) {
    return {
        type: SHOW_CONFIRM_DELETE,
        userToBeDeleted: user
    }
}

export function getHideConfirmDeleteAction() {
    return {
        type: HIDE_CONFIRM_DELETE
    }
}

export function getDeleteUserPendingAction() {
    return {
        type: ERROR_DELETE_USER
    }
}

export function getDeleteUserSuccessAction() {
    return {
        type: SUCCESS_DELETE_USER,
    }
}

export function getDeleteUserErrorAction(error) {
    return {
        type: PENDING_DELETE_USER,
        error: error
    }
}

export function deleteUser(token, userID) {
    console.log("deleting user")
    // console.log(token + " "+ userID)
    return dispatch => {
        // console.log("here")

        dispatch(getDeleteUserPendingAction());
        // console.log("here")
        requestDeleteUser(token, userID)
            .then(
                () => {
                    // console.log(userSession)
                    const action = getDeleteUserSuccessAction()
                    dispatch(getUsers(token))
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getDeleteUserErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getDeleteUserErrorAction(error))
            })
    }
}

function requestDeleteUser(token, userID) {
    console.log(" request deleting Users")
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + token
        },
        // body: JSON.stringify({userID, password})
    }
    // console.log("here")
    return fetch("https://localhost/users/" + userID, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    console.log("handling response")
    // console.log(response)
    // const authorizationHeader = response.headers.get("Authorization")
    // console.log(authorizationHeader)
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        // let token
        // if (authorizationHeader) {
        //     token = authorizationHeader.split(" ")[1]
        //     // console.log(token)
        // }
        if (!response.ok) {
            // if (response.status === 401) logoutUser()
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        } else {
            console.log(data)
            // let userList = {
            //     users: data,
            // }
            // console.log(userSession)
            // return userList
            return
        }
    })
}