import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default class Input extends Component {
    static propTypes = {
        autoCapitalize: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        defaultValue: PropTypes.string,
        disabled: PropTypes.bool,
        isRequired: PropTypes.bool,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        password: PropTypes.bool,
        type: PropTypes.string,
        validations: PropTypes.array,
        value: PropTypes.string.isRequired,
    }

    static defaultProps = {
        autoCapitalize: true,
        autoCorrect: false,
        defaultValue: '',
        onChange: () => null,
        password: false,
        type: 'default'
    }

    render () {
        const {
            autoCapitalize,
            autoCorrect,
            label,
            disabled,
            placeholder,
            value,
            type,
            password
        } = this.props
        return (
            <View style={style.container}>
                <Text style={style.label}>{ label }</Text>
                <View style={style.inputWrapper}>
                    <TextInput
                        style={style.input}
                        autoCapitalize={autoCapitalize}
                        placeholder={placeholder}
                        autoCorrect={autoCorrect}
                        value={value}
                        editable={!disabled}
                        secureTextEntry={password}
                        keyboardType={type}
                        onChange={this.handleChange}
                    />
                </View>
            </View>
        )
    }

    handleChange = e => {
        e.preventDefault()
        const {
            defaultValue,
            name,
            onChange
        } = this.props
        const value = e.target.value
        const isValid = true
        onChange(name, value, isValid, value !== defaultValue)
    }
}

const style = StyleSheet.create({
    container: {
      padding: 5
    },
    label: {
        color: '#4382e8',
        fontSize: 25
    },
    inputWrapper: {
        height: 150
    },
    input: {
        fontSize: 20,
        padding: 5
    },

})