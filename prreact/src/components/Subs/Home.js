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
    var changeList;

    const addSubscriptionHandler = async (subName, payment, dateSubed) => {
      const newSub = {name: subName, subLength: payment, dateSub: dateSubed, id: Math.random().toString};

      if(subscriptionList.length === 0){
        const tempList = [newSub];
        changeList = tempList;
        handleSubmit(tempList);
        setSubscriptionList(tempList);
      }else{
        const newList = [...subscriptionList, newSub];
        changeList = newList;
        setSubscriptionList(changeList);
        handleSubmit(changeList);
      }
    }    
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
            setUserEmail(auth.currentUser.email);
          }
          
          if(obj.email === auth.currentUser.email){
            console.log(obj);
            if(Object.hasOwn(obj,'subscriptions')){
              initialList = [...initialList, ...obj.subscriptions]
              console.log(initialList);
            }
          }
      });
      if(initialList.length > 0){
          initialList.forEach(function (item){
            var changeDate = checkDate(item.dateSub);
            console.log("changeDate: " + changeDate);
            console.log("item date: " + item.dateSub);
            if(changeDate != item.dateSub){
              item.dateSub = changeDate;
            }
          })
      }
        changeList = initialList;
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
      console.log("here is the dateGiven: " + dateGiven);
      const currDate = new Date();
      const currDay = currDate.getDate();
      const currMonth = currDate.getMonth() + 1;
      const currYear = currDate.getFullYear();
      var currFormatDate = currYear + "-" + currMonth + "-" + currDay;
      console.log("currformat Date: " + currFormatDate);
      const oldDate = new Date(dateGiven);
      const oldDay = oldDate.getDate()+1;
      const oldMonth = oldDate.getMonth()+1;
      const oldYear = oldDate.getFullYear();
      var formatDate = oldYear + "-" + oldMonth + "-" + oldDay;
      console.log("format Date: " + formatDate);
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