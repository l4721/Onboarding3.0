import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState } from 'react-native';
import { FlatList } from "react-native";
//import AsyncStorage from '@react-native-community/async-storage'; 

import categories from '../data/CategoriesData'; 

import {TaskContext} from "../TaskContext";

export default function Quests({navigation, route}){

    const [questCategories, setquestCategories] = React.useState(categories);
    const { tasks } = useContext(TaskContext);
    

    //adding the tasks to the appropriate category
    tasks.forEach(task => {
        const category = categories.find(category => category.title === task.category);
        if (category){
            category.tasks.push(task);
        }
    });


  const tempData = [
      {
      id: 1, 
      title: "Task 1", 
      description: 'Here you have to do this1', 
      category: 'social', 
      completedBy: ['Newbie', 'Newbie']
      }
  ]; 
  
  const [cmplete, setCmplete] = React.useState([]); 
  const [zaehler, setZaehler] = React.useState(''); 

  const count = () => {
    let counti = 0;
    for (let i= 0; i < cmplete.length; i++){
      if (JSON.stringify(cmplete[i]) === 'Newbie'){
      counti+=1;
      }
    }
    return counti; 
  }


 React.useEffect(() => {
    setCmplete(JSON.stringify(tempData[0].completedBy))
    setZaehler(count)
  }, []); 

    return (
        <View>
            <Text style={styles.heading}>
                Quests
            </Text>

            <Text>
                Here should be an overview of the quests
            </Text>

            <Text> </Text>
            <FlatList
                data={questCategories}
                renderItem={({ item }) => {
                    return (
                        <View>
                         <Text> {item.title} </Text>
                         <Text> {cmplete} </Text>
                         <Text> count: {zaehler} </Text>

                        </View>
                    )
                }}
            >
            </FlatList>

            <FlatList
                data={categories}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text style={styles.headingCategory}>{item.title}</Text>
                            {item.tasks.length > 0 && <Text>{item.tasks[0].title}</Text>}
                            <FlatList
                                data={item.tasks}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            {item &&<Text style={styles.headingTask}>{item.title}</Text>}
                                            {item &&<Text>{item.description}</Text>}

                                        </View>
                                    )
                                }}
                            >
                            </FlatList>
                        </View>
                    )
                }}
            >

            </FlatList>
          



        </View>
    );

}

const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    headingCategory: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop : 5,
    },
    headingTask: {
        fontSize: 16,
        fontWeight: 'bold',    
    },

})


                           