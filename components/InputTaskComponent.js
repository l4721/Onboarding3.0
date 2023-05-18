import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputComponent = (props) => {
    return (
        <View>
            <Text style={styles.label}>{props.title}</Text>
            <TextInput placeholder='Placeholder' 
                style={styles.input}
                onChangeText={i=> props.updateState(i)}/>
        </View>
    );
    
}

export default InputComponent

const styles = StyleSheet.create({

  input: {
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 10,
    height: 40,
    padding:10
  },
  label: {
    padding: 2,
    marginTop: 10
  }
})