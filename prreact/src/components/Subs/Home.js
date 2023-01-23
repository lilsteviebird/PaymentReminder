import React, {useState} from 'react';
import AddSubscription from './AddSubscription';
import SubscriptionList from './SubscriptionList';

const Home = (props) =>{
    const [subscriptionList, setSubscriptionList] = useState([]);  

    const addSubscriptionHandler = (subName, payment, dateSubed) => {
        setSubscriptionList((prevUsersList) => {
        return [...prevUsersList, {name: subName, 
         subLength: payment, dateSub: dateSubed, id: Math.random().toString()}];
        });
    }

    return(
        <div>
            <AddSubscription onAddSubscription = {addSubscriptionHandler}/>
            <SubscriptionList subs = {subscriptionList}/>
        </div>
    );
};

export default Home;