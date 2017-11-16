import * as types from 'constants/deck/contants'

export default function deckReducer (state = {}, action) {
    switch (action.type) {
        case types.ADD_DECK_LIST:
            const decksObject = action.decks.reduce((prevState, deck) => {
                return {
                    ...prevState,
                    [deck.id]: {
                        questions: deck.questions,
                        deleted: deck.deleted,
                        title: deck.title
                    }
                }
            }, {})
            return {
                ...state,
                ...decksObject
            }
        case types.ADD_DECK:
            const deck = action.deck
            return {
                ...state,
                [deck.id]: {
                    questions: deck.questions,
                    deleted: deck.deleted,
                    title: deck.title
                }
            }
        case types.EDIT_DECK:
            const deck = action.deck
            return {
                ...state,
                [deck.id]: {
                    questions: deck.questions,
                    title: deck.title
                }
            }
        case types.REMOVE_DECK:
            const deck = action.deck
            return {
                ...state,
                [deck.id]: {
                    deleted: true
                }
            }
        default:
            return state
    }
}