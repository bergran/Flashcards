import { AsyncStorage } from 'react-native'
import { DECK } from '../../../../constants/deck/constants'

export const getDecks = () => AsyncStorage.getItem(DECK)

export const createDeck = deck => AsyncStorage.setItem(DECK, deck)

export const mergeDeck = deck => AsyncStorage.mergeItem(DECK, deck)
