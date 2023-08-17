import {getUsers} from "./UserManagementActions";
import {getForums} from "./ForumOverviewActions";


export const SHOW_CONFIRM_DELETE_FORUM = "SHOW_CONFIRM_DELETE_FORUM"
export const HIDE_CONFIRM_DELETE_FORUM = "HIDE_CONFIRM_DELETE_FORUM"
export const ERROR_DELETE_FORUM = "ERROR_DELETE_FORUM"
export const SUCCESS_DELETE_FORUM = "SUCCESS_DELETE_FORUM"
export const PENDING_DELETE_FORUM = "PENDING_DELETE_FORUM"


export function getShowConfirmForumDeleteAction(forum) {
    return {
        type: SHOW_CONFIRM_DELETE_FORUM,
        forumToBeDeleted: forum
    }
}

export function getHideConfirmForumDeleteAction() {
    return {
        type: HIDE_CONFIRM_DELETE_FORUM
    }
}

export function getDeleteForumPendingAction() {
    return {
        type: ERROR_DELETE_FORUM
    }
}

export function getDeleteForumSuccessAction() {
    return {
        type: SUCCESS_DELETE_FORUM,
    }
}

export function getDeleteForumErrorAction(error) {
    return {
        type: PENDING_DELETE_FORUM,
        error: error
    }
}

export function deleteForum(token, forumID) {
    console.log("deleting forum")
    // console.log(token + " "+ userID)
    return dispatch => {
        // console.log("here")

        dispatch(getDeleteForumPendingAction());
        // console.log("here")
        requestDeleteForum(token, forumID)
            .then(
                () => {
                    // console.log(userSession)
                    const action = getDeleteForumSuccessAction()
                    dispatch(getForums())
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getDeleteForumErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getDeleteForumErrorAction(error))
            })
    }
}

function requestDeleteForum(token, forumID) {
    console.log(" request deleting Forum")
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + token
        },
        // body: JSON.stringify({userID, password})
    }
    // console.log("here")
    return fetch("https://localhost/forumThreads/" + forumID, requestOptions)
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

            return
        }
    })
}