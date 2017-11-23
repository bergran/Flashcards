import React, { PureComponent } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Constants } from 'expo'

export default class FlashCardStatusBar extends PureComponent {
    render () {
        return (
            <View style={{backgroundColor: '#2067d8', height: Constants.statusBarHeight}}>
                <StatusBar
                    translucent={true}
                    barStyle={'light-content'}
                />
            </View>
        )
    }
}