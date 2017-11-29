import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import FlashCardStatusBar from './FlashCardStatusBar'
import ShowDecksView from '../Decks/showDecks/view'
import CreateDeck from '../Decks/createDeck/view'
import entryDeck from '../Decks/entryDeck/view'

const Tabs = TabNavigator({
    Decks: {
        screen: ShowDecksView,
        navigationOptions: {
            tabBarLabel: 'Decks'
        }
    },
    createDeck: {
        screen: CreateDeck,
        navigationOptions: {
            tabBarLabel: 'New deck'
        }
    }},
    {
        navigationOptions: {
                header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? '#2067d8' : '#fff',
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? '#fff' : '#2067d8',
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    })

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckEntry: {
        screen: entryDeck,
        path: 'entryDeck',
        navigationOptions: {
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#2067d8',
            }
        }
    }
})

class Navigation extends Component {

    render () {
        return (
            <View style={{flex: 1}}>
                <FlashCardStatusBar />
                <MainNavigator />
            </View>
        )
    }
}

export default Navigation