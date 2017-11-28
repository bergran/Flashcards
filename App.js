import React, { Component } from 'react'
import { ActivityIndicator ,StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import reducers from './src/05-reducers/index'
import createStoreCustom from './src/06-store/store'
import Navigation from './src/01-containers/App/navigation'
import { getDecks } from "./src/03-services/asyncStorage/decks/index";
import { getCards } from "./src/03-services/asyncStorage/cards/index";
import { getQuizzes } from "./src/03-services/asyncStorage/quiz/index";
import formInitialState from './src/05-reducers/initialStates/form'

export default class App extends Component {
    state = {
        isLoading: true,
        store: null
    }

    componentDidMount () {
        Promise.all([
            getDecks(),
            getCards(),
            getQuizzes()
        ]).then(catalogs => {
            const store = createStoreCustom(reducers, {
                    form: formInitialState,
                    deck: catalogs[0] || {},
                    card: catalogs[1] || {},
                    quiz: catalogs[2] || {}
                })
            this.setState({
                isLoading: false,
                store: store
            })
        })
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
            const { store } = this.state

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