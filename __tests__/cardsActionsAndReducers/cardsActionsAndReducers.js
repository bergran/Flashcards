// Libraries

// Actions
import * as actions from '../../src/02-actions/cards/cardActions'

// Constants
import * as types from '../../constants/cards/constants'

// Reducer
import cardReducer from '../../src/05-reducers/cards'

// MockData
import mockData from '../../mock/card/cardMock'

// InitialState
import cardInitialState from '../../src/05-reducers/initialStates/card'

describe('Card actions and reducers', () => {
    test(types.ADD_CARDS_LIST, () => {
        // Params
        const cards = mockData.cardsMock

        // Actions
        const expectedAction = {
            type: types.ADD_CARDS_LIST,
            cards
        }

        const action = actions.addCardsAction(cards)
        expect(action).toEqual(expectedAction)

        // Reducers
        expect(cardReducer(cardInitialState, action)).toEqual({
            ...cardInitialState,
            ...cards
        })
    })

    test(types.ADD_CARD, () => {
        // Params
        const card = mockData.cardMock
        const cardId = Object.keys(card)[0]
        // Actions
        const expectedAction = {
            type: types.ADD_CARD,
            deckId: '123456789k',
            card
        }
        const action = actions.addCardAction('123456789k', card)
        expect(action).toEqual(expectedAction)

        // Reducers
        expect(cardReducer(cardInitialState, action)).toEqual({
            ...cardInitialState,
            [cardId]: {
                ...card[cardId]
            }
        })
    })

    test(types.EDIT_CARD, () => {
        // Params
        const cardOriginal = mockData.cardMock
        const card = mockData.cardEditMock

        // Actions
        const expectedAction = {
            type: types.EDIT_CARD,
            card
        }
        const action = actions.editCardAction(card)
        expect(action).toEqual(expectedAction)

        // Reducers
        expect(cardReducer(cardOriginal, action)).toEqual({
            ...card
        })
    })

    test(types.REMOVE_CARD, () => {
        // Params
        const cardOriginal = mockData.cardMock
        const cardDelete = mockData.cardRemMock
        const cardId = Object.keys(cardOriginal)[0]
        // Action
        const expectedAction = {
            type: types.REMOVE_CARD,
            cardId
        }

        const action = actions.removeCardAction(cardId)
        expect(action).toEqual(expectedAction)

        // Reducers
        expect(cardReducer(cardOriginal, action)).toEqual({
            ...cardOriginal,
            [cardId]: {
                ...cardOriginal[cardId],
                deleted: true
            }
        })
    })
})