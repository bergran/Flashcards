import uuidv4 from 'uuid'
import * as types from '../../../constants/deck/constants'
import * as persist from '../../03-services/asyncStorage/decks'

// Actions

export const addDeckListAction = decks => ({
    type: types.ADD_DECK_LIST,
    decks
})

export const addDeckAction = deck => ({
    type: types.ADD_DECK,
    deck
})

export const editDeckAction = deck => ({
    type: types.EDIT_DECK,
    deck
})

export const removeDeckAction = deck => ({
    type: types.REMOVE_DECK,
    deck
})

// Async Actions

export const addDeck = (title) => dispatch => {
    const deck = {
        [uuidv4()]: {
            title,
            deleted: false
        }
    }
    return persist.mergeDeck(Object.assign({}, deck))
        .then(data => {
            dispatch(addDeckAction(deck))
        })
        .catch(error => console.log('error', error))
}

export const editDeck = deck => dispatch => {
    return persist.mergeDeck(Object.assign({}, deck, {title: deck.title}))
        .then(data => dispatch(editDeckAction(deck)))
}

export const removeDeck = deckRaw => dispatch => {
    const deckId = Object.keys(deckRaw)[0]
    const deck = {
        [deckId]: {
            title: deckRaw[deckId].title,
            deleted: true
        }
    }
    return persist.mergeDeck(deck)
        .then(data => dispatch(removeDeckAction(deck)))
}