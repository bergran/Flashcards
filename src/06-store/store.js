import { createStore } from 'redux'

export default function createStoreCustom (reducer, initialState, middleware) {
    return createStore(reducer, initialState, middleware)
}