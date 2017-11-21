import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import reducers from './05-reducers/index'
import createStoreCustom from './06-store/store'

export default (initialState = {}) => {
    const store = createStoreCustom(reducers, initialState)

    return (
        <Provider store={store}>
            <Text>Hello</Text>
        </Provider>
    )
}