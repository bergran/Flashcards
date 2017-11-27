import React, { PureComponent } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import Proptypes from 'prop-types'
import { capitalize } from '../../utils/tools'


class DeckCard extends PureComponent {
    static propTypes = {
        deck: Proptypes.shape({
            title: Proptypes.string,
            cards: Proptypes.number
        })
    }

    render () {
        const {
            deck
        } = this.props
        return (
            <View key={deck.id} style={styles.deckCardContainer}>
                <Text style={styles.deckTitle}>{ capitalize(deck.title) }</Text>
                <Text style={styles.deckCards}>{ deck.cards } cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckCardContainer: {
        backgroundColor: '#FFF',
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    deckTitle: {
        fontSize: 25
    },
    deckCards: {
        color: 'rgba(0, 0, 0, 0.5)'
    }
})

export default DeckCard