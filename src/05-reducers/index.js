import { combineReducers } from 'redux'
import quizReducer from './quiz'
import deckReducer from './deck'
import cardReducer from './cards'

export default combineReducers({
    quiz: quizReducer,
    deck: deckReducer,
    card: cardReducer
})