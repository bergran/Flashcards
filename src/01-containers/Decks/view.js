import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

class ShowDecksView extends PureComponent {
    render () {
        return (
            <Text>Hello</Text>
        )
    }
}

export default connect()(ShowDecksView)