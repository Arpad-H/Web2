import {getForums} from "./ForumOverviewActions";


export const CREATING_FORUM_PENDING = "CREATING_FORUM_PENDING"
export const CREATING_FORUM_SUCCESS = "CREATING_FORUM_SUCCESS"
export const CREATING_FORUM_ERROR = "CREATING_FORUM_ERROR"

export function getCreateForumPendingAction() {
    return {
        type: CREATING_FORUM_PENDING
    }
}

export function getCreateForumSuccessAction(forum) {
    return {
        type: CREATING_FORUM_SUCCESS,
        newForum: forum
    }
}

export function getCreateForumErrorAction(error) {
    return {
        type: CREATING_FORUM_ERROR,
        error: error
    }
}
export function createForum(token ,title, description) {
    console.log("Creating Forum")

    return dispatch => {
        // console.log("here")

        dispatch(getCreateForumPendingAction());
        // console.log("here")
        requestCreateForum(token,title, description)
            .then(
                newForum => {
                    // console.log(userSession)
                    const action = getCreateForumSuccessAction(newForum)
                    dispatch(getForums())
                    dispatch(action)
                },
                error => {
                    console.log(error);
                    dispatch(getCreateForumErrorAction(error))
                })
            .catch(error => {
                console.log(error)
                dispatch(getCreateForumErrorAction(error))
            })
    }
}
function requestCreateForum(token,name, description) {
    console.log("creating forum")
    console.log(arguments)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + token
        },
        body: JSON.stringify({name, description})
    }
    // console.log("here")
    return fetch("https://localhost/forumThreads", requestOptions)
        .then(handleResponse)
        .then(newForum => {
            return newForum
        })
}
function handleResponse(response) {
    console.log("handling response")

    return response.text().then(text => {
        const data = text && JSON.parse(text)

        if (!response.ok) {
            // if (response.status === 401) logoutUser()
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        } else {
            // console.log(data)
            let newForum = {
                newForum: data,
            }
            // console.log(userSession)
            return newForum
        }
    })
}