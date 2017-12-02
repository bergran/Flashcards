import React, { PureComponent } from 'react'
import {
    Button,
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { capitalize } from '../../../../utils/tools'
import PropTypes from 'prop-types'


export default class QuizGame extends PureComponent {
    static propTypes = {
        card: PropTypes.shape({
            question: PropTypes.string,
            answer: PropTypes.string,
        }),
        answersDone: PropTypes.number.isRequired,
        cards: PropTypes.number.isRequired,
        onAddAnswer: PropTypes.func,
        onCancel: PropTypes.func,
        onFinish: PropTypes.func
    }

    static defaultProps = {
        onAddAnswer: () => null,
        onCancel: () => null,
        onFinish: () => null
    }

    state = {
        show: 'question',
        noShow: 'answer'
    }

    render () {
        const { card, answersDone, cards } = this.props
        const { show, noShow } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{`${answersDone}/${cards} cards`}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>{card[show]}</Text>
                    <TouchableOpacity
                        onPress={this.handleSwitch}
                    >
                        <Text style={styles.noShow}>{capitalize(noShow)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                    <View
                        style={styles.button}
                    >
                        <Button
                            color={'#3fc433'}
                            title={'Correct'}
                            style={{fontSize: 20}}
                            onPress={this.handleAddAnswer('correct')}
                        />
                    </View>
                    <View
                        style={[styles.button, {marginTop: 20}]}
                    >
                        <Button
                            color={'#ba1f1f'}
                            title={'Incorrect'}
                            onPress={this.handleAddAnswer('incorrect')}
                        />
                    </View>
                </View>
            </View>
        )
    }

    componentWillUnmount () {
        // works to back
        const {cards, answersDone, onCancel} = this.props
        answersDone < cards && onCancel()
    }

    handleSwitch = () => {
        const { show, noShow } = this.state
        this.setState({
            show: noShow,
            noShow: show
        })
    }

    handleAddAnswer = answer => () => {
        const { answersDone, cards, onAddAnswer, onFinish } = this.props
        onAddAnswer(answer)
        answersDone === cards && onFinish()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20
    },
    info: {
        height: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 40,
        textAlign: 'center',
        width: 200,
        height: 60
    },
    noShow: {
        fontSize: 20,
        textAlign: 'center',
        borderWidth: 1,
        color: 'rgba(0, 0, 0, 0.25)',
        borderColor: 'rgba(0, 0, 0, 0.25)',
        width: 100,
        height: 30
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        height: 100
    },
    button: {
        width: 200,
        borderRadius: 40
    }
})