import React, { useState } from 'react';
import Card from '../UI/Card';
import GenericButton from  '../UI/GenericButton';
import ErrorModal from '../UI/ErrorModal';
import {Picker, Item, Provider, defaultTheme} from '@adobe/react-spectrum'
import classes from './AddSubscription.module.css';
import DateObject from "react-date-object";

const AddSubscription = (props) =>{

    const [subscription, setSubscription] = useState('');
    const [subLength, setSubLength] = useState('');
    const [error, setError] = useState();
    const [subDate, setSubDate] = useState(new DateObject().format());

    const addSubscriptionHandler = (event) =>{
        event.preventDefault();
        if(subscription.trim().length === 0 || subLength.trim().length === 0){
            setError({title: 'Invalid input', message: 'Please enter a valid name and age (non-empty values)'})
            return;
        }

        //need to change below
        props.onAddSubscription(subscription, subLength, subDate);
        setSubscription('');
        setSubLength('');
        setSubDate(new DateObject().format());
    }
    const nameChangeHandler = (event) => {
        setSubscription(event.target.value);
    }
    const subLengthHandler = (selected) => {
        setSubLength(selected);
    }
    const subDateHandler = (event) => {
        setSubDate(event.target.value);
    }
    const errorHandler = () =>{
        setError(null);
    }
    return(
        <div>
            { error && <ErrorModal title = {error.title} message = {error.message} onConfirm = {errorHandler}/>}
            <Card className = {classes.input}>
                <form onSubmit ={addSubscriptionHandler}>
                    <label htmlFor="subscription-name">Subscription Name</label>
                    <input id="subscription-name" type ="text" value = {subscription} onChange={nameChangeHandler}/>
                    <label htmlFor="payment">Payment Cycle</label>
                    <Provider theme = {defaultTheme} id = "payment"> 
                        <Picker onSelectionChange={subLengthHandler}>
                            <Item key = "monthly">
                                monthly
                            </Item>
                            <Item key = "semi-annually">
                                semi-annually
                            </Item>
                            <Item key = "annually">
                                annually
                            </Item>
                        </Picker>
                    </Provider>
                    <label htmlFor = "start-date">When did you start your subcription?</label>
                    <input type="date" id="start-date" name="trip-start" value= {subDate} min= {subDate.year + "-01-01"} max= {subDate.year + "-12-31"} onChange = {subDateHandler}/>
                    <GenericButton type ="submit">Add Reminder</GenericButton>
                </form>
            </Card>
        </div>
        
    );
    
};

export default AddSubscription;