import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addDeckAction } from './02-actions/deck/deckActions'

class Navigation extends Component {

    render () {
        console.log('props', this.props)
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
            </View>
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