import React, { PureComponent } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Input from '../../../00-components/input'
import { connect } from 'react-redux'
import {
    cardMergeInputAction,
    cardCleanFormAction
} from "../../../02-actions/form/formActions";
import { addCard } from "../../../02-actions/cards/cardActions";

const mapStateToProps = state => ({
    inputs: state.form.card
})

@connect(mapStateToProps, {
    addCard,
    cardCleanFormAction,
    cardMergeInputAction
})
export default class AddCard extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add card'
        }
    }
    
    render () {
        const { inputs } = this.props

        return (
            <View style={style.container}>
                <View
                    style={style.inputsContainer}
                >
                    <Input
                        name={'question'}
                        label={'Question'}
                        placeholder={'Add question'}
                        value={inputs.question.value}
                        onChange={this.handleChange}
                        isRequired
                        validations={[
                            {
                                isValid: value => value.length > 0,
                                error: 'This field is mandatory',
                                success: 'Nice, you got this!'
                            }
                        ]}
                    />
                </View>
                <View
                    style={style.inputsContainer}
                >
                    <Input
                        name={'answer'}
                        label={'Answer'}
                        placeholder={'Add answer'}
                        value={inputs.answer.value}
                        onChange={this.handleChange}
                        isRequired
                        validations={[
                            {
                                isValid: value => value.length > 0,
                                error: 'This field is mandatory',
                                success: 'Nice, you got this!'
                            }
                        ]}
                    />
                </View>
                <View
                    style={[style.inputsContainer, style.button]}
                >
                    <Button
                        title={'Add card'}
                        color={'#2067d8'}
                        disabled={!this.handleIsValid()}
                        onPress={this.handlePress}
                    />
                </View>
            </View>
        )
    }

    handleIsValid = () => {
        const { inputs } = this.props
        const inputsNames = Object.keys(inputs)
        return inputsNames.filter(inputName =>
            inputs[inputName].isValid).length === inputsNames.length
    }

    handlePress = () => {
        const { addCard, cardCleanFormAction, inputs, navigation } = this.props
        const { deckId } = navigation.state.params

        // add card
        addCard(Object.assign({}, Object.keys(inputs).reduce((prevState, inputName) => {
            return Object.assign({}, prevState, {[inputName]: inputs[inputName].value})
            }, {}), {deckId}
        ))

        // clean form
        cardCleanFormAction()
    }

    handleChange = (name, value, isValid) => {
       this.props.cardMergeInputAction(name, value, isValid)
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    inputsContainer: {
        width: 300
    },
    button: {
        marginTop: 100
    }
})