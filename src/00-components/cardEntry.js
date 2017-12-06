import React, { PureComponent } from 'react'
import { Button, Platform, StyleSheet, TouchableOpacity, Text, ScrollView, View } from 'react-native'

export default class CardEntry extends PureComponent {
    static defaultProps = {
        onDelete: () => null
    }

    render () {
        const { card, width } = this.props

        return (
            <View style={[styles.container]}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    ref={'scroll'}
                    onMomentumScrollEnd={this.handleEndScroll}
                >
                    <View style={[{width: width + 20}, styles.card]}>
                        <Text>{`Card: ${card.key + 1}`}</Text>
                        <Text>{`Question: ${card.question}`}</Text>
                        <Text>{`Answer: ${card.answer}`}</Text>
                    </View>
                    <View style={styles.button}>
                        <Text>Remove</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    handleEndScroll = e => {
        if (e.nativeEvent.contentOffset.x === 100) {
            this.props.onDelete(this.props.card.cardId)
        }
        this.refs.scroll.scrollTo({y: 0, x: 0})
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        marginTop: 17,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    card: {
        height: 150,
        padding: 15,
        flex: 1,
        justifyContent: 'space-around'
    },
    button: {
        height: 150,
        width: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.OS === 'ios' ? '#FFF' : 'red'
    }
})