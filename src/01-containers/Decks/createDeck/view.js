import React, { PureComponent } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import {
    deckMergeInputAction,
    deckCleanFormAction
} from '../../../02-actions/form/formActions'
import { addDeck } from '../../../02-actions/deck/deckActions'
import Input from '../../../00-components/input'

const mapStateToProps = state => ({
    inputs: state.form.deck
})

@connect(mapStateToProps, {
    addDeck,
    deckCleanFormAction,
    deckMergeInputAction
})
export default class CreateDeck extends PureComponent {
    render () {
        const { title } = this.props.inputs
        const isValid = this.handleValidations()
        return (
            <View style={style.container}>
                <Text style={style.title}>Create Deck</Text>
                <Input
                    autoCapitalize={'sentences'}
                    placeholder={'Insert input title'}
                    isRequired
                    label={'Title'}
                    name={'title'}
                    onChange={this.handleChange}
                    value={title.value}
                />
                <Button
                    title={'Create'}
                    onPress={this.handleSubmit}
                    disabled={!isValid}
                />
            </View>
        )
    }

    handleValidations = () => {
        const { inputs } = this.props
        return Object.keys(inputs).filter(inputName =>
            inputs[inputName].isValid).length === Object.keys(inputs).length
    }

    handleChange = (name, value, isValid) => {
        this.props.deckMergeInputAction(name, value, isValid)
    }

    handleSubmit = () => {
        if (this.handleValidations()) {
            // create deck
            this.props.addDeck(this.props.inputs.title.value)

            // clean form
            this.props.deckCleanFormAction()

            // go list decks
            this.props.navigation.navigate('Decks')
        }
    }
}

const style = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'flex-start'
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    }
})