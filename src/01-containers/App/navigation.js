import React, { Component } from 'react'
import { View, Text, StyleSheet,  } from 'react-native'
import { connect } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { addDeckAction } from '../../02-actions/deck/deckActions'
import ShowDecksView from '../Decks/view'

const Tabs = TabNavigator({
    Decks: {
        screen: ShowDecksView,
        navigationOption: {
            tabBarLabel: 'All decks'
        }
    },
    Decks2: {
        screen: ShowDecksView,
        navigationOption: {
            tabBarLabel: 'No decks'
        }
    }
})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    }
})

// const FlashCardStatusBar =

class Navigation extends Component {

    render () {
        console.log('props', this.props)
        return (
            <MainNavigator />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    deck: state.deck,
    quiz: state.quiz,
    card: state.card
})

const mapDispatchToProps = dispatch => ({
    addDeck: (deck) => dispatch(addDeckAction(deck))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)