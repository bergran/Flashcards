import { combineReducers } from 'redux'
import userReducer from './user'
import deckReducer from './deck'
import cardReducer from './cards'

export default combineReducers({
    user: userReducer,
    deck: deckReducer,
    card: cardReducer
})