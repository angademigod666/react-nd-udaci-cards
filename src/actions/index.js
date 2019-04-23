/**
 * ALL Redux ACTIONS
 */
export const RECEIVE_DECKS = 'RECEIVE_ALL_DECKS'
export const GET_DECK = 'GET_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_DECK_CARD = 'ADD_DECK_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function getDeck (deckTitle) {
  return {
    type: GET_DECK,
    deckTitle
  }
}

export function addDeck (deckTitle) {
  return {
    type: ADD_DECK,
    deckTitle
  }
}

export function addDeckCard (deckTitle,card) {
  return {
    type: ADD_DECK_CARD,
    deckTitle,
    card
  }
}