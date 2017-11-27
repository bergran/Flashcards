import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

@connect()
export default class CreateDeck extends PureComponent {
    render () {
        return (
            <View>
                <Text>
                    Hello world
                </Text>
            </View>
        )
    }
}