import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { StyleSheet ,Text, View } from 'react-native'
import {
    cancelQuiz,
    finishQuiz,
    addAnswerQuizAction
} from '../../../02-actions/quiz/quizActions'
import QuizGame from '../game'

const mapStateToProps = (state, ownProps) => {
    return {
        cards: Object.keys(state.card).filter(cardId => {
            const deckId = ownProps.navigation.state.params.deckId
            return !state.card[cardId].deleted &&
                state.card[cardId].deckId === deckId
        }).map(cardId => state.card[cardId]),
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
        const { finished } = this.props
        const totalCards = cards.length
        const answersDone = quiz.answers.length
        if (answersDone < totalCards) {
            return (
                <View
                    style={styles.container}
                >
                    <QuizGame
                        card={{
                            answer: cards[answersDone].answer,
                            question: cards[answersDone].question
                        }}
                        answersDone={answersDone + 1}
                        cards={totalCards}
                        onAddAnswer={this.handleAddAnswer}
                        onCancel={this.handleCancel}
                        onFinish={this.handleFinish}
                    />
                </View>
            )
        } else {
            return (
                <View
                    className={styles.container}
                >
                    <View>
                        <Text>Hello</Text>
                    </View>
                </View>
            )
        }
    }

    handleAddAnswer = answer => {
        const { addAnswerQuizAction, navigation } = this.props
        const { quizId } = navigation.state.params
        alert('add answer')
        addAnswerQuizAction(quizId, answer)
    }

    handleCancel = () => {
        const {
            cancelQuiz,
            navigation,
            quiz:quizRaw
        } = this.props
        alert('cancel')
        const quizId = navigation.state.params.quizId
        const quiz = Object.assign({}, {[quizId]:
            Object.assign({}, quizRaw, {isCancelled: true, isContinued: false})})
        cancelQuiz(quiz)
    }

    handleFinish = () => {
        const { finishQuiz, navigation, quiz } = this.props
        const { quizId } = navigation.state.params
        finishQuiz({
            [quizId]: Object.assign({}, quiz, {
                isFinished: true
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 20
    }
})