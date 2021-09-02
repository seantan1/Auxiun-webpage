import { TextField } from '@material-ui/core'
import React from 'react'

export const ChangePassword = () => {
    return (
        <div className="page-no-top-padding">
            <TextField type="password" />
            <TextField type="password" />
            <TextField type="password"/>
        </div>
    )
}
