

export const SHOW_CREATE_USER_DIALOG = "SHOW_CREATE_USER_DIALOG"
export const HIDE_CREATE_USER_DIALOG = "HIDE_CREATE_USER_DIALOG"
export const LOADING_USERS_PENDING = "LOADING_USERS_PENDING"
export const LOADING_USERS_SUCCESS = "LOADING_USERS_SUCCESS"
export const LOADING_USERS_ERROR = "LOADING_USERS_ERROR"

export function getShowCreateUserDialogAction() {
    return {
        type: SHOW_CREATE_USER_DIALOG
    }
}

export function getHideCreateUserDialogAction() {
    return {
        type: HIDE_CREATE_USER_DIALOG
    }
}
export function getLoadingUsersPendingAction() {
    return {
        type: LOADING_USERS_PENDING
    }
}

export function getLoadingUsersSuccessAction(users) {
    return {
        type: LOADING_USERS_SUCCESS,
      userList: users
    }
}

export function getLoadingUsersErrorAction(error) {
    return {
        type: LOADING_USERS_ERROR,
        error: error
    }
}
export function getUsers(token) {
    console.log("loading user")
    return dispatch => {
        // console.log("here")

        dispatch(getLoadingUsersPendingAction());
        // console.log("here")
        requestGetUsers(token)
            .then(
                userList => {
                    // console.log(userSession)
                    const action = getLoadingUsersSuccessAction(userList)
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getLoadingUsersErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getLoadingUsersErrorAction(error))
            })
    }
}

function requestGetUsers(token) {
    console.log("gettingUsers")
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + token
        },
        // body: JSON.stringify({userID, password})
    }
    // console.log("here")
    return fetch("https://localhost/users", requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession
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
            // console.log(data)
            let userList = {
                users: data,
            }
            // console.log(userSession)
            return userList
        }
    })
}