import React, { useState } from 'react';
import AddSubscription from './components/Users/AddSubscription';
import SubscriptionList from './components/Users/SubscriptionList';

function App() {

  const [subscriptionList, setSubscriptionList] = useState([]);  

  const addSubscriptionHandler = (subName, payment, dateSubed) => {
    setSubscriptionList((prevUsersList) => {
      return [...prevUsersList, {name: subName, 
        subLength: payment, dateSub: dateSubed, id: Math.random().toString()}];
    });
  }

  return (
    <div>
      <AddSubscription onAddSubscription = {addSubscriptionHandler}/>
      <SubscriptionList users = {subscriptionList}/>
    </div>
  );
}

export default App;
