import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { userVote } from "./users";


export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const VOTE_QUESTION = "VOTE_QUESTION";

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

export function handleAddQuestion(firstOption, secondOption) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion({
            optionOneText: firstOption,
            optionTwoText: secondOption,
            author: authedUser
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()));
    };
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}


function voteQuestion(id, answer, authedUser) {
    return {
        type: VOTE_QUESTION,
        qid: id,
        answer,
        authedUser
    };
}

export function handleVoteQuestion(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestionAnswer(
            authedUser,
            qid,
            answer
        )
            .then(() => {
                dispatch(voteQuestion(qid, answer, authedUser))
                dispatch(userVote(qid, answer, authedUser))
            })
            .then(() => dispatch(hideLoading()));
    };
}