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

import deckInitialState from 'src/05-reducers/initialStates/deck'
import deckMock from "mock/deck/deckMock";

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
        expect(action).toEqual(expectedAction)

        // Reducer
        expect(deckReducer(deckInitialState, expectedAction)).toEqual({
            [deckId]: {
                ...deck[deckId]
            }
        })
    })

    test(constants.ADD_DECK_LIST, () => {
        // Params
        const deckList = deckMock.decksMock

        // Actions

        const expectedAction = {
            type: constants.ADD_DECK_LIST,
            decks: deckList
        }
        const action = actions.addDeckListAction(deckList)
        expect(action).toEqual(expectedAction)

        // Reducers
        expect(deckReducer(deckInitialState, action)).toEqual(
            deckList.reduce((prevState, deck) => {
                const deckId = Object.keys(deck)[0]
                return {
                    ...prevState,
                    [deckId]: deck[deckId]
                }
        }, {}))
    })

    test(constants.EDIT_DECK, () => {
        // Params
        const deckInitial = deckMock.deckMock
        const deckId = Object.keys(deckInitial)[0]
        const deckEdited = {
            [deckId]: {
                ...deckInitial[deckId],
                title: 'Cambio el titulo'
            }
        }
        // Actions
        const expectedAction = {
            type: constants.EDIT_DECK,
            deck: deckEdited
        }

        const action = actions.editDeckAction(deckEdited)

        expect(action).toEqual(expectedAction)

        // Reducer
        expect(deckReducer(deckInitial, action)).toEqual({
            ...deckEdited
        })
    })
})