import React from 'react'
import { Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const AddButton = ({ handleClick }) => {
    return (
        <Button
            variant='contained'
            sx={{ width: "125px", backgroundColor: "#2196f3" }}
            startIcon={<AddCircleIcon />}
            onClick={handleClick}
        >
            Add
        </Button>
    )
}

export default AddButton