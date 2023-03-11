import React from 'react'
import { Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const AddButton = () => {
    return (
        <Button
            variant='contained'
            sx={{ width: "125px", backgroundColor: "#75A1D0" }}
            startIcon={<AddCircleIcon />}
        >
            Add
        </Button>
    )
}

export default AddButton