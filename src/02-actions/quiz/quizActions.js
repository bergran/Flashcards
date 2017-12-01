import * as types from '../../../constants/quiz/constants'
import * as persist from '../../03-services/asyncStorage/quiz'
// Actions

export const addQuizzesAction = quizzes => ({
    type: types.ADD_QUIZZES_LIST,
    quizzes
})

export const createQuizAction = quiz => ({
    type: types.CREATE_QUIZ,
    quiz
})

export const addAnswerQuizAction = (quizId, answer) => ({
    type: types.ADD_ANSWER_QUIZ,
    quizId,
    answer
})

export const addAnnotationQuizAction = (quizId, annotation) => ({
    type: types.ADD_ANNOTATION_QUIZ,
    quizId,
    annotation
})

export const cancelQuizAction = quizId => ({
    type: types.CANCEL_QUIZ,
    quizId
})

export const finishQuizAction = quizId => ({
    type: types.FINISH_QUIZ,
    quizId
})

export const continueQuizAction = quizId => ({
    type: types.CONTINUE_QUIZ,
    quizId
})

// Async Actions

export const createQuiz = (quizId, deckId) => dispatch => {
    const quiz = {
        [quizId]: {
            deckId,
            answers: [],
            date: Date.now(),
            annotation: '',
            isCancelled: false,
            isFinished: false,
            isContinued: null
        }}
    return persist.createQuiz(quiz)
        .then(data => dispatch(createQuizAction(quiz)))
}

export const finishQuiz = quiz => dispatch => {
    persist.mergeQuiz(quiz)
        .then(data => dispatch(finishQuizAction(Object.keys(quiz)[0])))
}

export const cancelQuiz = quiz => dispatch => {
    persist.mergeQuiz(quiz)
        .then(data => dispatch(cancelQuizAction(Object.keys(quiz)[0])))
}

export const continueQuiz = quiz => dispatch => {
    persist.mergeQuiz(quiz)
        .then(data => dispatch(continueQuizAction(Object.keys(quiz)[0])))
}