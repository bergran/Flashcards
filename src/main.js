import app from './app'

export default function getInit () {
    // Request

    // Load redux states
    const initialStates = {
        deck: {},
        card: {},
        quiz: {}
    }

    // Call app
    return app(initialStates)
}