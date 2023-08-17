

// export const SHOW_CREATE_FORUM_DIALOG = "SHOW_CREATE_FORUM_DIALOG"
// export const HIDE_CREATE_FORUM_DIALOG = "HIDE_CREATE_FORUM_DIALOG"
export const LOADING_MESSAGES_PENDING = "LOADING_MESSAGES_PENDING"
export const LOADING_MESSAGES_SUCCESS = "LOADING_MESSAGES_SUCCESS"
export const LOADING_MESSAGES_ERROR = "LOADING_MESSAGES_ERROR"

// export function getShowCreateForumDialogAction() {
//     return {
//         type: SHOW_CREATE_FORUM_DIALOG
//     }
// }
//
// export function getHideCreateForumDialogAction() {
//     return {
//         type: HIDE_CREATE_FORUM_DIALOG
//     }
// }
export function getLoadingMessagesPendingAction() {
    return {
        type: LOADING_MESSAGES_PENDING
    }
}

export function getLoadingMessagesSuccessAction(messages) {
    return {
        type: LOADING_MESSAGES_SUCCESS,
        messagesList: messages
    }
}

export function getLoadingMessagesErrorAction(error) {
    return {
        type: LOADING_MESSAGES_ERROR,
        error: error
    }
}
export function getMessages(threadID) {
    console.log("loading messages")
    return dispatch => {
        // console.log("here")

        dispatch(getLoadingMessagesPendingAction());
        requestGetMessages(threadID)

            .then(
                messages => {
                    // console.log(userSession)
                    const action = getLoadingMessagesSuccessAction(messages)
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getLoadingMessagesErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getLoadingMessagesErrorAction(error))
            })
    }
}

function requestGetMessages(threadID) {
    console.log("getting messages")
    const requestOptions = {
        method: "GET",
        // headers: {
        //     // "Content-Type": "application/json",
        // },
        // body: JSON.stringify({userID, password})
    }
    // console.log("here")
    return fetch("https://localhost/forumThreads/"+threadID+"/forumMessages", requestOptions)
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
            // console.log(data)
            let messagesList = {
                messages: data,
            }
            // console.log(userSession)
            return messagesList
        }
    })
}