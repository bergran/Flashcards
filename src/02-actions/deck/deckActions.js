import * as types from 'constants/deck/contants'

// ----- Actions -----

export const addDeckListAction = decks => ({
    type: types.ADD_DECK_LIST,
    decks
})

export const addDeckAction = deck => ({
    type: types.ADD_DECK,
    deck
})

export const editDeck = deck => ({
    type: types.EDIT_DECK,
    deck
})

export const removeDeck = deck => ({
    type: types.REMOVE_DECK,
    deck
})