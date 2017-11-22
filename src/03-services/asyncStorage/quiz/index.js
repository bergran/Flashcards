import { AsyncStorage } from 'react-native'
import { QUIZ } from '../../../../constants/quiz/constants'

export const getQuiz = () => AsyncStorage.getItem(QUIZ)

export const createQuiz = deck => AsyncStorage.setItem(QUIZ, deck)

export const mergeQuiz = deck => AsyncStorage.mergeItem(QUIZ, deck)
