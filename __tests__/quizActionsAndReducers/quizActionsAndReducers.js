// Libraries

// Actions
import * as actions from '../../src/02-actions/quiz/quizActions'

// Reducer
import quizReducer from '../../src/05-reducers/quiz'

// Constants
import * as types from '../../constants/quiz/constants'

// MockData
import mockData from '../../mock/quiz/quizMock'

// InitialState
import quizInitialState from '../../src/05-reducers/initialStates/quiz'

describe('Quiz Actions and reducers', () => {
    test(types.ADD_QUIZZES_LIST, () => {
        // Params
        const quizzes = mockData.quizzes

        // Actions
        const expectedAction = {
            type: types.ADD_QUIZZES_LIST,
            quizzes
        }
        const action = actions.addQuizzesAction(quizzes)
        expect(action).toEqual(expectedAction)

        // Reducers
        expect(quizReducer(quizInitialState, action)).toEqual(
            Object.keys(quizzes).reduce((state, quizId) => {
                return {
                    ...state,
                    [quizId]: {
                        deckId: quizzes[quizId].deckId,
                        answers: quizzes[quizId].answers,
                        date: quizzes[quizId].date,
                        isCancelled: quizzes[quizId].isCancelled,
                        isFinished: quizzes[quizId].isFinished,
                        isContinued: quizzes[quizId].isContinued,
                        annotation: quizzes[quizId].annotation
                    }
                }
            }, {})
        )
    })

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
        // Actions
        const expectedAction = {
            type: types.ADD_ANSWER_QUIZ,
            quizId,
            answer
        }

        const action = actions.addAnswerQuizAction(quizId, answer)
        expect(action).toEqual(expectedAction)
        // Reducers
        expect(quizReducer(quiz, action)).toEqual({
            ...quiz,
            [quizId]: {
                ...quiz[quizId],
                answers: quiz[quizId].answers.concat(answer)
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