import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

export default function createStoreCustom (reducer = null, initialState = null, middleware = null) {
    return createStore(reducer, initialState, compose(applyMiddleware(
        thunk
    )))
}