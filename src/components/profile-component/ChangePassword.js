import { TextField, Typography, Button } from '@material-ui/core'
import React from 'react'
import { useForm } from '../hooks/useForm'
export const ChangePassword = () => {
    const initialState = {currentPassword: "", newPassword: "", confirmPassword: ""}
    const {fields, setFields, handleInputChange} = useForm(initialState)


    const handleUpdatePassword = () => {
        // Send request

        // Reset fields
        setFields(initialState)
    }

    return (
        <div className="page-no-top-padding">
            <TextField 
                type="password" 
                label="Current Password"
                name="currentPassword" 
                value={fields.currentPassword}
                onChange={handleInputChange}
                />
            <TextField 
                type="password"
                label="New Password"
                name="newPassword"
                value={fields.newPassword}
                onChange={handleInputChange}
                />
            <TextField 
                type="password" 
                label="Confirm Password"
                name="confirmPassword" 
                value={fields.confirmPassword}
                onChange={handleInputChange}
                />
            <Button variant="outlined" color="primary" onClick={handleUpdatePassword}>
                <Typography>Update Password</Typography>
            </Button>
        </div>
    )
}
