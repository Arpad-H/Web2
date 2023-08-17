import {getUsers} from "./UserManagementActions";


export const CREATING_USER_PENDING = "CREATING_USER_PENDING"
export const CREATING_USER_SUCCESS = "CREATING_USER_SUCCESS"
export const CREATING_USER_ERROR = "CREATING_USER_ERROR"

export function getCreateUserPendingAction() {
    return {
        type: CREATING_USER_PENDING
    }
}

export function getCreateUserSuccessAction(user) {
    return {
        type: CREATING_USER_SUCCESS,
        newUser: user
    }
}

export function getCreateUserErrorAction(error) {
    return {
        type: CREATING_USER_ERROR,
        error: error
    }
}
export function createUser(token,userID,userName,password,isAdministrator) {
    console.log("Creating user")

    return dispatch => {
        // console.log("here")

        dispatch(getCreateUserPendingAction());
        // console.log("here")
        requestCreateUser(token,userID,userName,password,isAdministrator)
            .then(
                newUser => {
                    // console.log(userSession)
                    const action = getCreateUserSuccessAction(newUser)
                    dispatch(getUsers(token))
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getCreateUserErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getCreateUserErrorAction(error))
            })
    }
}
function requestCreateUser(token,userID,userName,password,isAdministrator) {
    console.log("creating user")
    // console.log(arguments)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + token
        },
        body: JSON.stringify({userID,userName, password,isAdministrator})
    }
    // console.log("here")
    return fetch("https://localhost/users", requestOptions)
        .then(handleResponse)
        .then(newUser => {
            return newUser
        })
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
            let newUser = {
                newUser: data,
            }
            // console.log(userSession)
            return newUser
        }
    })
}