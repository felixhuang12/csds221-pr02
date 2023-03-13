import React from 'react'
import MuiAlert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Toast = ({ open, setOpen, message, setMessage }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={"success"} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast