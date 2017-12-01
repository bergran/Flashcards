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
export default class Quiz extends PureComponent {
    static navigationOptions = {
        title: 'Quiz'
    }

    render () {
        const { cards, quiz } = this.props
        const totalCards = cards.length
        const answersDone = quiz.answers.length
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}