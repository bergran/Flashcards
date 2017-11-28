import { combineReducers } from 'redux'
import quizReducer from './quiz'
import deckReducer from './deck'
import cardReducer from './cards'
import formReducer from './form'

export default combineReducers({
    quiz: quizReducer,
    deck: deckReducer,
    card: cardReducer,
    form: formReducer
})