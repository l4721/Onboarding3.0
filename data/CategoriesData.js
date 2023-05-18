
const categories = [
    {
      id: 1,
      title: "social", 
      description: "Tasks in this category help you to become a member of the team", 
      beginner: 1, 
      advanced: 5, 
      expert: 10,
      tasks: []
    },
    {
      id: 2,
      title: "basic", 
      description: "Tasks in this category help you to acquire basic knowlegde of the day-to-day processes",
      beginner: 2, 
      advanced: 5, 
      expert: 10,
      tasks: []
    },
    {
      id: 3,
      title: "knowledge",  
      description: "Tasks in this category are specifically tailored for your position",
      beginner: 2, 
      advanced: 5, 
      expert: 10,
      tasks: []
    },
    {
      id: 4,
      title: "culture", 
      description: "Tasks in this category helps you to get to know the culture of our company", 
      beginner: 2, 
      advanced: 5, 
      expert: 10,
      tasks: []
    },
    // Other milestones
  ];
  
  export default categories
  
  
  //to return a specific milestone
  export const getCategoryByID = (categoryID) => {
      return categories.find((category) => category.id === categoryID);
    };
    
  