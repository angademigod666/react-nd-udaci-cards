import React from 'react';
import { Alert, View, StyleSheet,Text } from 'react-native';

import { purple, white, red , blue, green, coolblue} from '../utils/colors'
import TextButton from '../components/TextButton';
import CardFrontBack from '../components/CardFrontBack';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

/**
 * React Component Screen - <QuizScreen/>
 * 
 * Loads a new Stacked Screen - with back functionality
 * 
 * ==> Screen HAS: 
 *  --> Quiz status -> index of Question, total questions, correct so far 
 * 
 *  --> the CARD shown in Question state has:
 *  Question description, 
 *  --> and a LINK to view the ANSWER (User can click on it! BUT...)
 *  This will disable the Correct Button then show the:
 *  Answer description,
 *  --> and a LINK to view back the ANSWER.
 * 
 * ==> AT THE END there are - TWO buttons -
 * button -> Correct - notes user's choice and moves to the next question
 * button -> InCorrect - notes user's choice, and moves to the next question
 * 
 * After the QUIZ ends:
 * >> the RESULT is displayed with percentage scores,
 * >> AN option to restart the quiz
 * >> the user can obviously at any time go back to the previous Deck details screen!!.
 * 
 * >> A NOTIFICATION gets triggered after the user completes a quiz.! - END QUIZ
 * >> Existing notifications gets cleared and then -> setLocalNotification
 * 
 */
class QuizScreen extends React.Component {
    static navigationOptions = {
      title: 'Quiz',
    };
    
    state = {
      correctCount: 0,
      incorrectCount:0,
      correctDisabled: false,
      showChild: 'question',
      difficulty: 'easy',
      allCards: this.props.navigation.state.params.questions,
      selectedCard: {
        index: 0, 
        card: this.props.navigation.state.params.questions[0]
      },
      show: 'quiz'
    }

    endQuiz = (answer) => {
      this.setState((curr)=>({[answer]:curr[answer]-(-1), show:'result' }))
      clearLocalNotification()
      .then(setLocalNotification)
    }

    handleCorrectInCorrect=(answer)=>{
      this.setState(()=>({
        correctDisabled: false, // se this..??
        showChild:'question'
      }))
      const {selectedCard, allCards } = this.state;

      if(selectedCard.index+1 < allCards.length) {
        this.setState((curr)=>({
          [answer]:curr[answer]-(-1),
          selectedCard: {
            index:curr.selectedCard.index-(-1), 
            card:curr.allCards[curr.selectedCard.index-(-1)]}
        }))
      }
      else {
        this.endQuiz(answer);
      }
    };

    setHard = () => {
      this.setState(()=>({
        difficulty: 'hard'
      }))
    }

    restartQuiz = () => {
      this.setState(()=>({
        correctCount: 0,
        incorrectCount:0,
        correctDisabled: false,
        showChild:'question',
        selectedCard: {
          index: 0, 
          card: this.props.navigation.state.params.questions[0]
        },
        show: 'quiz'
      }))
    }

    disableCorrect=({correctDisabled,show})=>{
      this.setState(()=>({
        correctDisabled: correctDisabled,
        showChild: show
      }));
    }

    render() {
      const {show, selectedCard, allCards, correctCount, 
        incorrectCount, correctDisabled, showChild} = this.state;

      const deckTitle = this.props.navigation.state.params.deckTitle;
        return (
        <View style={GlobalStyles.parent}>
        {show==='quiz' && ( 
          <View style={GlobalStyles.parent}>
            <View style={GlobalStyles.containerStart}>
              <Text style={GlobalStyles.textInp}> Quiz Started </Text>
              <Text>Correct {correctCount} of {(allCards.length)}</Text>
              <Text>Card {(selectedCard.index)-(-1)} of {(allCards.length)}</Text>
            </View> 
            {selectedCard && (
              <View style={GlobalStyles.container}>
                <CardFrontBack showChild={showChild} 
                    disableCorrect={this.disableCorrect} aCard={selectedCard} />
              </View>
            )}

            <View style={GlobalStyles.containerEnd}>
                {!correctDisabled && (<View><TextButton style={{backgroundColor:green}} onPress={()=>this.handleCorrectInCorrect("correctCount")} children="Correct">
                </TextButton></View>)}
                <View><TextButton style={{backgroundColor: red}} onPress={()=>this.handleCorrectInCorrect("incorrectCount")} children="Incorrect">
                </TextButton></View>
            </View>
        </View>
        )}
          {show==='result' && ( 
            <View style={GlobalStyles.parent}>
              <View style={GlobalStyles.containerStart}></View>
              <View style={[GlobalStyles.container, {justifyContent: 'center' , alignItems:'center'}]}>
                <View><Text style={[GlobalStyles.textInp,{fontSize:20}]}>{deckTitle} quiz results</Text></View>
                <View><Text style={[GlobalStyles.textInp, {color: green}]}>Correct: {correctCount}/{allCards.length}</Text></View>
                <View><Text style={[GlobalStyles.textInp, {color: red}]}>Incorrect: {incorrectCount}/{allCards.length}</Text></View>
                <View><Text style={[GlobalStyles.textInp, {color: purple}]}>
                      Total: { (correctCount/allCards.length*100).toString().substr(0,5) }% correct</Text>
                </View>
              </View>
              <View style={GlobalStyles.containerEnd}>
                <TextButton onPress={this.restartQuiz} children="Restart the Quiz">
                </TextButton>
                </View>
            </View>
          )}
        </View>
        )
    }
}

const GlobalStyles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'space-evenly',
    alignItems: 'center', 
    
  },
  container: {
    flex: 2,
    padding: 20,
    backgroundColor: coolblue,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    borderRadius: 10,
    borderColor: purple,
    borderWidth: 3,
    margin: 20,
    padding: 20,
    alignSelf: "stretch" 
    
  },
  containerStart: {
    flex: 0.6,
    backgroundColor: white,
    alignItems: 'center',
  },
  containerEnd: {
    flex: 2,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInp:
    {height: 40, fontSize:20, color: purple}
})

  
export default QuizScreen