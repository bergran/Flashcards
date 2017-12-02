import React, { PureComponent } from 'react'
import {  Button, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default class QuizResults extends PureComponent {
    static propTypes = {
        answers: PropTypes.arrayOf(PropTypes.string),
        onBack: PropTypes.func
    }

    static defaultProps = {
        onBack: () => null,
        onReset: () => null
    }

    render () {
        const { answers } = this.props
        const success = answers.filter(answer => answer === 'correct').length

        const successPercent = Math.round((success / answers.length) * 1000) / 10
        let colorPercent, message
        if (successPercent < 50) {
            [ colorPercent, message] = ['#d11508', 'You need to study, try again ^^']
        } else if (successPercent < 60) {
            [ colorPercent, message] = ['#ed7a00', 'Nice! you pass quiz but remenber to study a little more']
        } else {
            [ colorPercent, message] = ['#5dbf39', 'Good job! you got it, but dont forget to study ^^']

        }
        return (
            <View
                style={styles.container}
            >
                <View>
                    <Text
                        style={[styles.successPercent, {color: colorPercent}]}
                    >{`${successPercent}% success`}</Text>
                    <Text
                        style={styles.messageText}
                    >
                        {message}
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <Button
                        title={'Try again'}
                        color={'#f48042'}
                        onPress={this.handleReset}
                    />
                    <Button
                        title={'Go back'}
                        color={'#2067d8'}
                        onPress={this.handleBack}
                    />
                </View>
            </View>
        )
    }

    handleBack = () => this.props.onBack()

    handleReset = () => this.props.onReset()

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    successPercent: {
        fontSize: 30,
        textAlign: 'center'
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.25)'
    },
    buttons: {
        width: 200
    }
})