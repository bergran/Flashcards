import React, { Component } from 'react'
import { ActivityIndicator ,StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import reducers from './src/05-reducers/index'
import createStoreCustom from './src/06-store/store'
import Navigation from './src/navigation'

export default class App extends Component {
    state = {
        isLoading: true
    }

    constructor (props) {
        super(props)

    }

    componentDidMount () {
        this.setState({
            isLoading: false
        })
        console.log('montado!')
    }

    render () {
        const { isLoading } = this.state

        if (isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator
                        animating={true}
                        color={'green'}
                        size={'large'}
                        hidesWhenStopped={true}
                    />
                </View>
            )
        } else {
            const store = createStoreCustom(reducers, {
                quiz: {},
                card: {},
                deck: {}
            })

            return (
                <Provider store={store}>
                    <Navigation />
                </Provider>
            )
        }
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})