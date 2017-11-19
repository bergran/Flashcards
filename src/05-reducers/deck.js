import * as types from 'constants/deck/contants'

export default function deckReducer (state = {}, action) {
    let deck, deckId, card, cards
    switch (action.type) {
        case types.ADD_DECK_LIST:
            const decksObject = action.decks.reduce((prevState, deck) => {
                const deckId = Object.keys(deck)[0]
                return {
                    ...prevState,
                    [deckId]: {
                        cards: deck[deckId].cards,
                        deleted: deck[deckId].deleted,
                        title: deck[deckId].title
                    }
                }
            }, {})
            return {
                ...state,
                ...decksObject
            }
        case types.ADD_DECK:
            deck = action.deck
            deckId = Object.keys(deck)[0]
            return {
                ...state,
                [deckId]: {
                    cards: deck[deckId].cards,
                    deleted: deck[deckId].deleted,
                    title: deck[deckId].title
                }
            }
        case types.EDIT_DECK:
            deck = action.deck
            deckId = Object.keys(deck)[0]
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    title: deck[deckId].title
                }
            }
        case types.REMOVE_DECK:
            deck = action.deck
            deckId = Object.keys(deck)[0]
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    deleted: true
                }
            }
        default:
            return state
    }
}