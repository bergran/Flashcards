import * as types from '../../../constants/cards/constants'
import * as persist from '../../03-services/asyncStorage/cards'

// Actions

export const addCardsAction = cards => ({
    type: types.ADD_CARDS_LIST,
    cards
})

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

// Async actions

export const addCard = card => dispatch => {
    persist.createCard(card)
        .then(data => dispatch(addCardAction(card)))
}

export const editCard = card => dispatch => {
    persist.mergeCard(card)
        .then(data => dispatch(editCardAction(card)))
}

export const removeCard = card => {
    persist.mergeCard(Object.assign({}, card, {delete: true}))
        .then(data => dispatch(removeCardAction(card)))
}