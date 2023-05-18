
import React, {createContext, useState, useContext} from 'react';
import { ToastAndroid } from 'react-native';

//import Tasks
import  { TaskContext }  from "./TaskContext";


export const MilestoneContext = createContext();

export const MilestoneContextProvider = ({ children }) => {

  //contextvariablen und funktionen
  const { tasks, addTask } = useContext(TaskContext);
  const { setCompletedBy } = useContext(TaskContext);

    //initial Milestones
    const [milestones, setMilestones] = useState([
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
    ]);



    //to return a specific milestone
    const getMilestoneByID = (milestoneID) => {
        return milestones.find((milestone) => milestone.id === milestoneID);
    };



    //create a new Task in Milestone
    const createTaskInMilestone = (milestoneID, newTask) => {
      const milestone = getMilestoneByID(milestoneID);

      //create new Milestone with the added Task and add the Task in the TaskContext
      if (milestone && Array.isArray(milestone.tasks)) {
        const tmpTask = addTask(newTask);
        const updatedMilestoneTasks = [...milestone.tasks, tmpTask];
        const updatedMilestone = {...milestone, tasks: updatedMilestoneTasks};

        //update the milestone in Milestones
        const milestoneIndexForUpdate = milestones.findIndex((m) => m.id === milestoneID);
        if (milestoneIndexForUpdate != -1 ) {
          const updatedMilestones = [...milestones];
          updatedMilestones[milestoneIndexForUpdate] = updatedMilestone;
          setMilestones(updatedMilestones);
        }

        //to display success 
        if ((updatedMilestone.tasks).some((task)=> task.title === newTask.title)){
          ToastAndroid.showWithGravity(
            'Task added',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        else {
          console.log("task not added");
        }
      }
      else {
        console.log("Error: createTaskInMilestone")
      }

    };



    //TODO does it work?
    //TODO mark as undone?
    const markTaskInMilestoneAsDone =(taskID, userID) => {
      setCompletedBy(taskID, userID);

      setMilestones((prevMilestones) =>
        prevMilestones.map((milestone) => ({
          ...milestone,
          tasks: milestone.tasks.map((task) =>
            task.id === taskID ? { ...task, completedBy: [...task.completedBy, userID] } : task
          ),
        }))
      );
    }



    return (
        <MilestoneContext.Provider value={{ milestones, getMilestoneByID, createTaskInMilestone }}>
        {children}
        </MilestoneContext.Provider>
    );
};

export default MilestoneContext;

