import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TextInput, View } from 'react-native'

export default class Input extends Component {
    static propTypes = {
        autoCapitalize: PropTypes.boolean,
        autoCorrect: PropTypes.boolean,
        defaultValue: PropTypes.string.isRequired,
        disabled: PropTypes.boolean,
        isRequired: PropTypes.boolean,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        password: PropTypes.boolean,
        type: PropTypes.string,
        validations: PropTypes.arrayOf(PropTypes.shape({
            isValid: PropTypes.func,
            error: PropTypes.string,
            success: PropTypes.string
        })),
        value: PropTypes.string.isRequired,
    }

    static defaultProps = {
        autoCapitalize: true,
        autoCorrect: false,
        password: false,
        type: 'default'
    }

    render () {
        const {
            autoCapitalize,
            autoCorrect,
            label,
            disabled,
            name,
            placeholder,
            value,
            type,
            password
        } = this.props
        return (
            <View>
                <Text>{ label }</Text>
                <View>
                    <TextInput
                        autoCapitalize={autoCapitalize}
                        autoCorrect={autoCorrect}
                        value={value}
                        editable={!disabled}
                    />
                </View>
            </View>
        )
    }
}