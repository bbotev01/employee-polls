export const RECEIVE_USERS = "RECEIVE_USERS";
export const USER_VOTE = "USER_VOTE";

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