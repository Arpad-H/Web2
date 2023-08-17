import mainPage from "../components/MainPage";


const authenticationActions = require("../actions/AuthenticationActions");
const navigationActions = require("../actions/NavigationActions")
const userManagementActions = require("../actions/UserManagementActions")
const editUserActions = require("../actions/EditUserActions")
const createUserActions = require("../actions/CreateUserActions")
const createForumActions = require("../actions/CreateForumActions")
const deleteUserActions = require("../actions/DeleteUserActions")
const forumOverviewActions = require("../actions/ForumOverviewActions")
const forumDeleteActions = require("../actions/DeleteForumActions")
const forumEditActions = require("../actions/EditForumActions")
const threadLoadActions = require("../actions/ThreadLoadActions")
const createMessageActions = require("../actions/CreateMessageActions")

const initialState = {

    //session info
    accessToken: null,
    workspace: "mainPage",
    isAdministrator: false,
    userID: "",
    threadToBeViewed: null,
    forumToBeDeleted: null,
    forumToBeEdited: null,
    userToBeEdited: null,
    userToBeDeleted: null,
    //data
    userList: [],
    forumList: [],
    messagesList: [],

    //showDialogs
    showLoginDialog: false,
    showCreateUserDialog: false,
    showEditUserDialog: false,
    showDeleteUserConfirmation: false,
    showDeleteForumConfirmation: false,
    showCreateForumDialog: false,
    showEditForumDialog: false,
    showCreateMessageDialog: false,

    //pending
    loadingUsers: false,
    creatingUser: false,
    editingUser: false,
    loginPending: false,
    deletePending: false,
    deleteForumPending: false,
    loadingForums: false,
    creatingForum: false,
    editingForum: false,
    loadingMessages: false,
    creatingMessage: false,

    //errors
    error: null,
}

function rootReducer(state = initialState, action) {
    console.log("im reducer " + action.type)
    // console.log(action.payload)
    // eslint-disable-next-line default-case
    switch (action.type) {

        case (authenticationActions.SHOW_LOGINDIALOG): {
            return {
                ...state,
                showLoginDialog: true
            }
        }
        case (authenticationActions.HIDE_LOGINDIALOG): {
            return {
                ...state,
                showLoginDialog: false
            }
        }
        case (authenticationActions.AUTHENTICATION_SUCCESS): {
            return {
                ...state,
                showLoginDialog: false,
                loginPending: false,
                accessToken: action.accessToken,
                isAdministrator: action.isAdministrator,
                userID: action.userID
            }
        }
        case (authenticationActions.AUTHENTICATION_PENDING): {
            return {
                ...state,
                showLoginDialog: false,
                loginPending: true,
                // user: action.user,
                // accessToken: action.accessToken
            }
        }
        case (authenticationActions.AUTHENTICATION_ERROR): {
            console.log(action.error)
            return {
                ...state,
                error: "Authentication Failed",
                pending: false
            }
        }
        case (authenticationActions.LOGOUT): {
            // console.log(action.error)
            return {
                ...state,
                accessToken: null,
                workspace: "mainPage",
                isAdministrator: false,
                userID: "",
                //data
                userList: [],
                userToBeEdited: null,
                userToBeDeleted: null,

                //showDialogs
                showLoginDialog: false,
                showCreateUserDialog: false,
                showEditUserDialog: false,
                showDeleteUserConfirmation: false,

                //pending
                loadingUsers: false,
                creatingUser: false,
                editingUser: false,
                loginPending: false,
                deletePending: false,

                //errors
                error: null,
            }
        }

        case (navigationActions.GO_TO_PERSONAL_PAGE): {
            return {
                ...state,
                workspace: "personalPage",
                userList: []
            }
        }
        case (navigationActions.GO_TO_USER_MANAGEMENT_PAGE): {
            return {
                ...state,
                workspace: "userManagementPage"
            }
        }
        case (navigationActions.GO_TO_FORUM_OVERVIEW_PAGE): {
            return {
                ...state,
                workspace: "forumThreadOverviewPage"
            }
        }
        case (navigationActions.GO_TO_THREAD_PAGE): {
            return {
                ...state,
                workspace: "threadPage",
                threadToBeViewed: action.threadToBeViewed
            }
        }

        case (userManagementActions.LOADING_USERS_PENDING): {
            return {
                ...state,
                loadingUsers: true
            }
        }
        case (userManagementActions.LOADING_USERS_ERROR): {
            return {
                ...state,
                error: action.error
            }
        }
        case (userManagementActions.LOADING_USERS_SUCCESS): {
            return {
                ...state,
                userList: action.userList,
                loadingUsers: false
            }
        }
        case (userManagementActions.HIDE_CREATE_USER_DIALOG): {
            return {
                ...state,
                showCreateUserDialog: false
            }
        }
        case (userManagementActions.SHOW_CREATE_USER_DIALOG): {
            return {
                ...state,
                showCreateUserDialog: true
            }
        }

        case (createUserActions.CREATING_USER_PENDING): {
            return {
                ...state,
                creatingUser: true
            }
        }
        case (createUserActions.CREATING_USER_ERROR): {
            return {
                ...state,
                error: action.error
            }
        }
        case (createUserActions.CREATING_USER_SUCCESS): {
            return {
                ...state,
                showCreateUserDialog: false,
                creatingUser: false
            }
        }

        case (editUserActions.EDITING_USER_PENDING): {
            return {
                ...state,
                editingUser: true
            }
        }
        case (editUserActions.EDITING_USER_ERROR): {
            return {
                ...state,
                error: action.error
            }
        }
        case (editUserActions.EDITING_USER_SUCCESS): {
            return {
                ...state,
                showEditUserDialog: false,
                editingUser: false
            }
        }
        case (editUserActions.HIDE_EDIT_USER_DIALOG): {
            return {
                ...state,
                showEditUserDialog: false,
                userToBeEdited: null
            }
        }
        case (editUserActions.SHOW_EDIT_USER_DIALOG): {
            return {
                ...state,
                showEditUserDialog: true,
                userToBeEdited: action.userToBeEdited
            }
        }

        case (deleteUserActions.SHOW_CONFIRM_DELETE): {
            return {
                ...state,
                showDeleteUserConfirmation: true,
                userToBeDeleted: action.userToBeDeleted
            }
        }
        case (deleteUserActions.ERROR_DELETE_USER): {
            return {
                ...state,
                error: action.error,
                deletePending: false
            }
        }
        case (deleteUserActions.PENDING_DELETE_USER): {
            return {
                ...state,
                deletePending: true
            }
        }
        case (deleteUserActions.SUCCESS_DELETE_USER): {
            return {
                ...state,
                deletePending: false,
                showDeleteUserConfirmation: false
            }
        }
        case (deleteUserActions.HIDE_CONFIRM_DELETE): {
            return {
                ...state,
                showDeleteUserConfirmation: false,
                userToBeDeleted: null
            }
        }

        case (forumOverviewActions.LOADING_FORUMS_PENDING): {
            return {
                ...state,
                loadingForums: true
            }
        }
        case (forumOverviewActions.LOADING_FORUMS_ERROR): {
            return {
                ...state,
                loadingForums: false,
                error: action.error
            }
        }
        case (forumOverviewActions.LOADING_FORUMS_SUCCESS): {
            return {
                ...state,
                loadingForums: false,
                forumList: action.forumList
            }
        }
        case (forumOverviewActions.SHOW_CREATE_FORUM_DIALOG): {
            return {
                ...state,
                showCreateForumDialog: true,

            }
        }
        case (forumOverviewActions.HIDE_CREATE_FORUM_DIALOG): {
            return {
                ...state,
                showCreateForumDialog: false,

            }
        }

        case (createForumActions.CREATING_FORUM_PENDING): {
            return {
                ...state,
                creatingForum: true
            }
        }
        case (createForumActions.CREATING_FORUM_ERROR): {
            return {
                ...state,
                error: action.error
            }
        }
        case (createForumActions.CREATING_FORUM_SUCCESS): {
            return {
                ...state,
                showCreateForumDialog: false,
                creatingForum: false
            }
        }

        case (forumDeleteActions.SUCCESS_DELETE_FORUM): {
            return {
                ...state,
                showDeleteForumConfirmation: false,
                deleteForumPending: false
            }
        }
        case (forumDeleteActions.ERROR_DELETE_FORUM): {
            return {
                ...state,
                error: action.error,
                deleteForumPending: false
            }
        }
        case (forumDeleteActions.PENDING_DELETE_FORUM): {
            return {
                ...state,
                deleteForumPending: true
            }
        }
        case (forumDeleteActions.SHOW_CONFIRM_DELETE_FORUM): {
            return {
                ...state,
                showDeleteForumConfirmation: true,
                forumToBeDeleted: action.forumToBeDeleted
            }
        }
        case (forumDeleteActions.HIDE_CONFIRM_DELETE_FORUM): {
            return {
                ...state,
                forumToBeDeleted: null,
                showDeleteForumConfirmation: false
            }
        }

        case (forumEditActions.EDITING_FORUM_PENDING): {
            return {
                ...state,
                editingForum: true
            }
        }
        case (forumEditActions.EDITING_FORUM_ERROR): {
            return {
                ...state,
                error: action.error,
                editingForum: false
            }
        }
        case (forumEditActions.EDITING_FORUM_SUCCESS): {
            return {
                ...state,
                showEditForumDialog: false,
                editingForum: false
            }
        }
        case (forumEditActions.HIDE_EDIT_FORUM_DIALOG): {
            return {
                ...state,
                showEditForumDialog: false,
                forumToBeEdited: null
            }
        }
        case (forumEditActions.SHOW_EDIT_FORUM_DIALOG): {
            return {
                ...state,
                showEditForumDialog: true,
                forumToBeEdited: action.forumToBeEdited
            }
        }

        case (threadLoadActions.LOADING_MESSAGES_PENDING): {
            return {
                ...state,
                loadingMessages: true,
            }
        }
        case (threadLoadActions.LOADING_MESSAGES_SUCCESS): {
            return {
                ...state,
                loadingMessages: false,
                messagesList: action.messagesList
            }
        }
        case (threadLoadActions.LOADING_MESSAGES_ERROR): {
            return {
                ...state,
                loadingMessages: false,
                error: action.error
            }
        }

        case (createMessageActions.CREATING_MESSAGE_PENDING): {
            return {
                ...state,
                creatingMessage: true
            }
        }
        case (createMessageActions.CREATING_MESSAGE_ERROR): {
            return {
                ...state,
                creatingMessage: false,
                error: action.error
            }
        }
        case (createMessageActions.CREATING_MESSAGE_SUCCESS): {
            return {
                ...state,
                showCreateMessageDialog: false,
                creatingMessage: false
            }
        }
        case (createMessageActions.SHOW_CREATE_MESSAGE_DIALOG): {
            return {
                ...state,
                showCreateMessageDialog: true,

            }
        }
        case (createMessageActions.HIDE_CREATE_MESSAGE_DIALOG): {
            return {
                ...state,
                showCreateMessageDialog: false,

            }
        }

    }
}

export default rootReducer

