import React from 'react';
import {View, ScrollView, StyleSheet,Text } from 'react-native';
import { connect } from 'react-redux'

import { receiveDecks, getDeck } from '../actions/index'
import { getDecksFromAPI , resetDATA} from  '../utils/UdaciCardsApi'
import { purple, white } from '../utils/colors'
import DeckComponent from '../components/DeckComponent';
import TextButton from '../components/TextButton';

/**
 * React Component Screen - <DecksScreen/>
 * 
 * Root Screen shown in the Left main TAB by default
 * 
 * Loads all the Decks. in a Scrollable View!
 * ==> Screen has various decks.
 * 
 * User can view the deck details by selecting the Cards!
 * 
 * ==> ONE link-button -
 * button -> <<noOfCards>> - lets user view deck details -> navigates to DeckDetails screen.
 * 
 * ==> ONE button -
 * button -> RESET DATA - lets user delete all data - except app default data
 * 
 */

class DecksScreen extends React.Component {
  static navigationOptions = {
    title: 'Decks'
  };

  state = {
    ready : false
  };

  componentDidMount () {
    const { dispatch } = this.props
    getDecksFromAPI()
      .then((decks) => { 
        dispatch(receiveDecks(decks.decks))
      })
      .then(() => this.setState(() => ({ready: true})))
  }

  goToDetail = (recivedDeckId) => {
    this.props.dispatch(getDeck(recivedDeckId))
    //this.props.navigation.navigate('DeckDetail', { deckId: recivedDeckId }) // no need now to send the ID as dispatch is already callled
    this.props.navigation.navigate('DeckDetail')
  }

  reset = () => {
    resetDATA()
      .then(() => {
        this.componentDidMount();
    }).catch((e)=>{
      console.log(e);
    })
  } 

  render() {
    const { decks, deckIds} = this.props
    return (
      <ScrollView style={styles.container}>

      <View style={{flex:1, alignSelf:'center'}}>
        <Text style={{alignSelf:"center", fontSize:30, color: purple}}>Your Decks</Text>
      </View>
        { (this.state.ready && decks && deckIds) && deckIds.map((aDeckId,key)=>{
          return (
            <DeckComponent title="" goToDetail={this.goToDetail} key={key} aDeck={ decks[aDeckId] }/>
          )
        })}
        <View style={{flex:1, alignSelf:'center'}}>
          <TextButton onPress={this.reset} children={'Reset data'}></TextButton>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  }})

function mapStateToProps ({decks, selectedDeck}) {
  if(decks!== undefined) {
    return { decks, deckIds: Object.keys(decks), selectedDeck }
  }
  return { decks, deckIds: [] , selectedDeck }
}

export default connect(mapStateToProps)(DecksScreen)