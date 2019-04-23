import React from 'react';
import { TextInput, KeyboardAvoidingView, View, StyleSheet,Text } from 'react-native';
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation';

import { addDeckCard } from '../actions/index'
import { addCardToDeck } from  '../utils/UdaciCardsApi'
import { purple, white, red, green, lightgray } from '../utils/colors'
import TextButton from '../components/TextButton';

/**
 * React Component Screen - <AddCardScreen/>
 * 
 * Loads a new Stacked Screen - with back functionality
 * -> Screen has a FORM
 * ==>Two text type input fields and a SUBMIT button
 * Lets user add a new Card to the selected deck
 * 
 * User will be routed to DeckDetail screen after successfull adding of Card with Question and Answer.
 */
const popAction = StackActions.pop({
  n: 2,
});

class AddCardScreen extends React.Component {

    state= {
      deckTitle: this.props.navigation.state.params.deckId,
      question:'',
      answer: '',
      questionErrorMsg: '',
      answerErrorMsg: '',
      errorMsg:''
    }

    handleSubmit = () => {
      const { dispatch, navigation } = this.props
      const { deckTitle, question, answer } = this.state 
      const trimA = answer.trim()
      const trimQ = question.trim()
      addCardToDeck(deckTitle, {answer: trimA, question: trimQ })
        .then(()=>{
          dispatch(addDeckCard(deckTitle, {answer: trimA, question: trimQ }))
        })
        .then(()=>{
          navigation.dispatch(StackActions.pop({n: 2}) );
          navigation.dispatch(StackActions.push({routeName:'DeckDetail'}) )  //navigation.push('DeckDetail')
        })
        .catch(()=>this.setState(()=>({errorMsg: 'Could not add the card!'})))
    }

    handleInput = (inputType, text) => {
      const reg = /^\s+$/
      var newState;
      if(text==="") {
        newState = {
          [inputType+'ErrorMsg'] : `Please enter the ${inputType}`,
          [inputType] : text, 
        }
      }
      else if(reg.test(text)) {
        this.setState(()=>({
          [inputType+'ErrorMsg']:`Please real values for ${inputType}`, [inputType] : text
        }))
      }
      else if(text!==this.state[inputType]) {
        newState = {
          [inputType+'ErrorMsg'] : '' ,
          [inputType] : text,
        }
      } 
      this.setState(newState)
    }

    render() {
      const { deckTitle, question, answer, errorMsg, questionErrorMsg, answerErrorMsg } = this.state
        return (
        <KeyboardAvoidingView style={styles.parent} behavior="padding" keyboardVerticalOffset="40" enabled>
            <View style={styles.containerStart}>
              <Text style={{alignSelf:"center", fontSize:20, color: purple}}>Add a new card to</Text>
              <Text style={{alignSelf:"center", fontSize:30, color: purple}}>{deckTitle} deck</Text>
            </View>
            <View style={styles.container}>
              <TextInput name='question' value={question} style={styles.textInp} 
                  onChangeText={(text)=>{this.handleInput('question',text)}} placeholder="Enter a question..."  >
              </TextInput>
              <Text style={{color:red}}>{questionErrorMsg}</Text>
              </View>
              <View style={styles.container}>
                <TextInput name='answer' value={answer} style={styles.textInp}  
                   onChangeText={(text)=>{this.handleInput('answer',text)}} placeholder="Enter the answer..."  >
                </TextInput>
                <Text style={{color:red}}>{answerErrorMsg}</Text>
            </View>
            <View style={styles.containerEnd}>
                <Text style={{color:red}}>{errorMsg}</Text>
                <TextButton disabled={answer==="" || question==="" || questionErrorMsg!=="" || answerErrorMsg!==""} 
                onPress={this.handleSubmit} children="Add this card" style={{backgroundColor:green}}>
                </TextButton>
            </View>
        </KeyboardAvoidingView>
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
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: purple,
    borderWidth: 3,
    margin: 20,
    padding: 20,
    alignSelf: "stretch" 
    
  },
  containerStart: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'flex-end',
  },
  containerEnd: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
  },
  textInp:
    {height: 40, fontSize:20, color: purple}
})
  
  
export default connect()(AddCardScreen)