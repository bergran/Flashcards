import React, { PureComponent } from 'react'
import { FlatList, Text, View } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    const { navigation } = ownProps
    const { deckId } = navigation.state.params
    return {
        cards: Object.keys(state.card).filter(cardId => state.card[cardId].deckId === deckId)
            .map(cardId => Object.assign({}, state.card[cardId], {cardId}))
    }
}

@connect(mapStateToProps)
export default class ShowCards extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: `Editing ${navigation.state.params.deckTitle}`
    })

    render () {
        return (
            <View>
                <Text>Hello world</Text>
            </View>
        )
    }
}