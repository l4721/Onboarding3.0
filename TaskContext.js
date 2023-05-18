
import React, {createContext, useState} from 'react';

//use useId() to create random id?
//import { useId } from 'react'

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {

  //Number after the manually added task as first ID
  const [countID, setCountID] = useState(8);

    //initial Tasks
    const [tasks, setTasks]= useState([
        { id: 1, title: "Task 1", description: 'Here you have to do this1', category: 'social', completedBy: ['Newbie']},
        { id: 2, title: "Task 2", description: 'Here you have to do this2', category: 'basic', completedBy: ['']},
        { id: 3, title: "Task 3", description: 'Here you have to do this3', category: 'culture', completedBy: ['']},
        { id: 4, title: "Task 4", description: 'Here you have to do this4', category: 'knowlegde', completedBy: ['']},
        { id: 5, title: "Task 5", description: 'Here you have to do this5', category: 'knowlegde', completedBy: ['']},
        { id: 6, title: "Task 6", description: 'Here you have to do this6', category: 'culture', completedBy: ['']},
        { id: 7, title: "Task 7", description: 'Here you have to do this7', category: 'basic', completedBy: ['']},
        { id: 8, title: "Task 8", description: 'Here you have to do this8', category: 'social', completedBy: ['']},
    ]);


  //add Task
    const addTask = (newTask) => {
        //TODO setID - Problem now when erasing 
        const newTaskId = countID + 1;
    
        //construct the task with the id and the data
        const task = {
        id: newTaskId,
        ...newTask
        };
    
        // Add the Task
        //tasks.push(task);
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        setCountID(newTaskId);
        
        //TODO return here object in array? 
        return (
            task
        );
    };

    //count Number of Tasks completed by User "name"
    const countTasksByUser = (name) => {

        let count = 0;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completedBy.includes(name)) {
                count++;
            }
        }
        return count;
    };

    //count Number of Tasks
    const countTasks = () => {
        return tasks.length;
    };

    //to mark the task as done
    const setCompletedBy = (taskID, userID) => {
      setTasks((prevTasks) => 
        prevTasks.map((task) => 
          task.id === taskID ? {...task, completedBy: [userID] } : task
        )
      );
    };

  return (
      <TaskContext.Provider value={{ tasks, addTask, countTasks, countTasksByUser, setCompletedBy }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
