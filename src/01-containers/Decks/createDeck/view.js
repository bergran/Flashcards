import React, { PureComponent } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import {
    deckMergeInputAction,
    deckCleanFormAction
} from '../../../02-actions/form/formActions'
import Input from '../../../00-components/input'

const mapStateToProps = state => ({
    inputs: state.form.deck
})

@connect(mapStateToProps, {
    deckMergeInputAction
})
export default class CreateDeck extends PureComponent {
    render () {
        const { title } = this.props.inputs

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
                    onPress={() => alert('hey')}
                    disabled={!title.isValid}
                />
            </View>
        )
    }

    handleChange = (name, value, isValid) => {
        this.props.deckMergeInputAction(name, value, isValid)
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