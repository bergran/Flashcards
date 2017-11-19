// Libraries

// Actions
import * as actions from '02-actions/cards/cardActions'

// Constants
import * as types from 'constants/cards/constants'

// Reducer
import cardReducer from '05-reducers/cards'

// MockData
import mockData from 'mock/card/cardMock'

// InitialState
import cardInitialState from '05-reducers/initialStates/card'

describe('Card actions and reducers', () => {
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
        const action = actions.addCartAction('123456789k', card)
        expect(action).toEqual(expectedAction)

        // Reducers
        expect(cardReducer(cardInitialState, action)).toEqual({
            ...cardInitialState,
            [cardId]: {
                ...card[cardId]
            }
        })
    })
})