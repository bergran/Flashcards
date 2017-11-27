import { AsyncStorage } from 'react-native'
import { DECK } from '../../../../constants/deck/constants'

export const getDecks = () => AsyncStorage.getItem(DECK).then(deck => JSON.parse(deck))

export const createDeck = deck => AsyncStorage.setItem(DECK, JSON.stringify(deck))

export const mergeDeck = deck => AsyncStorage.mergeItem(DECK, JSON.stringify(deck))
