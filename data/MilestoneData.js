// MilestoneData.js
//here the milestoneData is defined


import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import tasks from './TaskData';
import { addTask } from './TaskData';

//Key for milestones in ASYNC
const MILESTONES_STORAGE_KEY = 'milestones';

//Here the first Milestones before editing are created
const initialMilestones = [
  {
    id: "M1",
    title: "Milestone 1",
    description: "This is the first milestone",
    status: "Completed",
    tasks: [tasks[0]], // Use specific tasks from TaskData.js
  },
  {
    id: "M2",
    title: "Milestone 2",
    description: "This is the second milestone",
    status: "In Progress",
    tasks: [tasks[1], tasks[2]], // Use other tasks from TaskData.js
  },
  {
    id: "M3",
    title: "Milestone 3",
    description: "This is the third milestone",
    status: "unavailable",
    tasks: [tasks[3]], // Use other tasks from TaskData.js
  },
  {
    id: "M4",
    title: "Milestone 4",
    description: "This is the forth milestone",
    status: "unavailable",
    tasks: [tasks[4]], // Use other tasks from TaskData.js
  },
  // here you can add more Milestones for the beginning
];

export default initialMilestones;

//initial Milestones are stored in Async - not exported
  //with their id as key
export const initializeMilestonesData = async () => {
  try {
    const milestoneValues = JSON.stringify(initialMilestones);
    const allMilestones = JSON.parse(milestoneValues);
    for (let i = 0; i < allMilestones.length; i++) {
      let milestone = allMilestones[i];
      let milestoneKey = `${milestone.id}`;
      let milestoneData = JSON.stringify(milestone);
      await AsyncStorage.setItem(milestoneKey,milestoneData);
    }
    console.log("initialize Milestone successfull")
  } catch (error) {
    console.log("Error initializing milestones data:", error);
  }
};

//get MilestoneData from Async
export const getMilestoneData = async () => {
  try {

    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet(keys)

    const parsedMilestoneData = items.map(([key, value]) => {
      return {
        key,
        value: JSON.parse(value),
      };
    });

    return parsedMilestoneData;
  } catch (error) {
    // Handle error
    console.log('Error retrieving data from AsyncStorage:', error);
    return [];
  }
 
};




//TODO
//to return a specific milestone
export const getMilestoneByID = async(milestoneID) => {

      try {
        const milestones = await AsyncStorage.getItem(milestoneID);
        //return jsonValue != null ? JSON.parse(jsonValue) : null;
      
        //ceck if value           
        if (milestones===null) {
          console.log("Error: getMilestoneByID - milestones=null")
          return null;
        }
        const parsedMilestones = JSON.parse(milestones);
        const milestone = parsedMilestones.find((milestone) => milestone.id === milestoneID);

        if (milestone) {
          return milestone;
        }
        else {
          throw new Error(`Milestone with ID "${milestoneID}" not found`)
        }
      }
      catch (error) {
        console.log("Error getMilestoneByID", error.message);
      }
  };
  



//to create a new Task - addTask from TaskData is called
export const createTaskInMilestone = (milestoneID, newTask) => {
  const milestone = getMilestoneByID(milestoneID);

  if (milestone && Array.isArray(milestone.tasks)) {
    let tmpTask = addTask(newTask);
    milestone.tasks.push(tmpTask);
  }
  else {
    console.log("Error: createTaskInMilestone")
  }
  return milestones;
};


  


























//Working without storage
/*
// MilestoneData.js
//here the milestoneData is defined

import tasks from './TaskData';
import { addTask } from './TaskData';

const milestones = [
  {
    id: 1,
    title: "Milestone 1",
    description: "This is the first milestone",
    status: "Completed",
    tasks: [tasks[0]], // Use specific tasks from TaskData.js
  },
  {
    id: 2,
    title: "Milestone 2",
    description: "This is the second milestone",
    status: "In Progress",
    tasks: [tasks[1], tasks[2]], // Use other tasks from TaskData.js
  },
  {
    id: 3,
    title: "Milestone 3",
    description: "This is the third milestone",
    status: "unavailable",
    tasks: [tasks[3]], // Use other tasks from TaskData.js
  },
  {
    id: 4,
    title: "Milestone 4",
    description: "This is the forth milestone",
    status: "unavailable",
    tasks: [tasks[4]], // Use other tasks from TaskData.js
  },
  // Other milestones
];

export default milestones;


//to return a specific milestone
export const getMilestoneByID = (milestoneID) => {
    return milestones.find((milestone) => milestone.id === milestoneID);
  };
  

//to create a new Task - addTask from TaskData is called
export const createTaskInMilestone = (milestoneID, newTask) => {
  const milestone = getMilestoneByID(milestoneID);

  if (milestone && Array.isArray(milestone.tasks)) {
    let tmpTask = addTask(newTask);
    milestone.tasks.push(tmpTask);
  }
  else {
    console.log("Error: createTaskInMilestone")
  }
  return milestones;
};


  
*/