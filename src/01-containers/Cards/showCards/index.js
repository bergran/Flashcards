import React, { PureComponent } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import CardEntry from '../../../00-components/cardEntry'
import { removeCard } from '../../../02-actions/cards/cardActions'

const mapStateToProps = (state, ownProps) => {
    const { navigation } = ownProps
    const { deckId } = navigation.state.params
    return {
        cards: Object.keys(state.card).filter(cardId =>
            !state.card[cardId].deleted && state.card[cardId].deckId === deckId)
            .map((cardId, index) => Object.assign({}, state.card[cardId], {cardId, key: index}))
    }
}

@connect(mapStateToProps, {
    removeCard
})
export default class ShowCards extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: `Editing ${navigation.state.params.deckTitle}`
    })

    render () {
        const { cards } = this.props
        return (
            <View style={styles.container}>
                <Text>Swipe left to remove card</Text>
                <FlatList
                    data={cards}
                    renderItem={(card, index) => {
                        return (
                            <CardEntry
                                card={card.item}
                                key={index}
                                width={300}
                                onDelete={this.handleDelete}
                            />
                        )
                    }}
                />
            </View>
        )
    }

    handleDelete = cardId => {
        const { cards, removeCard } = this.props
        const card = cards.filter(cardRaw => cardRaw.cardId === cardId).map(cardRaw => {
            return {
                [cardId]: {
                    deckId: cardRaw.deckId,
                    question: cardRaw.question,
                    answer: cardRaw.answer,
                    deleted: true
                }
            }
        })[0]
        removeCard(card)
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})