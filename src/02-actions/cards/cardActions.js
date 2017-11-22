import * as types from 'constants/cards/constants'

export const addCardAction = (deckId, card) => ({
    type: types.ADD_CARD,
    card,
    deckId
})

export const editCardAction = card => ({
    type: types.EDIT_CARD,
    card,
})

export const removeCardAction = cardId => ({
    type: types.REMOVE_CARD,
    cardId,
})