// PersonData.js




const persons = [
    {
        id: 1,
        name: "Newbie",
        percentage: 0,
    },
    {
        id: 2,
        name: "Ada",
        percentage: 50,
    },
    {
        id: 3,
        name: "Christina",
        percentage: 73,
    },
    {
        id: 4,
        name: "Kevin",
        percentage: 90,
    },
    {
        id: 5,
        name: "Daniel",
        percentage: 22,
    },

];

export default persons;


//to return a specific persin
export const getPersinByID = (personID) => {
    return persons.find((person) => person.id === personID);
};

