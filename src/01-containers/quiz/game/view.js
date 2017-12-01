import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
    Button,
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {
    cancelQuiz,
    finishQuiz,
    addAnswerQuizAction
} from '../../../02-actions/quiz/quizActions'
import { capitalize } from '../../../../utils/tools'

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
    state = {
        show: 'question',
        noShow: 'answer'
    }

    static navigationOptions = {
        title: 'Quiz'
    }

    render () {
        const { cards, quiz } = this.props
        const totalCards = cards.length
        const answersDone = quiz.answers.length
        const { show, noShow } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{`${answersDone + 1}/${totalCards} cards`}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>{cards[answersDone][show]}</Text>
                    <TouchableOpacity
                        onPress={this.handleSwitch}
                    >
                        <Text style={styles.noShow}>{capitalize(noShow)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                    <View
                        style={styles.button}
                    >
                        <Button
                            color={'#3fc433'}
                            title={'Correct'}
                            style={{fontSize: 20}}
                            onPress={() => alert('correct')}
                        />
                    </View>
                    <View
                        style={[styles.button, {marginTop: 20}]}
                    >
                        <Button
                            color={'#ba1f1f'}
                            title={'Incorrect'}
                            onPress={() => alert('incorrect')}
                        />
                    </View>
                </View>
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

    handleSwitch = () => {
        const { show, noShow } = this.state
        this.setState({
            show: noShow,
            noShow: show
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        padding: 20

    },
    title: {
        fontSize: 20
    },
    info: {
        height: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 40,
        textAlign: 'center',
        width: 200,
        height: 60
    },
    noShow: {
        fontSize: 20,
        textAlign: 'center',
        borderWidth: 1,
        color: 'rgba(0, 0, 0, 0.25)',
        borderColor: 'rgba(0, 0, 0, 0.25)',
        width: 100,
        height: 30
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        height: 100
    },
    button: {
        width: 200,
        borderRadius: 40
    }
})