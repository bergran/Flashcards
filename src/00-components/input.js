import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default class Input extends Component {
    static propTypes = {
        autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
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
        type: 'default',
        validations: []
    }

    state = {
        error: null
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
                        onChangeText={this.handleChange}
                    />
                </View>
            </View>
        )
    }

    componentDidMount () {
        const {
            name,
            defaultValue,
            onChange
        } = this.props
        onChange(name, defaultValue, this.handleValidations(defaultValue))
    }

    handleChange = text => {
        const {
            defaultValue,
            name,
            onChange
        } = this.props
        const [
            value,
            isValid
        ] = [
            text,
            this.handleValidations(text)
        ]

        onChange(name, value, isValid, value !== defaultValue)
    }

    handleValidations = value => {
        const {
            isRequired,
            defaultValue,
            validations
        } = this.props
        const isChanged = defaultValue !== value
        const [isValid, error] = this.isValid(value)
        this.setState({
            error: error
        })
        return (isRequired && isValid && validations.length > 0) ||
            (validations.length > 0 && isValid) || (!isRequired)
    }

    isValid = value => {
        const { validations } = this.props
        let [
            error,
            position,
            totalValidations,
            isValid,
            continueValidation
        ] = [null, 0, validations.length, !(validations.length > 0),validations.length > 0]

        while (continueValidation) {
            isValid = validations[position].isValid(value)
            error = isValid ? validations[position].error : null
            continueValidation = isValid && position < totalValidations - 1
            position++
        }

        return [isValid, error]
    }
}

const style = StyleSheet.create({
    container: {
      padding: 5
    },
    label: {
        color: '#4382e8',
        fontSize: 20
    },
    inputWrapper: {
        height: 50
    },
    input: {
        fontSize: 20,
        padding: 10
    },

})