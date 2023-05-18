import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState, FlatList } from 'react-native';

//context AccountType
import { AccountTypeContext } from '../AccountTypeContext';
import { MilestoneContext } from '../MilestoneContext';
import { TaskContext } from '../TaskContext';

import { createTaskInMilestone } from "../MilestoneContext";

//import for input
import InputTaskComponent from "./InputTaskComponent";

export default function CreateTask({navigation, route}) {
    const {
        milestoneID
    } = route.params

    const { accountType } = useContext(AccountTypeContext);

    //TODO Check if Buddy
    /*
    if (accountType.name != 'Buddy') {
      navigation.goBack();
    }
    */

    //get function from context and then call it to get specific Milestone
    const { getMilestoneByID } = useContext(MilestoneContext);
    const milestone  = getMilestoneByID(milestoneID);
    const { createTaskInMilestone } = useContext(MilestoneContext);

    //Variable für Task
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');

    //handling the creation of Task
    const handleCreateTask = () => {
      const newTask = {
        title,
        description,
        category,
        completedBy: [],
      };
  
      createTaskInMilestone(milestoneID, newTask);
  
      navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Create a New Task in {milestone.title}
            </Text>
            
            <InputTaskComponent title="title" updateState={setTitle}/>
            <InputTaskComponent title="description" updateState={setDescription}/>
            <InputTaskComponent title="category" updateState={setCategory}/>

            <TouchableHighlight
              style= {styles.button}

              onPress={ handleCreateTask }>
                <Text style={styles.texti}>Submit</Text>
            </TouchableHighlight>




            <Text style={styles.heading}> {milestone.title}</Text>
            <Text>Description: {milestone.description}</Text>
            <Text>Status: {milestone.status}</Text>

            <Text style={styles.heading}> Tasks</Text>
            <FlatList
                data={milestone.tasks}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.headingTask}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>Category: {item.category}</Text>
                        {item.completedBy.includes(accountType.name) ? 
                            (<Text>Status: completed</Text>) : (<Text>Status: uncompleted</Text>)}
                    </View>
                )}
            >
            </FlatList>
            <Text>Groeße: {milestone.tasks.length}</Text>

        </View>
    )

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20 
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    button: {
      padding: 5,
      backgroundColor: '#15f',
      marginTop: 2,
      borderRadius: 15
    },
    texti: {
      textAlign: 'center',
      color: '#fff'
    }
  });























  /*

  //partly working

  import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState, FlatList } from 'react-native';

//context AccountType
import { AccountTypeContext } from '../AccountTypeContext';

//mileStoneData
import { getMilestoneByID, updateMilestoneData } from "../data/MilestoneData";
//TaskData
import tasks from "../data/TaskData";
import { addTask } from "../data/TaskData";
import { createTaskInMilestone } from "../data/MilestoneData";

//import for input
import InputTaskComponent from "./InputTaskComponent";

export default function CreateTask({navigation, route}) {
    const {
        milestoneID
    } = route.params


    const { accountType } = useContext(AccountTypeContext);

    //get the milestoneData
    const milestone = getMilestoneByID(milestoneID);

    //get Tasks
    const milestoneTaskList = milestone.tasks;

    
    //TODO Check if Buddy


    //Variable für Task
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');

    const handleCreateTask = () => {
      const newTask = {
        title,
        description,
        category,
      };
  
      createTaskInMilestone(newTask);
  
      navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Create a New Task in {milestone.title}
            </Text>
            
            <InputTaskComponent title="title" updateState={setTitle}/>
            <InputTaskComponent title="description" updateState={setDescription}/>
            <InputTaskComponent title="category" updateState={setCategory}/>

            <TouchableHighlight
              style= {styles.button}

              onPress={ handleCreateTask }>
                <Text style={styles.texti}>Submit</Text>
            </TouchableHighlight>




            <Text style={styles.heading}> {milestone.title}</Text>
            <Text>Description: {milestone.description}</Text>
            <Text>Status: {milestone.status}</Text>

            <Text style={styles.heading}> Tasks</Text>
            <FlatList
                data={milestoneTaskList}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.headingTask}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>Category: {item.category}</Text>
                        {item.completedBy.includes(accountType.name) ? 
                            (<Text>Status: completed</Text>) : (<Text>Status: uncompleted</Text>)}
                    </View>
                )}
            >
            </FlatList>


        </View>
    )

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20 
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    button: {
      padding: 5,
      backgroundColor: '#15f',
      marginTop: 2,
      borderRadius: 15
    },
    texti: {
      textAlign: 'center',
      color: '#fff'
    }
  });

  */