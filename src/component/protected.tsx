import React from 'react'
import { Navigate } from 'react-router-dom'
import { CurrUser } from './../util/currUser';
import { User } from './../entity/User';
import { useEffect } from 'react';

interface ProtectedProps {
    currUser: CurrUser,
    children: JSX.Element
}

export const Guest  = (prop: ProtectedProps): JSX.Element => {

  const [isAuth, setIsAuth] = React.useState<JSX.Element | undefined>(undefined);
  
  useEffect(() => {
    const getAuth = async () => {
      const resp = await prop.currUser.getAuth();
      
      if (resp === true) {
        setIsAuth(<Navigate to="/chat" replace />);
      }else{
        setIsAuth(prop.children);
      }
    }
    getAuth();
    return () => { }
  }, [])

  if (isAuth === undefined) return <div>Loading...</div>
  return isAuth;
}

const Protected  = (prop: ProtectedProps): JSX.Element => {

  const [isAuth, setIsAuth] = React.useState<JSX.Element | undefined>(undefined);
  
  useEffect(() => {
    const getAuth = async () => {
      const resp = await prop.currUser.getAuth();
      console.log(resp);
      
      if (resp === false) {
        setIsAuth(<Navigate to="/" replace />);
      }else{
        setIsAuth(prop.children);
      }
    }
    getAuth();
    return () => { }
  }, [])
  // prop.currUser.getAuth().then((resp) => {
  //   if (resp === false) {
  //     setIsAuth(<Navigate to="/" replace />);
  //   }else{
  //     setIsAuth(prop.children);
  //   }
  // });
  if (isAuth === undefined) return <div>Loading...</div>
  return isAuth;
}
export default Protected