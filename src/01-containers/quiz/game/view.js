import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import {
    cancelQuiz,
    finishQuiz,
    addAnswerQuizAction
} from '../../../02-actions/quiz/quizActions'

const mapStateToProps = (state, ownProps) => {
    return {
        deck: Object.keys(state.deck).reduce((prevState, deckId) => {
            if (deckId === ownProps.navigation.state.params.deckId) {
                return Object.assign({}, prevState, state.deck[deckId])
            } else {
                return prevState
            }
        }),
            cards: Object.keys(state.card).map(cardId => {
        const deckId = ownProps.navigation.state.params.deckId
        if (state.card[cardId].deckId === deckId) {
            return state.card[cardId]
        }
    }),
        quiz: state.quiz[ownProps.navigation.state.params.quizId]
    }
}

@connect(mapStateToProps, {
    cancelQuiz,
    finishQuiz,
    addAnswerQuizAction
})
export default class QuizGame extends PureComponent {
    render () {
        console.log(this.props)
        console.log(this.props.quiz)
        return (
            <View>
                <Text>
                    Hello world
                </Text>
            </View>
        )
    }

    async componentWillUnmount () {
        // works to back
        const {
            cancelQuiz,
            navigation
        } = this.props
        await cancelQuiz(navigation.state.params.quizId)
    }
}