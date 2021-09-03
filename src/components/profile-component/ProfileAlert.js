import { IconButton } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import React from 'react'
import CloseIcon from "@material-ui/icons/Close"
export const ProfileAlert = (props) => {

    if(props.alertMessage.error) {
        return (
            <Alert 
                variant="outlined" 
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                        props.setShowAlert(false);
                        }}
                    >
                    <CloseIcon />
                    </IconButton>
                }
                >
                <AlertTitle>{props.alertMessage.message}</AlertTitle>
            </Alert>
        )
    }
    else if(props.alertMessage.success) {
        return (
            <Alert 
                variant="outlined" 
                severity="success"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                        props.setShowAlert(false);
                        }}
                    >
                    <CloseIcon />
                    </IconButton>
                }
                >
                <AlertTitle>{props.alertMessage.message}</AlertTitle>
            </Alert>
        )
    }
    else {
        return (
            <></>
        )
    }
       
}
