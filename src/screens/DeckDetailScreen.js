import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { connect } from 'react-redux'

import TextButton from '../components/TextButton'
import { purple, white, coolblue, lightgray, gray } from '../utils/colors'
/**
 * React Component Screen - <DeckDetailScreen/>
 * 
 * Loads a new Stacked Screen - with back functionality
 * ==> Screen HAS the selected deck details -> Deck Title and no. of cards in deck.
 * 
 * ==> TWO buttons -
 * button -> Add card - lets user add a New Card to deck -> navigates to AddCard screen
 * button -> Start Quiz - lets user Start the Quiz for this deck -> navigates to StartQuiz screen
 * 
 */
class DeckDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Deck', 
  };
  
  state = {
    ready : false
  };

  toAddCard = ()=>{
    this.props.navigation.navigate('AddCard', { deckId :  this.props.selectedDeck.title})
  }

  toStartQuiz = () => {
    this.props.navigation.navigate('StartQuiz', { questions : this.props.selectedDeck.questions, deckTitle: this.props.selectedDeck.title })
  }

  render() {
    const { selectedDeck } = this.props
    return ( 
      <View style={styles.parent} >
              <View style={styles.containerStart}></View>
              { selectedDeck && (
                <View style={styles.containerMiddle}>
                    <View><Text style={[styles.textInp , {fontSize:30}]}> {selectedDeck.title} deck
                    </Text></View>
                    <View></View>
                    <View><Text style={[styles.textInp,{color:gray, fontSize:20}]}>
                            {selectedDeck.questions.length} cards
                        </Text></View>
              </View>)}
              <View style={styles.containerEnd}>
                <View><TextButton onPress={this.toAddCard} children="Add a card">
                </TextButton></View>
                <View>
                { selectedDeck.questions.length===0 ? (
                  <Text style={[styles.textInp, {fontSize:15}]}>You can Quiz yourself after you add cards!</Text>
                ) : (
                  <TextButton disabled={selectedDeck.questions.length===0} 
                      onPress={this.toStartQuiz} children="Start Quiz">
                  </TextButton>
                ) }
                </View>
              </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'space-evenly',
    alignItems: 'center', 
  },
  containerStart: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMiddle: {
    flex: 1,
    padding: 20,
    backgroundColor: coolblue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: purple,
    borderWidth: 3,
    margin: 20,
    padding: 20,
    alignSelf: "stretch" 
    
  },
  containerEnd: {
    flex: 3,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  textInp:
    { fontSize:20, color: purple}
})


function mapStateToProps ({selectedDeck}) {
  return {
    selectedDeck,
  }
}

export default connect(mapStateToProps)(DeckDetailScreen)