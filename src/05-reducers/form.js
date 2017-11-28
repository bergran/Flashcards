import * as types from '../../constants/forms/constants'
import initialState from './initialStates/form'

export default function formReducer (state = {}, action) {
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
        default:
            return state
    }
}