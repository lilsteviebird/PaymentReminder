import React from 'react';

import Card from '../UI/Card';
import classes from './SubscriptionList.module.css';

const SubscriptionList = (props) =>{

    return(
        <Card className = {classes.subscriptions}>
            <ul>
                {props.subs.map( sub => (<li><dl key = {sub.id} > <dt>{sub.name.toUpperCase()}: subbed on {sub.dateSub.toLocaleDateString()}</dt><dd>{sub.subLength}</dd></dl> </li>))}
            </ul>
        </Card>
    );
};

export default SubscriptionList;