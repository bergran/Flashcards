import * as types from '../../constants/quiz/constants'

export default function quizReducer (state = {}, action) {
    let deckId, quizId, quiz
    switch (action.type) {
        case types.ADD_QUIZZES_LIST:
            const quizzes = Object.keys(action.quizzes).reduce((prevState, quizId) => {
                return {
                    ...prevState,
                    [quizId]: {
                        deckId: action.quizzes[quizId].deckId,
                        answers: action.quizzes[quizId].answers,
                        date: action.quizzes[quizId].date,
                        isCancelled: action.quizzes[quizId].isCancelled,
                        isFinished: action.quizzes[quizId].isFinished,
                        isContinued: action.quizzes[quizId].isContinued,
                        annotation: action.quizzes[quizId].annotation
                    }
                }
            }, {})
            return {
                ...state,
                ...quizzes
            }
        case types.CREATE_QUIZ:
            quizId = Object.keys(action.quiz)[0]
            deckId = action.quiz[quizId].deckId
            return {
                ...state,
                [quizId]: {
                    deckId,
                    answers: action.quiz[quizId].answers,
                    date: action.quiz[quizId].date,
                    annotation: action.quiz[quizId].annotation,
                    isCancelled: action.quiz[quizId].isCancelled,
                    isFinished: action.quiz[quizId].isFinished,
                    isContinued: action.quiz[quizId].isContinued
                }
            }
        case types.ADD_ANSWER_QUIZ:
            quizId = action.quizId
            const answer = action.answer
            return {
                ...state,
                [quizId]: {
                    ...state[quizId],
                    answers: [].concat(state[quizId].answers, answer)
                }
            }
        case types.ADD_ANNOTATION_QUIZ:
            quizId = action.quizId
            return {
                ...state,
                [quizId]: {
                    ...state[quizId],
                    annotation: action.annotation
                }
            }
        case types.CANCEL_QUIZ:
            debugger
            quizId = action.quizId
            return {
                ...state,
                [quizId]: {
                    ...state[quizId],
                    isCancelled: true,
                    isContinued: false
                }
            }
        case types.FINISH_QUIZ:
            quizId = action.quizId
            return {
                ...state,
                [quizId]: {
                    ...state[quizId],
                    isFinished: true
                }
            }
        case types.CONTINUE_QUIZ:
            quizId = action.quizId
            return {
                ...state,
                [quizId]: {
                    ...state[quizId],
                    isCancelled: false,
                    isContinued: true
                }
            }
        default:
            return state
    }
}