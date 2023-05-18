import React, {useState, useContext} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, SafeAreaView, Image, FlatList,} from 'react-native';

//context
import { AccountTypeContext } from '../AccountTypeContext';
//TaskContext importieren 
import { TaskContext } from "../TaskContext";
//fiktive Personen importieren
import persons from "../data/PersonsData";

//needs to be imported for first loading in the Asnyc
//import { initializeMilestonesData } from '../data/MilestoneData';

/*
    //Dieser teil kann als conditional rendering auf jeder seite eingebaut werden
    {accountType === 'Buddy' && <Text>You are logged in as an Buddy.</Text>}
    {accountType === 'Newbie' && <Text>You are logged in as a Newbie User.</Text>}
*/



/*
//Doku zur Verwendung von den Contexten

//milestoneContext importieren
import { MilestoneContext } from "../MilestoneContext";

//in der funktion variablen und funktionen aus kontext holen
const { getMilestoneByID } = useContext(MilestoneContext);

//mit dem könnte schon die funktion getMilestoneByID verwendet werden
// der ganze array milestones sollte auch so eingebunden und verwendet werden können

*/





export default function Homepage({navigation}) {

    //set AccountType from Context
    const { accountType } = useContext(AccountTypeContext);

    //funktionen aus kontext holen
    const { countTasks } = useContext(TaskContext);
    const { countTasksByUser } = useContext(TaskContext);


    const [personData, setPersonData] = React.useState(persons);
    //const [milestoneData, setMilestoneData] = React.useState(milestones);


    const numberOfTasks = countTasks();
    const numberOfTasksByUser = countTasksByUser(accountType.name);

    const percentage = (numberOfTasksByUser / numberOfTasks) * 100;
    const developmentState = Math.floor(percentage / 25) + 1 
    //0-24.9% Level 1, 25-49,9% Level 2,50-74,9% Level 3,75-99,9% Level 4, 100% Level 5

    const renderPlantPicture = (developmentStage) => {
        switch (developmentStage) {
            case 1:
                return <Image style={styles.image} source={require('../assets/Plant_1.png')} />
            //break;
            case 2:
                return <Image style={styles.image} source={require('../assets/Plant_2.png')} />
            //break;
            case 3:
                return <Image style={styles.image} source={require('../assets/Plant_3.png')} />
            //break;
            case 4:
                return <Image style={styles.image} source={require('../assets/Plant_4.png')} />
            //break;
            case 5:
                return <Image style={styles.image} source={require('../assets/Plant_5.png')} />
            //break;
            default:
                // Wenn die developmentStage nicht im Bereich 1-5 liegt
                break;
        }
    }

    const greeting = () => {
        return (
            <View>
                <Text style={styles.heading}>
                    Hallo {accountType.name}!
            </Text>
            </View>
        )
    }

    const navigationButtons = () => {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => (navigation.navigate('MilestoneOverview'))}
                >
                    <Text>Milestones</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => (navigation.navigate('QuestsScreen'))}
                >
                    <Text>Quests</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => (navigation.navigate('QuestionScreen'))}
                >
                    <Text>Questions</Text>
                </TouchableHighlight>
            </View>
        )
    }

    const progressBar = (percentage) => {
        //let percentage=100
        return (
            <View style={styles.containerc}>
                <View style={[styles.progressBarc, { width: `${percentage}%` }]} />
                <Text style={styles.textc}>{`${percentage}%`}</Text>
            </View>
        );
    };

    //berechnete Prozent werden vorgeszogen, sonst prozent aus PersonsData
    const renderPercent = (name, safedPercentage) => {
        let evaluatedPercentage = (countTasksByUser(name) / countTasks()) * 100;

        if (evaluatedPercentage) { return evaluatedPercentage }
        if (safedPercentage) { return safedPercentage }
        //else return()

    }

    //screen von buddy
    if (accountType.name === 'Buddy') {
        return (
            <View>
                {greeting()}
                {navigationButtons()}
                <FlatList
                    data={personData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.item}>{item.name}
                                {/* 
                                {renderPercent(item.name,item.percentage)}%
                                 */}
                                {progressBar(renderPercent(item.name, item.percentage))}
                            </Text>
                        </View>)
                    }
                />
            </View>
        )
    }

    //screen von Newbie
    if (accountType.name === 'Newbie') {
        return (
            <View>
                {greeting()}
                {navigationButtons()}
                {progressBar(percentage)}

                <SafeAreaView style={styles.container}>
                    <Text style={styles.heading}>
                        {numberOfTasks}, {numberOfTasksByUser}, {percentage}, {developmentState}
                    </Text>
                    {renderPlantPicture(developmentState)}
                </SafeAreaView>
            </View>
        )
    }

    return ( //default
        <View style={styles.container}>
            <Text style={styles.heading}>
                Hallo unbekannter!
            </Text>
            {navigationButtons()}
        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '180%',
        height: '180%',
        //padding: 5,
        resizeMode: 'contain',
        //alignItems: 'center'
    },
    item: {
        backgroundColor: '#1af',
        marginTop: 20,
        padding: 15,
        borderRadius: 15
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    containerc: {
        width: '80%',
        height: 20,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },
    progressBarc: {
        height: '100%',
        backgroundColor: '#4caf50',
    },
    textc: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        //textAlign: 'center',
        //textAlignVertical: 'center',
        color: "#deb887",
        fontWeight: 'bold',
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