import * as types from 'constants/cards/constants'

export default function cardReducer (state, action) {
    let deckId, cardId, card, cards
    switch (action.type) {
        case types.ADD_CARD:
            deckId = action.deckId
            card = action.card
            cardId = Object.keys(card)[0]
            cards = Object.keys(state).reduce((prevState, cardIdR) => {
                if (cardIdR !== cardId) {
                    return {
                        ...state[cardIdR]
                    }
                }
            }, {})
            return {
                ...cards,
                [cardId]: {
                    ...card[cardId]
                }
            }
        default:
            return state
    }
}