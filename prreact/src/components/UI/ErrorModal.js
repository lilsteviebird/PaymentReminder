import React from 'react';

import classes from './ErrorModal.module.css';

import Card from './Card';
import GenericButton from './GenericButton';

const ErrorModal = (props) =>{
    return(
        <div>
            <div className = {classes.backdrop} onClick = {props.onConfirm}/>
            <Card className = {classes.modal}>
                <header className = {classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className = {classes.content}>
                    <p>{props.message}</p>
                </div>
                <footer className = {classes.actions}>
                    <GenericButton onClick = {props.onConfirm}>Okay</GenericButton>
                </footer>
            </Card>
        </div>
        
    );
}

export default ErrorModal;