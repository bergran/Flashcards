import * as types from '../../../constants/quiz/constants'
import * as persist from '../../03-services/asyncStorage/quiz'
// Actions

export const addQuizzesAction = quizzes => ({
    type: types.ADD_QUIZZES_LIST,
    quizzes
})

export const createQuizAction = (quizId, deckId, date) => ({
    type: types.CREATE_QUIZ,
    quizId,
    deckId,
    date
})

export const addAnswerQuizAction = (quizId, answer, isCorrect) => ({
    type: types.ADD_ANSWER_QUIZ,
    quizId,
    answer,
    isCorrect
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
        quizId,
        deckId,
        date: Date.now()
    }
    persist.createQuiz(quiz)
        .then(data => dispatch(createQuizAction(quiz)))
}

export const finishQuiz = quiz => dispatch => {
    persist.mergeQuiz(quiz)
        .then(data => dispatch(finishQuizAction(quiz)))
}

export const cancelQuiz = quiz => dispatch => {
    persist.mergeQuiz(quiz)
        .then(data => dispatch(cancelQuizAction(quiz)))
}

export const continueQuiz = quiz => dispatch => {
    persist.mergeQuiz(quiz)
        .then(data => dispatch(continueQuizAction(quiz)))
}