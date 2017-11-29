import React, { PureComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
    deck: state.deck[ownProps.navigation.state.params.id]
})

@connect(mapStateToProps)
export default class entryDeck extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params
        return {
            title: name
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <Text>Hello world</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20
    }
})