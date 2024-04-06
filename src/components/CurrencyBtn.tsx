import { StyleSheet, Text, View } from 'react-native'
import type { PropsWithChildren } from 'react'
import React from 'react'

type CurrencyButtonProps = PropsWithChildren<{
  name : string;
  flag : string;
}>

const CurrencyBtn = (props : CurrencyButtonProps) : JSX.Element => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.country}>{props.name}</Text>
    </View>
  )
}

export default CurrencyBtn

const styles = StyleSheet.create({
  buttonContainer : {
    alignItems: 'center',
  },
  flag : {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 4, 
  },
  country : {
    fontSize: 14,
    color: "#2D3436",
    marginBottom: 4,
  },
})