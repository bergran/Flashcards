import { getDecks } from './asyncStorage/decks'


export default function getInitialData (callback = () => ({}), error = () => ({})) {
    return Promise.all([
        getDecks()
    ]).then(callback).catch(error)
}