import * as types from 'constants/cards/constants'

export const addCartAction = (deckId, card) => ({
    type: types.ADD_CARD,
    card,
    deckId
})

export const editCardAction = (deckId, card) => ({
    type: types.EDIT_CARD,
    card,
    deckId
})

export const removeCardAction = (deckId, cardId) => ({
    type: types.REMOVE_CARD,
    cardId,
    deckId
})