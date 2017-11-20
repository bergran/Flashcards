import * as types from 'constants/quiz/constants'

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