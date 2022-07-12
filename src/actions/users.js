export const RECEIVE_USERS = "RECEIVE_USERS";
export const USER_VOTE = "USER_VOTE";
export const USER_QUESTION_LINK = "USER_QUESTION_LINK";

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    };
}

export function userVote(qid, answer, authedUser) {
    return {
        type: USER_VOTE,
        qid,
        answer,
        authedUser
    };
}

export function userQuestionLink(qid, authedUser) {
    return {
        type: USER_QUESTION_LINK,
        qid,
        authedUser
    };
}