import React, { PureComponent } from 'react'
import { StatusBar, View } from 'react-native'
import { Constants } from 'expo'

export default class FlashCardStatusBar extends PureComponent {
    static defaultProps = {
        backgroundColor: '#2067d8'
    }

    render () {
        const { backgroundColor } = this.props
        return (
            <View style={{backgroundColor , height: Constants.statusBarHeight}}>
                <StatusBar
                    translucent={true}
                    barStyle={'light-content'}
                />
            </View>
        )
    }
}