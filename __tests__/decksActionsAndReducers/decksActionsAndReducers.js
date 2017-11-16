/* globals expect, describe, test */
// Actions

import * as actions from '02-actions/deck/deckActions'

// Reducer

import deckReducer from '05-reducers/deck'

// Constants

import * as constants from 'constants/deck/contants'

// MockData

import mock from 'mock/deck/deckMock'

// InitialState

import deckInitialState from '05-reducers/initialStates/deck'

describe('Deck action and reducers', () => {
    test(constants.ADD_DECK, () => {
        // Params
        const deck = mock.deckMock
        const deckId = Object.keys(deck)[0]
        // Action
        const expectedAction = {
            type: constants.ADD_DECK,
            deck: {
                id: deckId,
                title: deck[deckId].title,
                questions: deck[deckId].questions,
                deleted: deck[deckId].deleted
            }
        }

        const action = actions.addDeckAction({
            id: deckId,
            title: deck[deckId].title,
            questions: deck[deckId].questions,
            deleted: deck[deckId].deleted
        })
        expect(action).toBeEquals(expectedAction)
    })
})