// import {getUsers} from "./UserManagementActions";




import {getMessages} from "./ThreadLoadActions";

export const SHOW_CREATE_MESSAGE_DIALOG = "SHOW_CREATE_MESSAGE_DIALOG"
export const HIDE_CREATE_MESSAGE_DIALOG = "HIDE_CREATE_MESSAGE_DIALOG"
export const CREATING_MESSAGE_PENDING = "CREATING_MESSAGE_PENDING"
export const CREATING_MESSAGE_SUCCESS = "CREATING_MESSAGE_SUCCESS"
export const CREATING_MESSAGE_ERROR = "CREATING_MESSAGE_ERROR"

export function getShowCreateMessageDialogAction() {
    return {
        type: SHOW_CREATE_MESSAGE_DIALOG
    }
}

export function getHideCreateMessageDialogAction() {
    return {
        type: HIDE_CREATE_MESSAGE_DIALOG
    }
}
export function getCreateMessagePendingAction() {
    return {
        type: CREATING_MESSAGE_PENDING
    }
}

export function getCreateMessageSuccessAction(message) {
    return {
        type: CREATING_MESSAGE_SUCCESS,
        newMessage: message
    }
}

export function getCreateMessageErrorAction(error) {
    return {
        type: CREATING_MESSAGE_ERROR,
        error: error
    }
}
export function createMessage(threadID,token,title,text,authorID) {
    console.log("Creating message")

    return dispatch => {
        // console.log("here")

        dispatch(getCreateMessagePendingAction());
        // console.log("here")
        requestCreateMessage(threadID,token,title,text,authorID)
            .then(
                newMessage => {
                    // console.log(userSession)
                    const action = getCreateMessageSuccessAction(newMessage)
                    dispatch(getMessages(threadID))
                    dispatch(action)

                },
                error => {
                    console.log(error);
                    dispatch(getCreateMessageErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getCreateMessageErrorAction(error))
            })
    }
}
function requestCreateMessage(forumThreadID,token,title,text,authorID) {
    console.log("creating message")
    console.log(arguments)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + token
        },
        body: JSON.stringify({forumThreadID,title,text})
    }
    // console.log("here")
    return fetch("https://localhost/forumMessages", requestOptions)
        .then(handleResponse)
        .then(newMessage => {
            return newMessage
        })
}
function handleResponse(response) {
    console.log("handling response")
    return response.text().then(text => {
        const data = text && JSON.parse(text)

        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        } else {
            console.log(data)
            let newMessage = {
                newMessage: data,
            }
            return newMessage
        }
    })
}