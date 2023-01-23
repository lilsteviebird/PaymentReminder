import React, {useState, useEffect} from 'react';
import AddSubscription from './AddSubscription';
import SubscriptionList from './SubscriptionList';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from '../../Firebase';
import { useNavigate } from 'react-router-dom';
const Home = (props) =>{
    const [subscriptionList, setSubscriptionList] = useState([]);  

    const addSubscriptionHandler = (subName, payment, dateSubed) => {
        setSubscriptionList((prevUsersList) => {
        return [...prevUsersList, {name: subName, 
         subLength: payment, dateSub: dateSubed, id: Math.random().toString()}];
        });
    }
    const navigate = useNavigate();
 
    const logoutHandler = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])

    return(
        <div>
            <button onClick={logoutHandler}>Logout</button>
            <AddSubscription onAddSubscription = {addSubscriptionHandler}/>
            <SubscriptionList subs = {subscriptionList }/>
        </div>
    );
};

export default Home;