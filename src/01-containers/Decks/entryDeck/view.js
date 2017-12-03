import React, { Component } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { createQuiz } from "../../../02-actions/quiz/quizActions";
import uuidv4 from 'uuid'
import { removeDeck } from '../../../02-actions/deck/deckActions'

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.navigation.state.params
    const { card } = state
    return {
        deck: state.deck[id],
        cards: Object.keys(card).filter(cardId => card[cardId].deckId === id).length,
        quiz: state.quiz
    }
}

@connect(mapStateToProps, {
    createQuiz,
    removeDeck
})
export default class entryDeck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params
        return {
            title: name
        }
    }

    shouldComponentUpdate (nextProps) {
        return !nextProps.deck.deleted
    }

    render () {
        const { deck, cards } = this.props
        if (deck.deleted) {
            return (
                <View>
                    <Text>
                        This deck does not exist, this could be deleted or a fail connection :(
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.titles}>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.subtitle}>{`${cards} cards`}</Text>
                    </View>
                    <View style={styles.containerButtons}>
                        <View style={styles.buttons}>
                            <View>
                                <Button
                                    title={'Add card'}
                                    color={'#2067d8'}
                                    onPress={this.handlePress}
                                />
                            </View>
                            <View>
                                <Button
                                    title={'Quiz'}
                                    color={'#f48042'}
                                    onPress={this.handleQuizStart}
                                    disabled={cards === 0}
                                />
                            </View>
                            <View>
                                <Button
                                    title={'Edit'}
                                    color={'#f48042'}
                                    onPress={this.handleEdit}
                                />
                            </View>
                            <View>
                                <Button
                                    title={'Remove'}
                                    color={'#ba1f1f'}
                                    onPress={this.handleReset}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }

    handlePress = () => {
        const { navigation } = this.props
        const { id } = navigation.state.params

        navigation.navigate('AddCard', {deckId: id})
    }

    handleQuizStart = () => {
        const { navigation, createQuiz, deck } = this.props
        const deckId = navigation.state.params.id
        const quizId = uuidv4()
        createQuiz(quizId, deckId)
            .then(() => navigation.navigate('Quiz', {deckId, quizId, deckTitle: deck.title}))

    }

    handleReset = () => {
        const { deck:deckRaw, navigation, removeDeck } = this.props
        const deckId = navigation.state.params.id
        let deck = Object.assign({}, {
            [deckId]: Object.assign({}, deckRaw, {
                deleted: true
            })
        })
        removeDeck(deck)
        navigation.goBack()
    }

    handleEdit = () => {
        const { deck, navigation } = this.props
        const { deckId } = navigation.state.params

        navigation.navigate('ShowCards', {deckId, deckTitle: deck.title})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    titles: {
        height: 100,
        padding: 50
    },
    title: {
        fontSize: 50,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 25,
        color: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
    },
    containerButtons: {
        width: 200,
        height: 200,
    },
    buttons: {
        flex: 1,
        justifyContent: 'space-around'
    }
})