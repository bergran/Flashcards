import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Text, View } from 'react-native'
import Input from '../../../00-components/input'



@connect()
export default class CreateDeck extends PureComponent {
    state = {
        title: {
            value: '',
            isValid: null
        }
    }

    render () {
        const { title } = this.state
        return (
            <View style={style.container}>
                <Text style={style.title}>Create Deck</Text>
                <Input
                    autoCapitalize
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
                />
            </View>
        )
    }

    handleChange = (name, value, isValid) => {
        this.setState({
            [name]: {
                value,
                isValid
            }
        })
    }
}

const style = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#FFF',
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    }
})