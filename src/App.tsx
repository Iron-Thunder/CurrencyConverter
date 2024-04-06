import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'

//Constants
import { currencyByRupee } from './constant'
// Components
import CurrencyBtn from './components/CurrencyBtn'

import Snackbar from 'react-native-snackbar';
 

const App = ():JSX.Element => {

  const [inputValue, setInputValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [currencySelected, setCurrencySelected] = useState("");

  const buttonPressed = (targetValue : Currency) => {
    if(!inputValue){
      return Snackbar.show({
        text: "Enter a value to convert",
        textColor: "#000000",
        backgroundColor: "#EA7773"
      })
    }
    const inputAmount = parseFloat(inputValue); // this gurantees that the input value is a decimal value number and nothing else

    if(!isNaN(inputAmount)){ // this checks that given input is a number an nothing else
      const convertedAmount = inputAmount * targetValue.value;
                                                        // this fixes the decimal points to 2
      const result = `${targetValue.symbol}${convertedAmount.toFixed(2)}`
      setResultValue(result);
      setCurrencySelected(targetValue.name)
    }
    else {
      return Snackbar.show({
        text: "Please enter a valid amount(number)",
        textColor: "#000000",
        backgroundColor: "#F4BE2C"
      })
    }

  }

  return (
    <>
      <StatusBar
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
            maxLength={14}
            value={inputValue}
            clearButtonMode='always' // only for IOS
            onChangeText={setInputValue}
            keyboardType='number-pad'
            placeholder='enter amount in ₹'
            style={styles.inputAmountField}

            />
          </View>
          {/* inside this small bracket() everything will be considered as one element as this is condition that we are writing */}
          {resultValue && (
            <Text style={styles.resultTxt}>
              {resultValue}
            </Text>
          )}

        </View>

        <View style={styles.bottomContainer}>
          <FlatList 
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={item =>item.name}
          renderItem={({item}) =>(
            <Pressable
            style={[styles.button, currencySelected === item.name && styles.selected]}
            onPress={()=> buttonPressed(item)}
            >
              {/* <CurrencyBtn {...item} /> we can do wither this or the below method */}
             <CurrencyBtn flag={item.flag} name={item.name} />
           </Pressable>
          )}
          />
        </View>
      </View>
    </>
    
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});