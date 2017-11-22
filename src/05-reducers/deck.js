import * as types from '../../constants/deck/constants'

export default function deckReducer (state = {}, action) {
    let deck, deckId
    switch (action.type) {
        case types.ADD_DECK_LIST:
            const decksObject = Object.keys(action.decks).reduce((prevState, deckId) => {
                return {
                    ...prevState,
                    [deckId]: {
                        deleted: action.decks[deckId].deleted,
                        title: action.decks[deckId].title
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
                    deleted: false,
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