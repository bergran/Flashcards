import React, { PureComponent } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.navigation.state.params
    const { card } = state
    return {
        deck: state.deck[id],
        cards: Object.keys(card).filter(cardId => card[cardId].deckId === id).length
    }
}

@connect(mapStateToProps)
export default class entryDeck extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params
        return {
            title: name
        }
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
                    <View>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.subtitle}>{`${cards} cards`}</Text>
                    </View>
                    <View>
                        <View>
                            <Button
                                title={'Add card'}
                                color={'#2067d8'}
                            />
                        </View>
                        <View style={styles.quizButton}>
                            <Button
                                title={'Quiz'}
                                color={'#f48042'}
                            />
                        </View>
                    </View>
                </View>
            )
        }
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
    title: {
        fontSize: 50,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 25,
        color: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
    },
    addCardButton: {
        width: 200,
    },
    quizButton: {
        width: 200,
        marginTop: 20,
    }
})