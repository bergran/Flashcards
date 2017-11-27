import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../02-actions/deck/deckActions'

class ShowDecksView extends PureComponent {
    render () {
        const { decks } = this.props
        return (
            <Text>Hello</Text>
        )
    }
}

const mapStateToProps = state => ({
    cards: state.card,
    decks: state.deck,
    quizzes: state.quiz
})

const mapDispatchToProps = dispatch => ({
    createDeck: deck => dispatch(actions.addDeck(deck))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowDecksView)