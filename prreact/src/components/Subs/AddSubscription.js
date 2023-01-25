import React, { useState } from 'react';
import Card from '../UI/Card';
import GenericButton from  '../UI/GenericButton';
import ErrorModal from '../UI/ErrorModal';
import {Picker, Item, Provider, defaultTheme} from '@adobe/react-spectrum'
import classes from './AddSubscription.module.css';
import emailjs from '@emailjs/browser';

const AddSubscription = (props) =>{
    const scheduler = require('node-schedule');
    const [subscription, setSubscription] = useState('');
    const [subLength, setSubLength] = useState('');
    const [error, setError] = useState();
    const [subDate, setSubDate] = useState('');

    const addSubscriptionHandler = (event) =>{
        event.preventDefault();
        if(subscription.trim().length === 0 || subLength.trim().length === 0 || subDate === null){
            setError({title: 'Invalid input', message: 'Please enter a valid name, recurring length, and date started (non-empty values)'})
            return;
        }

        //need to change below
        console.log(subscription, subLength, subDate);
        props.onAddSubscription(subscription, subLength, subDate);
        setNextEmail(subLength);
        setSubscription('');
        setSubLength('');
        setSubDate('');
    }
    const nameChangeHandler = (event) => {
        setSubscription(event.target.value);
    }
    const subLengthHandler = (selected) => {
        setSubLength(selected);
    }
    const subDateHandler = (event) => {
        const date = new Date(event.target.value);
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });
        // Generate yyyy-mm-dd date string
        var formattedDate = year + "-" + month + "-" + day;
        setSubDate(formattedDate);
    }
    const errorHandler = () =>{
        setError(null);
    }

    function setNextEmail(recurTemp){
        var nextEmailDate = new Date(subDate);
        if(recurTemp === 'monthly'){
            nextEmailDate = new Date(nextEmailDate.setMonth(nextEmailDate.getMonth() + 1));
        }
        if(recurTemp === "semi-annually"){
            nextEmailDate = new Date(nextEmailDate.setMonth(nextEmailDate.getMonth() + 6));
        }
        if(recurTemp === "annually"){
            nextEmailDate = new Date(nextEmailDate.setMonth(nextEmailDate.getFullYear() + 1));
        }
        sendNextEmail(nextEmailDate);
    }

    function sendNextEmail(emailDate){
        const date = new Date(emailDate.getFullYear(), emailDate.getMonth(), emailDate.getDay(), 5, 30, 0);
        var templateParams = {
            name: 'PaymenReminder',
            notes: 'Check this out!'
        };
        const job = scheduler.scheduleJob(date, function(){
            emailjs.send('service_o9yvcxo', 'template_9ak1xgm', templateParams)
                        .then(function(response) {
                            console.log('SUCCESS!', response.status, response.text);
                        }, function(error) {
                            console.log('FAILED...', error);
                        });
        });
    }
    return(
        <div>
            { error && <ErrorModal title = {error.title} message = {error.message} onConfirm = {errorHandler}/>}
            <Card className = {classes.input}>
            <GenericButton onClick = {props.logoutClick}>Log Out!</GenericButton>
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