import * as types from '../../../constants/forms/constants'

// DECK Actions
export const deckMergeInputAction = (name, value, isValid) => ({
    type: types.DECK_MERGE_INPUT,
    name,
    value,
    isValid
})

export const deckCleanFormAction = () => ({
    type: types.DECK_CLEAN_FORM
})

// CARD Actions

export const cardMergeInputAction = (name, value, isValid) => ({
    type: types.CARD_MERGE_INPUT,
    name,
    value,
    isValid
})

export const cardCleanFormAction = () => ({
    type: types.CARD_CLEAN_FORM
})