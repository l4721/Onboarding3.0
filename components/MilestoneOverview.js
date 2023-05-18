
//part Working Async
import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState } from 'react-native';
import { FlatList } from "react-native";

//context AccountType
import { AccountTypeContext } from '../AccountTypeContext';

//import milestones
import {MilestoneContext} from '../MilestoneContext'


export default function MilestoneOverview({ navigation }) {

    const { accountType } = useContext(AccountTypeContext);
    const { milestones } = useContext(MilestoneContext);




    return (
        <View>
            <Text style={styles.heading}>
                Milestones
            </Text>
            {accountType.name  === 'Buddy' && <Text>You are logged in as an Buddy.</Text>}
            {accountType.name === 'Newbie' && <Text>You are logged in as a Newbie User.</Text>}

            <Text>
                Here should be an overview for all milestones
            </Text>

            <FlatList
                data={milestones}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={() => navigation.navigate('MilestoneScreen', {
                                    milestoneID: item.id
                                }
                                
                                )}
                            >
                                <Text>{item.title}</Text>
                                
                            </TouchableHighlight>
                        </View>
                    )
                }}
            >
            </FlatList>

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
    button: {
        backgroundColor: "#deb887",
        padding: 5,
        borderRadius: 5,
        marginTop: 2,
        marginLeft: "5%",
        width: "25%"
    },
})





/*


//part Working Async
import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState } from 'react-native';
import { FlatList } from "react-native";

//context AccountType
import { AccountTypeContext } from '../AccountTypeContext';

//import Milestones
import milestones, {getMilestoneData} from "../data/MilestoneData";

export default function MilestoneOverview({ navigation }) {

    const { accountType } = useContext(AccountTypeContext);

    //get Milestones
    const [milestoneData, setMilestoneData] = React.useState(milestones);

    //Variables for getMilestones from Async
    const [allMilestoneData, setAllMilestoneData] = React.useState([]);

    //get Data from async
    const fetchAllMilestoneData = async () => {
        try {
            const milestoneDataAsync = await getMilestoneData();
            setAllMilestoneData(milestoneDataAsync);
        }
        catch (error){
            console.log('Error fetching milestone data:', error);
        }
    }
    
    //getting the Data from Async
    React.useEffect(() => {
        fetchAllMilestoneData();
    }, []);


    return (
        <View>
            <Text style={styles.heading}>
                Milestones
            </Text>
            {accountType.name  === 'Buddy' && <Text>You are logged in as an Buddy.</Text>}
            {accountType.name === 'Newbie' && <Text>You are logged in as a Newbie User.</Text>}

            <Text>
                Here should be an overview for all milestones
            </Text>

            <FlatList
                data={milestoneData}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={() => navigation.navigate('MilestoneScreen', {
                                    milestoneID: item.id
                                }
                                
                                )}
                            >
                                <Text>{item.title}</Text>
                                
                            </TouchableHighlight>
                        </View>
                    )
                }}
            >
            </FlatList>


            <Text style={styles.heading}>
                Async Milestones
            </Text>

            <FlatList
                data={allMilestoneData}
                renderItem={({ item }) => {
                    let tmpID = item.key;
                    console.log("TMPID: MilestoneOverview: " + {tmpID})
                    return (
                        <View>
                            <TouchableHighlight
                                style={styles.button}
                                
                                onPress={() => navigation.navigate('MilestoneScreen', {
                                    milestoneID: tmpID
                                }
                                
                                )}
                            >
                                <Text>{item.value.title}</Text>
                                
                            </TouchableHighlight>
                        </View>
                    )
                }}
            >
            </FlatList>



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
    button: {
        backgroundColor: "#deb887",
        padding: 5,
        borderRadius: 5,
        marginTop: 2,
        marginLeft: "5%",
        width: "25%"
    },
})


*/