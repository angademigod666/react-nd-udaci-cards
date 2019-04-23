import React from 'react';
import { TextInput, View, StyleSheet,Text } from 'react-native';
import { connect } from 'react-redux'

import { addDeck } from '../actions/index'
import { saveDeckTitle } from  '../utils/UdaciCardsApi'
import { purple, white, red, green, lightgray } from '../utils/colors'
import TextButton from '../components/TextButton';


/**
 * React Component Screen - <AddDeckScreen/>
 * 
 * Loads in a seperate TAB via TAB Navigator 
 * ==> Screen with a FORM
 * ==> One text type input field - for the Deck Title and a SUBMIT button
 * Lets user add a New Deck with 0 cards to begin with to the selected deck
 * 
 * User will be routed to new DeckDetail screen after successfull add deck, showing 0 cards initially!
 * 'Start Quiz' won't be available for this newly added deck, since there are no cards
 */
class AddDeckScreen extends React.Component {

    state= {
      deckTitle: '',
      errorMsg: '',
    }

    
    handleInput = (text) => {
      const reg = /^\s+$/
      if(text!=="") {
        this.setState(()=>({
          deckTitle: text, errorMsg:''
        }))
      }
      if(reg.test(text)) {
        this.setState(()=>({
          errorMsg:'Please real values!', deckTitle : text
        }))
      }
      else if(text === ""){
        this.setState(()=>({
          errorMsg:'Please enter a deck title!', deckTitle : ''
        }))
      }
    }

    handleSubmit = () => {
      const { dispatch } = this.props
      const { deckTitle } = this.state 
      const trimeedTitle = deckTitle.trim()
      saveDeckTitle(trimeedTitle)
        .then(()=>{
          this.setState((curr)=>{
            curr.errorMsg = '';
            curr.deckTitle = '';
            dispatch(addDeck(trimeedTitle));
            return curr;
          })
        })
        .then(()=>{
          this.props.navigation.navigate('DeckDetail')
        })
        .catch(()=>this.setState(()=>({deckTitle:'',errorMsg: 'Could not add the deck!'})))
    }


    render() {
      const {errorMsg, deckTitle} = this.state
        return (
        <View style={styles.parent}>
            <View style={styles.containerStart}>
              <Text style={{alignSelf:"center", fontSize:30, color: purple}}>Add a new deck</Text>
            </View>
            <View style={styles.container}>
              <TextInput name='deckTitle' value={deckTitle} style={styles.textInp} 
                  onChangeText={(text)=>{this.handleInput(text)}} placeholder="Enter a new deck title..."  >
              </TextInput>
              <Text style={{color:red}}>{errorMsg}</Text>
              </View>
            <View style={styles.containerEnd}>
                <TextButton disabled={ errorMsg!=="" || deckTitle==="" } 
                onPress={this.handleSubmit} children="Add this deck" style={{backgroundColor:green}}>
                </TextButton>
            </View>    
        </View>
        )
    }
}


const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'flex-start',
    alignItems: 'center', 
    
  },
  container: {
    flex: 0.5,
    padding: 20,
    backgroundColor: lightgray,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderRadius: 10,
    borderColor: purple,
    borderWidth: 3,
    margin: 20,
    padding: 20,
    alignSelf: "stretch" 
    
  },
  containerStart: {
    flex: 0.5,
    backgroundColor: white,
    alignItems: 'flex-end',
  },
  containerEnd: {
    flex: 2,
    backgroundColor: white,
    alignItems: 'center',
  },
  textInp:
    {height: 40, fontSize:20, color: purple}
})

  export default connect()(AddDeckScreen)