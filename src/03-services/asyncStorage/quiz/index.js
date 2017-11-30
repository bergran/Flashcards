import { AsyncStorage } from 'react-native'
import { QUIZ } from '../../../../constants/quiz/constants'

export const getQuizzes = () => AsyncStorage.getItem(QUIZ).then(quizzes => JSON.parse(quizzes))

export const createQuiz = quiz => AsyncStorage.mergeItem(QUIZ, JSON.stringify(quiz))

export const mergeQuiz = quiz => AsyncStorage.mergeItem(QUIZ, JSON.stringify(quiz))
