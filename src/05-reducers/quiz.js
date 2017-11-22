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
                        fails: action.quizzes[quizId].fails,
                        success: action.quizzes[quizId].success,
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
            deckId = action.deckId
            quizId = action.quizId
            return {
                ...state,
                [quizId]: {
                    deckId,
                    answers: [],
                    fails: 0,
                    success: 0,
                    date: action.date,
                    annotation: '',
                    isCancelled: false,
                    isFinished: false,
                    isContinued: null
                }
            }
        case types.ADD_ANSWER_QUIZ:
            quizId = action.quizId
            const answer = action.answer
            const isCorrect = action.isCorrect
            return {
                ...state,
                [quizId]: {
                    ...state[quizId],
                    answers: [].concat(state[quizId].answers, answer),
                    fails: !isCorrect ? state[quizId].fails + 1 : state[quizId].fails,
                    success: isCorrect ? state[quizId].success + 1 : state[quizId].success
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