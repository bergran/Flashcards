import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

const mapStateToProps = (state, ownProps) => ({
    deck: Object.keys(state.deck).reduce((prevState, deckId) => {
        if (deckId === ownProps.navigation.state.params.deckId) {
            return Object.assign({}, prevState, state.deck[deckId])
        } else {
            return prevState
        }
    }),
    cards: Object.keys(state.cards).map(cardId => {
        const deckId = ownProps.navigation.state.params.deckId
        if (state.card[cardId].deckId === deckId) {
            return state.cards[cardId]
        }
    }),
    quiz: state.quiz[ownProps.navigation.state.params.quizId]
})

@connect(mapStateToProps)
export default class QuizGame extends PureComponent {
    render () {
        return (
            <View>
                <Text>
                    Hello world
                </Text>
            </View>
        )
    }
}