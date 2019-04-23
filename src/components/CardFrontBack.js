import React from 'react'
import { Alert, View, StyleSheet , Text, TouchableOpacity } from 'react-native'
import { purple , red, green, lightgray, white} from '../utils/colors'

/**
 * React Component - <CardFrontBack/>
 * 
 * A CHILD of <StartQuizScreen/>
 */

class CardFrontBack extends React.Component {

    toAnswer = () => {
        Alert.alert(
            'About to Peek!',
            'Sure you wanna peek?',
            [
                {text: 'NO', style: 'cancel'},
                {text: 'YES', onPress: () => {
                    this.props.disableCorrect({
                        correctDisabled: false,
                        show: 'answer'
                        });
                    }
                },
            ],
            {cancelable: false}
          );  
    };
    toQuestion = () => {
        // this.props.disableCorrect({
        //     correctDisabled: true,
        //     show: 'question'
        // }) 
        this.props.disableCorrect({
            correctDisabled: false,
            show: 'question'
        })    
    };

    render() {
        const  { aCard, showChild } = this.props;
        const question = aCard.card.question;
        const answer = aCard.card.answer;
        return (
            <View style={styles.container}>
            { ( showChild ==='question' )  ? (
            <View style={{flex:1, justifyContent: 'space-between'}}>
                <Text style={{ flex: 0.25, color: green, fontSize: 15}}>Question: </Text>
                <Text style={{flex:1, alignSelf: 'stretch', color: purple, fontSize: 25}}>{question}</Text>
                <TouchableOpacity style={{flex: 0.5,justifyContent: 'center'}} onPress={this.toAnswer}>
                    <Text style={{color: red, fontSize: 15}}>Peek at answer</Text>
                </TouchableOpacity>
            </View> 
            ) : (
                <View style={{flex:1, justifyContent: 'space-between'}}>
                    <Text style={{flex: 0.25, color: green, fontSize: 15}}>Answer: </Text>
                    <Text style={{flex:1, alignSelf: 'stretch', color: purple, fontSize: 20}}>{answer}</Text>
                    <TouchableOpacity style={{flex: 0.5,justifyContent: 'center'}} onPress={this.toQuestion}>
                        <Text style={{color: purple, fontSize: 15}}>Back to question</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })

export default CardFrontBack;