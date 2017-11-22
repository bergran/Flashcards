import * as types from '../../../constants/deck/constants'

// ----- Actions -----

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