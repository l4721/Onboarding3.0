import React, {useContext, useEffect} from "react";
import { StyleSheet, Text, View, TouchableHighlight, useState, FlatList } from 'react-native';

import { Card, Dialog, Portal, TextInput, Provider, Button } from "react-native-paper";

import { AccountTypeContext } from '../AccountTypeContext';
import { QuestionContext } from "../QuestionContext";

export default function QuestionScreen({navigation}) {

    const { accountType } = useContext(AccountTypeContext);
    const { questions } = useContext(QuestionContext);
    const { addQuestion } = useContext(QuestionContext);
    const { addAnswer } = useContext(QuestionContext);

    //Variablen für pop up
    const [isDialogVisible, setDialogVisible] = React.useState(false);
    const [isAnswerDialogVisible, setAnswerDialogVisible] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');

    //if Dialog displayed
    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);

    //answerDialog
    const showAnswerDialog = () => setAnswerDialogVisible(true);
    const hideAnswerDialog = () => setAnswerDialogVisible(false);



    //create question - call addQuestion from Context
    const handleCreateQuestion = () => {
        addQuestion( title, text, accountType.name );
        setTitle('');
        setText('');
        hideDialog();
      };

    //handle answers
    const handleCreateAnswer = (questionID) => {
        addAnswer(questionID, text, accountType.name)
        setText('');
        hideAnswerDialog();
    };



      //rendering each question with its answers
    const renderQuestion = ({ item }) => {
        return (
          <Card>
            <Card.Title title={item.questionTitle} />
            <Card.Content>
                <Text>{item.questionText}</Text>
                <Text style={styles.creatorText}>{item.askedBy}, {item.creationDate}</Text>
                <Card.Actions>
                    <Button mode="contained" onPress={showAnswerDialog}>answer</Button>
                </Card.Actions>
                <Portal>
                    <Dialog visible={isAnswerDialogVisible} onDismiss={hideAnswerDialog}>
                        <Dialog.Content>
                            <TextInput
                                label="Answer"
                                value={text}
                                onChangeText={setText}
                            />
                            <Dialog.Actions>
                                <Button onPress={hideAnswerDialog}>Cancel</Button>
                                <Button onPress={()=> handleCreateAnswer(item.id)}>Create</Button>
                            </Dialog.Actions>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
                {item.answers.length > 0 && item.answers.map((answer, index) => (
                    <View key={index} style={styles.answerContainer}>
                        <Text>{answer.answerText}</Text>
                        <Text>{answer.answeredBy}, {answer.creationDate}</Text>
                    </View>
                ))}
            </Card.Content>
          </Card>
        );
      };



    return (
        <Provider>
            <View>
                <Text> Questions </Text>

                <FlatList
                    data={questions}
                    renderItem={renderQuestion}
                    keyExtractor={(item) => item.id.toString()}
                    >
                </FlatList>


                <Button mode="contained" onPress={showDialog}>Create New Question</Button>

                <Portal>
                    <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
                        <Dialog.Title>Create New Question</Dialog.Title>
                            <Dialog.Content>
                                <TextInput
                                    label="Title"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                                <TextInput
                                    label="Text"
                                    value={text}
                                    onChangeText={setText}
                                />
                            </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={handleCreateQuestion}>Create</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

            </View>
        </Provider>


    );
};

const styles = StyleSheet.create({
    answerContainer: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: 'lightgray',
      borderRadius: 5,
    },
    creatorText: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
      },
  });