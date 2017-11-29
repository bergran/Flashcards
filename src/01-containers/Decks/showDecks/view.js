import React, { PureComponent } from 'react'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../02-actions/deck/deckActions'
import DeckCard from '../../../00-components/deckCard'

class ShowDecksView extends PureComponent {
    render () {
        const {
            decks,
            cards,
        } = this.props
        const deckList = Object.keys(decks).map(deckId => ({
            key: deckId,
            id: deckId,
            title: decks[deckId].title,
            cards: Object.keys(cards).filter(cardId => cards[cardId].deckId === deckId).length
        }))
        return (
            <View>
                <FlatList
                    data={deckList}
                    renderItem={deck => {
                        return (<DeckCard
                            deck={deck.item}
                            onPress={this.handlePress}
                        />)
                    }}
                />
            </View>
        )
    }

    handlePress = id => {
        const { navigation } = this.props
        navigation.navigate('DeckEntry', {id, name: this.props.decks[id].title})
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