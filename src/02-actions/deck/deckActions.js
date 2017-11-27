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

export const addDeck = deck => dispatch => {
    return persist.createDeck(Object.assign({}, deck))
        .then(data => {
            dispatch(addDeckAction(deck))
        })
        .catch(error => console.log('error', error))
}

export const editDeck = deck => dispatch => {
    return persist.mergeDeck(Object.assign({}, deck, {title: deck.title}))
        .then(data => dispatch(editDeckAction(deck)))
}

export const removeDeck = deck => dispatch => {
    const deckId = Object.keys(deck)[0]
    return persist.mergeDeck({
        ...deck,
        [deckId]: {
            title: deck[deckId].title,
            deleted: true
        }
    })
}