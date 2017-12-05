import React, { Component } from 'react'
import { ActivityIndicator ,StyleSheet, View } from 'react-native'
import {  Permissions, Notifications } from 'expo'
import { Provider } from 'react-redux'
import reducers from './src/05-reducers/index'
import createStoreCustom from './src/06-store/store'
import Navigation from './src/01-containers/App/navigation'
import { getDecks } from "./src/03-services/asyncStorage/decks/index";
import { getCards } from "./src/03-services/asyncStorage/cards/index";
import { getQuizzes } from "./src/03-services/asyncStorage/quiz/index";
import { getNotification, setNotification } from "./src/03-services/asyncStorage/App/notifications";
import formInitialState from './src/05-reducers/initialStates/form'
import { createNotificacion } from "./utils/tools";

export default class App extends Component {
    state = {
        isLoading: true,
        store: null
    }

    componentDidMount () {
        Promise.all([
            getDecks(),
            getCards(),
            getQuizzes(),
            Permissions.getAsync(Permissions.NOTIFICATIONS),
            getNotification()
        ]).then(catalogs => {
            const store = createStoreCustom(reducers, {
                    form: formInitialState,
                    deck: catalogs[0] || {},
                    card: catalogs[1] || {},
                    quiz: catalogs[2] || {}
                })
            const notification = catalogs[3]
            if (notification.status === 'granted') {
                debugger
                const dataNotification = catalogs[4]
                const dateDiff = dataNotification && Date.now() - dataNotification.date
                if (!dataNotification || (dataNotification && dateDiff > 1800  && !dataNotification.quizDone)) {
                    // const date = ((new Date()).getTime() / 1000) + 1800
                    let date = new Date()
                    date.setMinutes(date.getMinutes() + 30)
                    date.setSeconds(0)
                    const notification = createNotificacion('DeckSwift', 'Hey, do you forget to play a quiz? :(')
                    Notifications.scheduleLocalNotificationAsync(notification, {
                        time: date,
                        repeat: 'day'
                    })
                        .then(data => setNotification({date: date.getTime(), quizDone: false}))
                } else if (dateDiff > 86400 && dataNotification.quizDone) {
                    // const date = ((new Date()).getTime() / 1000) + 1800
                    Notifications.cancelAllScheduledNotificationsAsync()
                        .then(data => {
                            let date = new Date()
                            date.setMinutes(date.getMinutes() + 30)
                            date.setSeconds(0)
                            const notification = createNotificacion('DeckSwift',
                                'Hey, do you forget to play a quiz? :(')
                            Notifications.scheduleLocalNotificationAsync(notification, {
                                time: date,
                                repeat: 'day'
                            })
                                .then(data => setNotification({date: date.getTime(), quizDone: false}))
                        })
                    }
                }
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
                        animating
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