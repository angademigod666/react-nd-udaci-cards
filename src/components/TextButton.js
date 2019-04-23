import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

/**
 * React Component - <TextButton/>
 * 
 * Used as All the buttons in the app
 */
export default function TextButton ({ disabled, children, onPress, style = {} }) {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.AndroidSubmitBtn, style]} onPress={onPress}>
      <Text style={[styles.reset, styles.submitBtnText]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
})