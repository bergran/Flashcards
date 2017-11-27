import * as types from '../../constants/deck/constants'

export default function deckReducer (state = {}, action) {
    let deck, deckId
    switch (action.type) {
        case types.ADD_DECK_LIST:
            const decksObject = Object.keys(action.decks).reduce((prevState, deckId) => {
                return Object.assign({}, prevState, {
                    [deckId]: {
                        deleted: action.decks[deckId].deleted,
                        title: action.decks[deckId].title
                    }})
            }, {})
            return Object.assign({}, state, decksObject)
        case types.ADD_DECK:
            deck = action.deck
            deckId = Object.keys(deck)[0]
            const prueba = Object.assign({}, state, {[deckId]: Object.assign({
                deleted: false
            }, {title: action.deck[deckId].title})})
            return Object.assign({}, state, {[deckId]: Object.assign({}, {
                deleted: false
            }, {title: action.deck[deckId].title})})
        case types.EDIT_DECK:
            deck = action.deck
            deckId = Object.keys(deck)[0]
            return Object.assign({}, state, {
                [deckId]: {
                    deleted: state[deckId].deleted,
                    title: deck[deckId].title
                }
            })
        case types.REMOVE_DECK:
            deck = action.deck
            deckId = Object.keys(deck)[0]
            return Object.assign({}, state, {[deckId]: {
                ...state[deckId],
                deleted: true
            }})
        default:
            return state
    }
}