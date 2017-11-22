import React from 'react'
import { Provider } from 'react-redux'
import reducers from './05-reducers/index'
import createStoreCustom from './06-store/store'
import Navigation from './navigation'

export default (initialState = {}) => {
    const store = createStoreCustom(reducers, initialState)

    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    )
}