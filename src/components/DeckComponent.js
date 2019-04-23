import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple , white, coolblue, lightgray, lightPurp, gray} from '../utils/colors'

/**
 * React Component - <DeckComponent/>
 * 
 * A CHILD of <DecksScreen/>
 */
class DeckComponent extends React.Component {

    toDeckDetail = (deckId) => {
        this.props.goToDetail(deckId);
    }

    render() {
        const  { aDeck } = this.props;
        return (
            <TouchableOpacity onPress={()=>{ this.toDeckDetail(aDeck.title); }}>
                <View style={styles.container}>
                    <View>
                        <Text style={{color: purple, fontSize: 30}}> {aDeck.title} </Text>
                    </View>
                    <View>
                        <Text style={{color: gray, fontSize: 20}}>
                            {aDeck.questions.length} cards
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: coolblue,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius:10,
        borderColor: purple,
        borderWidth: 3,
        margin: 20,
        padding: 20
      }
    })

export default DeckComponent;
