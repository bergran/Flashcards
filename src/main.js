import app from './app'
import getInitialData from "./03-services/getData";

export default getInitialData(
    function getInit (data) {
        // Request
        // Load redux states
        console.log('eqrer')
        const initialStates = {
            deck: {},
            card: {},
            quiz: {}
        }

        // Call app
        return app(initialStates)
    }
)