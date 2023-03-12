import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AddButton from './AddButton'

const Header = ({ handleClickAdd }) => {
    return (
        <Box display="flex" sx={{ width: "100%", height: "70px", backgroundColor: "primary.main" }} justifyContent="center" alignContent="center" position="relative">
            <Stack display="flex" direction="row" justifyContent="center" alignItems="center">
                <MenuIcon style={{ color: "white" }} fontSize="large" />
                <Typography variant="h5" sx={{ color: "white" }}>FRAMEWORKS</Typography>
            </Stack>
            <Box display="flex" sx={{ position: "absolute", top: "15px", right: "30px" }}>
                <AddButton handleClick={handleClickAdd} />
            </Box>
        </Box>
    )
}

export default Header