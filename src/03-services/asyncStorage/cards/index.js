import { AsyncStorage } from 'react-native'
import { CARD } from '../../../../constants/cards/constants'

export const getCards = () => AsyncStorage.getItem(CARD).then(cards => JSON.parse(cards))

export const createCard = card => AsyncStorage.setItem(CARD, JSON.stringify(card))

export const mergeCard = card => AsyncStorage.mergeItem(CARD, JSON.stringify(card))
