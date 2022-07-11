import { RECEIVE_QUESTIONS, ADD_QUESTION, VOTE_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            };
        case ADD_QUESTION:
            const { question } = action;
            return {
                ...state,
                [action.question.id]: question
            };

        case VOTE_QUESTION:
            const { qid, answer, authedUser } = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            };
        default:
            return state;
    }
}