import * as types from '../../constants/cards/constants'
import card from "./initialStates/card";

export default function cardReducer (state = card, action) {
    let deckId, cardId, card, cards
    switch (action.type) {
        case types.ADD_CARDS_LIST:
            cards = Object.keys(action.cards).reduce((state, cardId) => {
                return {
                    ...state,
                    [cardId]: {
                        question: action.cards[cardId].question,
                        answer: action.cards[cardId].answer,
                        isCorrect: action.cards[cardId].isCorrect,
                        idDeck: action.cards[cardId].idDeck,
                        deleted: action.cards[cardId].deleted
                    }
                }
            }, {})
            return {
                ...state,
                ...cards
            }
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
                    question: card[cardId].question,
                    answer: card[cardId].answer,
                    isCorrect: card[cardId].isCorrect,
                    idDeck: card[cardId].idDeck,
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
                    isCorrect: card[cardId].isCorrect,
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