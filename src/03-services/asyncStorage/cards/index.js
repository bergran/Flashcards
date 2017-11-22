import { AsyncStorage } from 'react-native'
import { CARD } from '../../../../constants/cards/constants'

export const getCards = () => AsyncStorage.getItem(CARD)

export const createcard = card => AsyncStorage.setItem(CARD, deck)

export const mergeCard = card => AsyncStorage.mergeItem(CARD, deck)
