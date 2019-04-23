/**
 * ALL Redux REDUCERS
 */
import { RECEIVE_DECKS, GET_DECK, ADD_DECK, ADD_DECK_CARD } from '../actions'


function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
    const newState = {
      decks:action.decks,
      selectedDeck: {}
    }
      return newState;
    case GET_DECK :
      const bla = {
        decks:state.decks,
        selectedDeck : state.decks[action.deckTitle]
      }
      return bla;


    case ADD_DECK:
      const newDeck = {
          title: action.deckTitle,
          questions: []
      }
      return {
        decks: {
          ...state.decks,
        [action.deckTitle]: newDeck
      }, selectedDeck: newDeck
    }

    case ADD_DECK_CARD :
        const aDeck  = state.decks[action.deckTitle]
        aDeck.questions.push(action.card)
        
        const data = {
          decks: {
            ...state.decks,
            [action.deckTitle]: aDeck
          }, 
          selectedDeck: aDeck
        }
        return data

    default :
      return state
  }
}

export default decks