

export const GO_TO_PERSONAL_PAGE = "GO_TO_PERSONAL_PAGE"
export const GO_TO_USER_MANAGEMENT_PAGE = "GO_TO_USER_MANAGEMENT_PAGE"
export const GO_TO_FORUM_OVERVIEW_PAGE = "GO_TO_FORUM_OVERVIEW_PAGE"
export const GO_TO_THREAD_PAGE = "GO_TO_THREAD_PAGE"

export function getGoToPersonalPageAction() {
    return {
        type: GO_TO_PERSONAL_PAGE
    }
}
export function getGoToThreadPageAction(thread) {
    return {
        type: GO_TO_THREAD_PAGE,
        threadToBeViewed: thread
    }
}
export function getGoToUserManagementPageAction() {
    return {
        type: GO_TO_USER_MANAGEMENT_PAGE
    }
}export function getGoToForumThreadOverviewPageAction() {
    return {
        type: GO_TO_FORUM_OVERVIEW_PAGE
    }
}