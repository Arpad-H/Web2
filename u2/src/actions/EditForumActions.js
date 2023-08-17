import {getUsers} from "./UserManagementActions";
import {getForums} from "./ForumOverviewActions";

export const SHOW_EDIT_FORUM_DIALOG = "SHOW_EDIT_FORUM_DIALOG"
export const HIDE_EDIT_FORUM_DIALOG = "HIDE_EDIT_FORUM_DIALOG"
export const EDITING_FORUM_PENDING = "EDITING_FORUM_PENDING"
export const EDITING_FORUM_SUCCESS = "EDITING_FORUM_SUCCESS"
export const EDITING_FORUM_ERROR = "EDITING_FORUM_ERROR"

export function getShowEditForumDialogAction(forum) {
    return {
        type: SHOW_EDIT_FORUM_DIALOG,
        forumToBeEdited: forum
    }
}

export function getHideEditForumDialogAction() {
    return {
        type: HIDE_EDIT_FORUM_DIALOG
    }
}
export function getEditForumPendingAction() {
    return {
        type: EDITING_FORUM_PENDING
    }
}

export function getEditForumSuccessAction() {
    return {
        type: EDITING_FORUM_SUCCESS,
    }
}

export function getEditForumErrorAction(error) {
    return {
        type: EDITING_FORUM_ERROR,
        error: error
    }
}
export function editForum(token,forumID,name,description) {
    console.log("editing user")

    return dispatch => {
        // console.log("here")

        dispatch(getEditForumPendingAction());
        // console.log("here")
        requestEditForum(token,forumID,name,description)
            .then(
                () => {
                    // console.log(userSession)
                    const action = getEditForumSuccessAction()
                    dispatch(getForums())
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getEditForumErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getEditForumErrorAction(error))
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
function requestEditForum(token,forumID,name,description) {
    console.log("editing forum")
    console.log(arguments)
    const data = {}
    if (name){
        data.name = name
    }if (description){
        data.description = description
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
    return fetch("https://localhost/forumThreads/"+forumID, requestOptions)
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