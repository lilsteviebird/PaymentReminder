import React, {useState, useEffect} from 'react';
import AddSubscription from './AddSubscription';
import SubscriptionList from './SubscriptionList';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = (props) =>{
    const [subscriptionList, setSubscriptionList] = useState([]);
    const [userEmail, setUserEmail] = useState(''); 
    const navigate = useNavigate();

    

    const addSubscriptionHandler = async (subName, payment, dateSubed) => {
      const newSub = {name: subName, subLength: payment, dateSub: dateSubed, id: Math.random().toString};

      if(subscriptionList.length === 0){
        const tempList = [newSub];
        handleSubmit(subscriptionList);
        setSubscriptionList(tempList);
      }else{
        const newList = [...subscriptionList, newSub];
        setSubscriptionList(newList);
        handleSubmit(newList);
      }
    }    

    useEffect(()=>{
      console.log("re-render because subscription list has changed");
    }, [subscriptionList]);
    
    async function handleSubmit (updatedList) {
      await axios.post(
        'https://b4btmv57ga.execute-api.us-east-1.amazonaws.com/default/WritePaymentReminderTable',
        { email:  userEmail, subscriptions: updatedList}
      );
    }
    async function getInitialList() {
      await axios.get(
        `https://el7ucm9020.execute-api.us-east-1.amazonaws.com/default/ReadPaymentReminderTable`
      ).then(res =>{
        console.log(res.data.body);
        var initialList = [];
        res.data.body.map((obj, i) => {
          if(userEmail.length === 0){
            console.log(auth.currentUser);
            setUserEmail(auth.currentUser.email);
          }
          initialList = obj.email === auth.currentUser.email ? obj.subscriptions : [];
          console.log(initialList);
      });
      if(initialList.length > 0){
          initialList.forEach(function (item){
            var changeDate = checkDate(item.dateSub);
            if(changeDate != item.dateSub){
              item.dateSub = changeDate;
            }
          })
      }
        setSubscriptionList(initialList);
      });
    }
    const logoutHandler = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    function checkDate(dateGiven, subLength){
      const currDate = new Date();
      const currDay = currDate.getDay();
      const currMonth = currDate.getMonth();
      const currYear = currDate.getFullYear();
      const oldDate = new Date(dateGiven);
      const oldDay = oldDate.getDay();
      const oldMonth = oldDate.getMonth();
      const oldYear = oldDate.getFullYear();
      var formatDate = oldYear + "-" + oldMonth + "-" + oldDay;
      if(subLength === "monthly"){
        if(currMonth === oldMonth + 1 && currDay === oldDay){
          formatDate = currYear + "-" + currMonth + "-" + currDay;
        }
      }else if(subLength === "semi-annually"){
        if(currMonth === oldMonth + 6 && currDay === oldDay){
          formatDate = currYear + "-" + currMonth + "-" + currDay;
        }
      }else if(subLength === "annually"){
        if(currYear === oldYear + 1 && currMonth === oldMonth && currDay === oldDay){
          formatDate = currYear + "-" + currMonth + "-" + currDay;
        }
      }
      return formatDate;
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setUserEmail(auth.currentUser.email);
              // ...
              getInitialList(userEmail);
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])

    return(
        <div>
            <AddSubscription logoutClick = {logoutHandler} onAddSubscription = {addSubscriptionHandler}/>
            <SubscriptionList subs = {subscriptionList }/>
        </div>
    );
};

export default Home;