import * as types from 'constants/quiz/constants'

export const createQuizAction = (quizId, deckId) => ({
    type: types.CREATE_QUIZ,
    quizId,
    deckId
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