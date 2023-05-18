import React, {useContext, useEffect} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState, FlatList } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";

//context AccountType
import { AccountTypeContext } from '../AccountTypeContext';

//mileStoneData
import { MilestoneContext } from "../MilestoneContext";

import { TaskContext } from "../TaskContext";

//TaskData
//import tasks from "../data/TaskData";
//import { getMilestoneByID } from "../MilestoneContext";

export default function MilestoneScreen({navigation, route}) {
    const {
        milestoneID
    } = route.params

    //get AccountType
    const { accountType } = useContext(AccountTypeContext);

    const { getMilestoneByID } = useContext(MilestoneContext);

    const { tasks } = useContext(TaskContext);

     // State for milestone data
    const [milestone, setMilestone] = React.useState(null);

    //get function from context and then call it to get specific Milestone
    //and rerender if Screen is Focused
/*
//not WORKING
    useEffect(()=> {
        const fetchMilestone = () => {
            getMilestoneByID(milestoneID)
                .then(fetchedMilestone => {
                    if (!fetchedMilestone) {
                        console.log("Error: MilestoneScreen - !fetchedMilestone")
                    }
                    else {
                        setMilestone(fetchedMilestone)
                    }
                })
        }
        fetchMilestone();
    })
*/
  

//TODO Refresh not working!
    useFocusEffect(
        React.useCallback(() => {
            const fetchedMilestone  = getMilestoneByID(milestoneID);

            //check if Milestone exists
            if (!fetchedMilestone) {
                console.log("Error: MilestoneScreen - !milestone");
            }
            setMilestone(fetchedMilestone);

        })
    );
    
    if (!milestone) {
        return (
          <View>
            <Text>Loading milestone...</Text>
          </View>
        );
      }

  

    return (
        <View>
            {accountType.name === 'Buddy' && <Text>You are logged in as an Buddy.</Text>}
            {accountType.name === 'Newbie' && <Text>You are logged in as a Newbie User.</Text>}

            <Text>
                Here should be an overview for all milestones
            </Text>
        

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
                            <Checkbox
                                status="checked"
                                onPress={() => {}}
                            />
                            :
                            <Checkbox
                                status="unchecked"
                                onPress={() => {}}
                            />
                        }
                    </View>
                )}
            >
            </FlatList>

            {accountType.name === 'Buddy' && 
                <TouchableHighlight
                style={styles.button}
                onPress={() => navigation.navigate('CreateTask', {
                    milestoneID: milestoneID
                }              
                )}>
                <Text>Create new Task</Text>
                
            </TouchableHighlight>
            }

            <Text>Groeße Tasks: {tasks.length}</Text>



        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    headingTask: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop : 5,
    },
    button: {
        backgroundColor: "#deb887",
        padding: 5,
        borderRadius: 5,
        marginTop: 200,
        marginLeft: "5%",
        width: "25%",
        justifyContent: "flex-start"
    },
})







/*


//partly working

Zwischenschritt 2



import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState, FlatList } from 'react-native';

//context AccountType
import { AccountTypeContext } from '../AccountTypeContext';

//mileStoneData
import { getMilestoneByID } from "../data/MilestoneData";
//TaskData
import tasks from "../data/TaskData";

export default function MilestoneScreen({navigation, route}) {
    const {
        milestoneID
    } = route.params

    const { accountType } = useContext(AccountTypeContext);

    //get the milestoneData
    const [milestone, setMilestone] = React.useState();
    //const milestone = getMilestoneByID(milestoneID);


    //fetch milestone
    const fetchMilestoneData = async () => {
        const milestoneData = await getMilestoneByID(milestoneID);
        if (!milestoneData) {console.log("ERROr fetchMilestoneData - milestoneData=null")}
        else { setMilestone(milestoneData); }
      };


      React.useEffect(() => {
        fetchMilestoneData();

        if (!milestone) {
            console.log("Error: MilestoneScreen - !milestone")
        }
      }, [milestoneID]);


      if (!milestone) {
        // Render a loading state or return null if milestone is not available yet
        return (
          <View>
            <Text>Loading milestone data...</Text>
          </View>
        );
      }


    //get Tasks
    if (!milestone) {console.log("Error: MilestoneScreen - !milestone")}
    const milestoneTaskList = milestone.value.tasks;

    return (
        <View>
            {accountType.name === 'Buddy' && <Text>You are logged in as an Buddy.</Text>}
            {accountType.name === 'Newbie' && <Text>You are logged in as a Newbie User.</Text>}

            <Text>
                Here should be an overview for all milestones
            </Text>
        

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

            {accountType.name === 'Buddy' && 
                <TouchableHighlight
                style={styles.button}
                onPress={() => navigation.navigate('CreateTask', {
                    milestoneID: milestoneID
                }              
                )}>
                <Text>Create new Task</Text>
                
            </TouchableHighlight>
            }



        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    headingTask: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop : 5,
    },
    button: {
        backgroundColor: "#deb887",
        padding: 5,
        borderRadius: 5,
        marginTop: 200,
        marginLeft: "5%",
        width: "25%",
        justifyContent: "flex-start"
    },
})

*/






/*
//Zwischenschritt

import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState, FlatList } from 'react-native';

//context AccountType
import { AccountTypeContext } from '../AccountTypeContext';

//mileStoneData
import { getMilestoneByID } from "../data/MilestoneData";
//TaskData
import tasks from "../data/TaskData";

export default function MilestoneScreen({navigation, route}) {
    const {
        milestoneID
    } = route.params

    const { accountType } = useContext(AccountTypeContext);

    //get the milestoneData
    const [milestone, setMilestone] = React.useState();
    //const milestone = getMilestoneByID(milestoneID);

    const fetchMilestoneData = async () => {
        const milestoneData = await getMilestoneByID(milestoneID);
        if (!milestoneData) {console.log("ERROr fetchMilestoneData - milestoneData=null")}
        else { setMilestone(milestoneData.value); }
      };


      React.useEffect(() => {
        fetchMilestoneData();

        if (!milestone) {
            console.log("Error: MilestoneScreen - !milestone")
        }
      }, [milestoneID]);


      if (!milestone) {
        // Render a loading state or return null if milestone is not available yet
        return (
          <View>
            <Text>Loading milestone data...</Text>
          </View>
        );
      }


    //get Tasks
    if (!milestone) {console.log("Error: MilestoneScreen - !milestone")}
    const milestoneTaskList = milestone.value.tasks;

    return (
        <View>
            {accountType.name === 'Buddy' && <Text>You are logged in as an Buddy.</Text>}
            {accountType.name === 'Newbie' && <Text>You are logged in as a Newbie User.</Text>}

            <Text>
                Here should be an overview for all milestones
            </Text>
        

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

            {accountType.name === 'Buddy' && 
                <TouchableHighlight
                style={styles.button}
                onPress={() => navigation.navigate('CreateTask', {
                    milestoneID: milestoneID
                }              
                )}>
                <Text>Create new Task</Text>
                
            </TouchableHighlight>
            }



        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    headingTask: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop : 5,
    },
    button: {
        backgroundColor: "#deb887",
        padding: 5,
        borderRadius: 5,
        marginTop: 200,
        marginLeft: "5%",
        width: "25%",
        justifyContent: "flex-start"
    },
})




*/