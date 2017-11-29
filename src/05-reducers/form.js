import * as types from '../../constants/forms/constants'
import initialState from './initialStates/form'

export default function formReducer (state = initialState, action) {
    switch (action.type) {
        case types.DECK_MERGE_INPUT:
            return Object.assign({}, state, {deck: Object.assign(
                {}, state.deck, {[action.name]: {
                    value: action.value,
                    isValid: action.isValid
                }}
            )})
        case types.DECK_CLEAN_FORM:
            return Object.assign({}, state, {deck: Object.assign(
                {}, Object.keys(state.deck).reduce((prevState, inputName) => {
                    return Object.assign({}, prevState, {[inputName]: {
                        value: '',
                        isValid: null
                    }})
                }, {})
            )})
        case types.CARD_MERGE_INPUT:
            return Object.assign({}, state, {
                card: Object.assign({}, state.card, {[action.name]: {
                    value: action.value,
                    isValid: action.isValid
                }})
            })
        case types.CARD_CLEAN_FORM:
            return Object.assign({}, state, {card: Object.assign(
                {}, state.card, Object.keys(state.card).reduce((prevState, cardName) => {
                    return Object.assign({}, prevState, {
                        [cardName]: {
                            value: '',
                            isValid: null
                        }
                    })
                }, {})
            )})
        default:
            return state
    }
}