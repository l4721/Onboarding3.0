//this page is only used for QuesionsScreen


import React, {createContext, useState} from 'react';

//use useId() to create random id?
//import { useId } from 'react'

export const QuestionContext = createContext();

export const QuestionContextProvider = ({ children }) => {

    const [countID, setCountID] = useState(2);
    
    //get the today date
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const [questions, setQuestions] = useState([
        {id: 'Q' + 1, questionTitle: 'Test Question', questionText: "Testquestion?", askedBy: 'Newbie', creationDate: `${day}/${month}/${year}`, answers: []},

    ])


    //create new Question
    const addQuestion = (questionTitle, questionText, userID) => {
        //construct new Question
        const newQuestion = {
            id: 'Q'+countID,
            questionTitle,
            questionText,
            askedBy: userID,
            creationDate: new Date().toLocaleDateString(),
            answers: []
        }
        setCountID(countID+1)
        //add new Question to questions
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion])
      };


      //create answer and adding it to the question in questions
      const addAnswer = (questionID, answerText, userID) => {
        setQuestions(prevQuestions => {
          return prevQuestions.map(question => {
            if (question.id === questionID) {
              const newAnswer = {
                id: 'A' + countID,
                answerText,
                answeredBy: userID,
                creationDate: new Date().toLocaleDateString(),
              };
              
              return {
                ...question,
                answers: [...question.answers, newAnswer],
              };
            } 
            return question;         
          });
        });
        setCountID(countID + 1);
      };
   






    return (
        <QuestionContext.Provider value={{ questions, addQuestion, addAnswer }}>
            {children}
        </QuestionContext.Provider> 
    );

};

export default QuestionContext;