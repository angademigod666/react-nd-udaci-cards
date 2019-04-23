import { AsyncStorage } from 'react-native'

const USER_DECK = "angademigod666"
const dummyDecks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    Angular: {
        title: 'Angular',
        questions: [
          {
            question: 'What is Angular?',
            answer: 'A Framework for managing user interfaces'
          },
          {
              question: 'What is a component?',
              answer : 'Its a view'
          }
        ]
      }
}

export function checkData() {
    return AsyncStorage.getItem(USER_DECK)
    .then(JSON.parse)
        .then((decks)=>{
            if(decks===null) {
                return AsyncStorage.setItem(USER_DECK,JSON.stringify(dummyDecks))
            }
        })
}

export function resetDATA() {
    return AsyncStorage.removeItem(USER_DECK)
        .then(()=>{
            return AsyncStorage.setItem(USER_DECK,JSON.stringify(dummyDecks))
        })
    
}

// return all of the decks along with their titles, questions, and answers.
export function getDecksFromAPI() {
    return AsyncStorage.getItem(USER_DECK)
    .then(JSON.parse)
    .then((objDataDecks)=>{
        const newOBj = { decks: objDataDecks, selectedDeck:null}
        return newOBj;
    })
}

// take in a single id argument and return the deck associated with that id. 
export function getDeckDetails (key) {
    return AsyncStorage.getItem(USER_DECK)
        .then(JSON.parse)
        .then((decksFROMDB)=>{
            const newOBj = { selectedDeck: decksFROMDB[key]};
            return newOBj;
        })
}


//addCardToDeck
export function addCardToDeck (deckTitle,card) {

   return AsyncStorage.getItem(USER_DECK)
    .then(JSON.parse)
    .then((decks)=>{
        decks[deckTitle].questions.push(card)
        const newQuesitions = decks[deckTitle].questions
        const newBlas = {
            ...decks,
            [deckTitle]: {
                    title: deckTitle,
                    questions: newQuesitions
            }
        }
        AsyncStorage.mergeItem(USER_DECK, JSON.stringify(newBlas))
        return AsyncStorage.getItem(USER_DECK)
        .then(JSON.parse)
        .then((objDataDecks)=>{
            const newOBjRet = { decks: objDataDecks, selectedDeck: objDataDecks[deckTitle] }
            return newOBjRet;
        })

    })
}








// saveDeckTitle
// take in a single title argument and add it to the decks. 

export function saveDeckTitle (deckTitle) {
    return AsyncStorage.getItem(USER_DECK)
    .then(JSON.parse)
    .then((decks) => { 
        const newDeck = {
            title: deckTitle,
            questions: []
        }
        AsyncStorage.mergeItem(USER_DECK, JSON.stringify({
            ...decks,
            [deckTitle]: newDeck
        }))
        return AsyncStorage.getItem(USER_DECK)
        .then(JSON.parse)
        .then((objDataDecks)=>{
            const newOBjRet = { decks: objDataDecks, selectedDeck:null}
            //alert("getDecksFromAPI---> "+JSON.stringify(newOBj))
            return newOBjRet;
        })
    })
}