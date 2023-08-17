import {getUsers} from "./UserManagementActions";

export const SHOW_EDIT_USER_DIALOG = "SHOW_EDIT_USER_DIALOG"
export const HIDE_EDIT_USER_DIALOG = "HIDE_EDIT_USER_DIALOG"
export const EDITING_USER_PENDING = "EDITING_USER_PENDING"
export const EDITING_USER_SUCCESS = "EDITING_USER_SUCCESS"
export const EDITING_USER_ERROR = "EDITING_USER_ERROR"

export function getShowEditUserDialogAction(user) {
    return {
        type: SHOW_EDIT_USER_DIALOG,
        userToBeEdited: user
    }
}

export function getHideEditUserDialogAction() {
    return {
        type: HIDE_EDIT_USER_DIALOG
    }
}
export function getEditUserPendingAction() {
    return {
        type: EDITING_USER_PENDING
    }
}

export function getEditUserSuccessAction(user) {
    return {
        type: EDITING_USER_SUCCESS,
    }
}

export function getEditUserErrorAction(error) {
    return {
        type: EDITING_USER_ERROR,
        error: error
    }
}
export function editUser(token,userID,username,password,isAdministrator) {
    console.log("editing user")

    return dispatch => {
        // console.log("here")

        dispatch(getEditUserPendingAction());
        // console.log("here")
        requestEditUser(token,userID,username,password,isAdministrator)
            .then(
                () => {
                    // console.log(userSession)
                    const action = getEditUserSuccessAction()
                    dispatch(getUsers(token))
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getEditUserErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getEditUserErrorAction(error))
            })
    }
}
// function replacer(key, value) {
//     // Filtering out properties
//     if (value === null) {
//         return undefined;
//     }
//     return value;
// }
function requestEditUser(token,userID,username,password,isAdministrator) {
    console.log("editing user")
    console.log(arguments)
    const data = {}
    if (username){
        data.userName = username
    }if (password){
        data.password = password
    }if (isAdministrator){
        data.isAdministrator = isAdministrator
    }
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + token
        },
        body: JSON.stringify(data)
    }
    console.log(requestOptions)
    return fetch("https://localhost/users/"+userID, requestOptions)
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

            return
        }
    })
}