// Libraries

// Actions
import * as actions from '02-actions/quiz/quizActions'

// Reducer
import quizReducer from '05-reducers/quiz'

// Constants
import * as types from 'constants/quiz/constants'

// MockData
import mockData from 'mock/quiz/quizMock'

// InitialState
import quizInitialState from '05-reducers/initialStates/quiz'

describe('Quiz Actions and reducers', () => {
    test(types.CREATE_QUIZ, () => {
        // Params
        const quiz = mockData.quizCreate
        const quizId = Object.keys(quiz)[0]
        const deckId = quiz[quizId].deckId
        const date = quiz[quizId].date

        // Actions
        const expectedAction = {
            type: types.CREATE_QUIZ,
            deckId,
            quizId,
            date
        }
        const action = actions.createQuizAction(deckId, quizId, date)
        expect(action).toEqual(expectedAction)

        // Reducers
        expect(quizReducer(quizInitialState, action)).toEqual(quiz)
    })

    test(types.ADD_ANSWER_QUIZ, () => {
        // Params
        const quiz = mockData.quizCreate
        const quizId = Object.keys(quiz)[0]
        const answer = false
        const isCorrect = true
        // Actions
        const expectedAction = {
            type: types.ADD_ANSWER_QUIZ,
            quizId,
            answer,
            isCorrect
        }

        const action = actions.addAnswerQuizAction(quizId, answer, isCorrect)
        expect(action).toEqual(expectedAction)
        // Reducers
        expect(quizReducer(quiz, action)).toEqual({
            ...quiz,
            [quizId]: {
                ...quiz[quizId],
                answers: quiz[quizId].answers.concat(answer),
                success: 1
            }
        })
    })

    test(types.ADD_ANNOTATION_QUIZ, () => {
        // Params
        const quiz = mockData.quizCreate
        const quizId = Object.keys(quiz)[0]
        const annotation = 'Hello world, im annotation'

        // Actions
        const expectedAction = {
            type: types.ADD_ANNOTATION_QUIZ,
            quizId,
            annotation
        }

        const action = actions.addAnnotationQuizAction(quizId, annotation)
        expect(action).toEqual(expectedAction)
        // Reducers
        expect(quizReducer(quiz, action)).toEqual({
            ...quiz,
            [quizId]: {
                ...quiz[quizId],
                annotation
            }
        })
    })

    test(types.CANCEL_QUIZ, () => {
        // Params
        const quiz = mockData.quizCreate
        const quizId = Object.keys(quiz)[0]

        // Actions
        const expectedAction = {
            type: types.CANCEL_QUIZ,
            quizId
        }

        const action = actions.cancelQuizAction(quizId)
        expect(action).toEqual(expectedAction)
        // Reducers
        expect(quizReducer(quiz, action)).toEqual({
            ...quiz,
            [quizId]: {
                ...quiz[quizId],
                isCancelled: true,
                isContinued: false
            }
        })
    })

    test(types.FINISH_QUIZ, () => {
        // Params
        const quiz = mockData.quizCreate
        const quizId = Object.keys(quiz)[0]

        // Actions
        const expectedAction = {
            type: types.FINISH_QUIZ,
            quizId
        }

        const action = actions.finishQuizAction(quizId)
        expect(action).toEqual(expectedAction)
        // Reducers
        expect(quizReducer(quiz, action)).toEqual({
            ...quiz,
            [quizId]: {
                ...quiz[quizId],
                isFinished: true
            }
        })
    })

    test(types.CONTINUE_QUIZ, () => {
        // Params
        const quiz = mockData.quizCreate
        const quizId = Object.keys(quiz)[0]
        const quizInitial = {
            ...quiz,
            [quizId]: {
                ...quiz[quizId],
                isCancelled: true
            }
        }
        // Actions
        const expectedAction = {
            type: types.CONTINUE_QUIZ,
            quizId
        }

        const action = actions.continueQuizAction(quizId)
        expect(action).toEqual(expectedAction)
        // Reducers
        expect(quizReducer(quizInitial, action)).toEqual({
            ...quiz,
            [quizId]: {
                ...quiz[quizId],
                isCancelled: false,
                isContinued: true
            }
        })
    })
})