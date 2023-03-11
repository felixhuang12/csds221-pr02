import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Toast from './components/Toast'
import Header from './components/Header'

const App = () => {
    const [toastOpen, setToastOpen] = useState(true)
    const [toastMessage, setToastMessage] = useState('aerf')
    const [toastMessageType, setToastMessageType] = useState('success')

    return (
        <Grid container spacing={1}>
            <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} setMessage={setToastMessage} messageType={toastMessageType} setMessageType={setToastMessageType} />
            <Grid item width="100%">
                <Header />
            </Grid>
        </Grid>
    )
}

export default App
