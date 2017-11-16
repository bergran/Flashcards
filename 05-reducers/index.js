import { combineReducers } from 'redux'
import userReducer from './user'
import deckReducer from './deck'

export default combineReducers({
    user: userReducer,
    deck: deckReducer
})