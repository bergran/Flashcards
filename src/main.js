import app from './app'

export default async function getInit () {
    // Request

    // Load redux states

    const initialStates = {
        decks: {},
        cards: {},
        quiz: {}
    }

    // Call app
    app(initialStates)
}