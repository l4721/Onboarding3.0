//TODO generate random ID

import React, {createContext, useState} from 'react';

//use useId() to create random id?
//import { useId } from 'react'

export const AccountTypeContext = createContext();

export const AccountTypeProvider = ({ children }) => {

    //function to generate UserId
    const generaterandomUserId = () => {

        const id = 1
        return (
            id
        )
      };

      //accountType
  const [accountType, setAccountType] = useState(() => {
        return {
            name: 'Newbie',
            id: generaterandomUserId()
        };
  });   

  return (
    <AccountTypeContext.Provider value={{ accountType, setAccountType }}>
      {children}
    </AccountTypeContext.Provider>
  );
};

export default AccountTypeContext;
