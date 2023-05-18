import React, {useState, useContext} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

//import Context
import { AccountTypeContext } from '../AccountTypeContext';

export default function Startpage({navigation}) {


  //Variable zur AccountAuswahl
  const { accountType, setAccountType } = useContext(AccountTypeContext);


  //handle login click on Newbie
  const handleNewbieClick = () => {
    setAccountType({ ...accountType, name: 'Newbie' });
    navigation.navigate('Home');
  };

  //handle login click on Buddy
  const handleBuddyClick = () => {
    setAccountType({ ...accountType, name: 'Buddy' });
    navigation.navigate('Home');
  };

return (
    <View style={styles.container}>
      <Text>Which Account do you want to choose?</Text>
      <TouchableHighlight
        style={styles.button}
        onPress={handleNewbieClick}>
        <Text>Newbie</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress={handleBuddyClick}>
        <Text>Buddy</Text>
      </TouchableHighlight>

      <StatusBar style="auto" />
    </View>
);

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: "#deb887",
      padding: 5,
      borderRadius: 5,
      marginTop: 2,
      marginLeft: "5%",
      width: "25%"
  },
  });