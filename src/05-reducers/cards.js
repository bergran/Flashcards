import * as types from '../../constants/cards/constants'
import card from "./initialStates/card";

export default function cardReducer (state = card, action) {
    let cardId, card, cards
    switch (action.type) {
        case types.ADD_CARDS_LIST:
            cards = Object.keys(action.cards).reduce((state, cardId) => {
                return {
                    ...state,
                    [cardId]: {
                        question: action.cards[cardId].question,
                        answer: action.cards[cardId].answer,
                        deckId: action.cards[cardId].deckId,
                        deleted: action.cards[cardId].deleted
                    }
                }
            }, {})
            return {
                ...state,
                ...cards
            }
        case types.ADD_CARD:
            card = action.card
            cardId = Object.keys(card)[0]
            cards = Object.keys(state).reduce((prevState, cardIdR) => {
                if (cardIdR !== cardId) {
                    return {
                        ...prevState,
                        [cardIdR]: {
                            ...state[cardIdR]
                        }
                    }
                } else {
                    return prevState
                }
            }, {})
            return {
                ...cards,
                [cardId]: {
                    question: card[cardId].question,
                    answer: card[cardId].answer,
                    deckId: card[cardId].deckId,
                    deleted: false
                }
            }
        case types.EDIT_CARD:
            card = action.card
            cardId = Object.keys(card)
            return {
                ...state,
                [cardId]: {
                    ...state[cardId],
                    question: card[cardId].question,
                    answer: card[cardId].answer,
                }
            }
        case types.REMOVE_CARD:
            cardId = action.cardId
            return {
                ...state,
                [cardId]: {
                    ...state[cardId],
                    deleted: true
                }
            }

        default:
            return state
    }
}