import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AddDeckScreen from '../screens/AddDeckScreen';
import DecksScreen from '../screens/DecksScreen';
import DeckDetailScreen from '../screens/DeckDetailScreen';
import AddCardScreen from '../screens/AddCardScreen';
import QuizScreen from '../screens/QuizScreen';
import { purple , white, gray} from '../utils/colors'


/**
 * Creating the <MainTabNaigator/>
 * HAS two <StackNavigators/> --> DeckStack and AddDeckStack as two differnet TABS
 * 
 * --> DecksStack loads screens => { DecksScreen, DeckDetail, AddCard, StartQuiz } as a stack
 * --> AddDeckStack loads screens => { AddDeckScreen } as a stack
 */

const DecksStack = createStackNavigator({

  Decks: {
    screen: DecksScreen,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: 'Decks    '
    }
  },
  DeckDetail: {
    screen: DeckDetailScreen,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: 'Cards    '
    }
  },
  AddCard: {
    screen: AddCardScreen,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: 'Add Card      '
    }
  },
  StartQuiz: {
    screen: QuizScreen,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: 'Start Quiz    '
    }
  }


});

DecksStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-albums'}
    />
  ),
  headerTintColor: gray,
  headerStyle: {
      backgroundColor: purple,
  }
  
};



const AddDeckStack = createStackNavigator({
  AddDeck: {
    screen: AddDeckScreen,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitle: 'Add Deck     '
    }
  }
});

AddDeckStack.navigationOptions = {
  tabBarLabel: 'New Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-add-circle'}
    />
  ),
};

const BottomTab = createBottomTabNavigator({
  DecksStack,
  AddDeckStack,
});


export default BottomTab