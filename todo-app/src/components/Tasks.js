import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from 'moment';

const Tasks = ({ tasks, setTasks, handleClickUpdate, setToastOpen, setToastMessage }) => {

    const handleCompleteCheck = (task) => {
        const taskToUpdateIndex = tasks.findIndex((t) => t.title === task.title)
        const taskToUpdate = tasks[taskToUpdateIndex]
        const updatedTask = { ...taskToUpdate, isComplete: !taskToUpdate.isComplete }
        const updatedTasks = [...tasks]
        updatedTasks[taskToUpdateIndex] = updatedTask
        setTasks(updatedTasks)
    }

    const handleDelete = (task) => {
        const updatedTasks = tasks.filter((t) => t.title !== task.title)
        setTasks(updatedTasks)
        setToastOpen(true)
        setToastMessage("Task successfully deleted!")
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ tableLayout: "fixed" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Title</TableCell>
                        <TableCell align='center'>Description</TableCell>
                        <TableCell align='center'>Deadline</TableCell>
                        <TableCell align='center'>Priority</TableCell>
                        <TableCell align='center'>Is Complete</TableCell>
                        <TableCell align='center'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((row) => (
                        <TableRow
                            key={row.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align='center'>
                                {row.title}
                            </TableCell>
                            <TableCell align='center'>{row.description}</TableCell>
                            <TableCell align='center'>{moment(row.deadline._d).format("MM/DD/YYYY")}</TableCell>
                            <TableCell align='center'>{row.priority}</TableCell>
                            <TableCell align='center'>
                                <Checkbox checked={row.isComplete} onChange={() => handleCompleteCheck(row)} />
                            </TableCell>
                            <TableCell align='center'>
                                {!row.isComplete && <Button
                                    variant="contained"
                                    sx={{ width: "125px" }}
                                    startIcon={<EditIcon />}
                                    onClick={() => handleClickUpdate(row)}
                                >
                                    Update
                                </Button>}
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "125px",
                                        backgroundColor: "red",
                                        '&:hover': {
                                            backgroundColor: '#DC143C',
                                        }
                                    }}
                                    startIcon={<HighlightOffIcon />}
                                    onClick={() => handleDelete(row)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tasks