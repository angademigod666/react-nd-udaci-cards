import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { purple, gray } from '../utils/colors';

/**
 * React Component - <TabBarIcon/>
 * 
 * A CHILD of <MainTabNavigator/>
 */
export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? purple : gray}
      />
    );
  }
}