// TaskData.js

//Here the Data Structure for Tasks are defined

/*
//Aufbau eines tasks
  Task:
    id
    title
    descripton
    category
    completedBy


  Categorien:
    social
    basic
    knowlegde
    culture

*/


const tasks = [
    { id: 1, title: "Task 1", description: 'Here you have to do this1', category: 'social', completedBy: ['Newbie']},
    { id: 2, title: "Task 2", description: 'Here you have to do this2', category: 'basic', completedBy: ['']},
    { id: 3, title: "Task 3", description: 'Here you have to do this3', category: 'culture', completedBy: ['']},
    { id: 4, title: "Task 4", description: 'Here you have to do this4', category: 'knowlegde', completedBy: ['']},
    { id: 5, title: "Task 5", description: 'Here you have to do this5', category: 'knowlegde', completedBy: ['']},
    { id: 6, title: "Task 6", description: 'Here you have to do this6', category: 'culture', completedBy: ['']},
    { id: 7, title: "Task 7", description: 'Here you have to do this7', category: 'basic', completedBy: ['']},
    { id: 8, title: "Task 8", description: 'Here you have to do this8', category: 'social', completedBy: ['']},

    // Other tasks
  ];
  
  export default tasks;


  //add Task
  export const addTask = (newTask) => {
    //TODO setID - Problem now when erasing 
    const newTaskId = tasks.length + 1;
  
    // consrcut the task with the id and the data
    const task = {
      id: newTaskId,
      ...newTask,
    };
  
    // Add the Task
    tasks.push(task);

    return (
      tasks[newTaskId-1]
    );
  };
  