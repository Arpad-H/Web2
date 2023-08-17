

export const SHOW_CREATE_FORUM_DIALOG = "SHOW_CREATE_FORUM_DIALOG"
export const HIDE_CREATE_FORUM_DIALOG = "HIDE_CREATE_FORUM_DIALOG"
export const LOADING_FORUMS_PENDING = "LOADING_FORUMS_PENDING"
export const LOADING_FORUMS_SUCCESS = "LOADING_FORUMS_SUCCESS"
export const LOADING_FORUMS_ERROR = "LOADING_FORUMS_ERROR"

export function getShowCreateForumDialogAction() {
    return {
        type: SHOW_CREATE_FORUM_DIALOG
    }
}

export function getHideCreateForumDialogAction() {
    return {
        type: HIDE_CREATE_FORUM_DIALOG
    }
}
export function getLoadingForumsPendingAction() {
    return {
        type: LOADING_FORUMS_PENDING
    }
}

export function getLoadingForumsSuccessAction(forums) {
    return {
        type: LOADING_FORUMS_SUCCESS,
        forumList: forums
    }
}

export function getLoadingForumsErrorAction(error) {
    return {
        type: LOADING_FORUMS_ERROR,
        error: error
    }
}
export function getForums() {
    console.log("loading forums")
    return dispatch => {
        // console.log("here")

        dispatch(getLoadingForumsPendingAction());
        // console.log("here")
        requestGetForums()
            .then(
                forums => {
                    // console.log(userSession)
                    const action = getLoadingForumsSuccessAction(forums)
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getLoadingForumsErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getLoadingForumsErrorAction(error))
            })
    }
}

function requestGetForums() {
    console.log("getting Forums")
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({userID, password})
    }
    // console.log("here")
    return fetch("https://localhost/forumThreads", requestOptions)
        .then(handleResponse)
        .then(forums => {
            return forums
        })
}
function handleResponse(response) {
    console.log("handling response")

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
            let forumList = {
                forums: data,
            }
            // console.log(userSession)
            return forumList
        }
    })
}