import React from 'react'
import { useState, useEffect } from 'react'
import { Dialog, FormControl, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Stack, Button } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditIcon from '@mui/icons-material/Edit'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'

const TaskDialog = ({ dialogTitle, task, setSelectedTask, tasks, setTasks, open, setOpen }) => {
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [taskDescription, setTaskDescription] = useState(task.description)
    const [taskDate, setTaskDate] = useState(task.deadline)
    const [taskPriority, setTaskPriority] = useState(task.priority)

    useEffect(() => {
        setTaskTitle(task.title)
        setTaskDescription(task.description)
        setTaskDate(task.deadline)
        setTaskPriority(task.priority)
    }, [task])

    const handleClose = () => {
        setTaskTitle('')
        setTaskDescription('')
        setTaskDate('')
        setSelectedTask({ title: '', description: '', deadline: '', priority: "low", isComplete: false })
        setOpen(false)
    }

    const handleAdd = () => {
        const newTask = {
            title: taskTitle, 
            description: taskDescription, 
            deadline: taskDate, 
            priority: taskPriority, 
            isComplete: false
        }
        setTasks(tasks.concat(newTask))
        setOpen(false)
    }

    const handleUpdate = () => {
        const taskToUpdateIndex = tasks.findIndex((t) => t.title === task.title)
        const updatedTask = {
            title: taskTitle, 
            description: taskDescription, 
            deadline: taskDate, 
            priority: taskPriority, 
            isComplete: false
        }
        const updatedTasks = [...tasks]
        updatedTasks[taskToUpdateIndex] = updatedTask
        setTasks(updatedTasks)
        setOpen(false)
    }

    // console.log(taskTitle)
    // console.log(taskDescription)
    console.log(taskDate)

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle
                display="flex"
                sx={{ color: "white", backgroundColor: "#1976d2" }}
                justifyContent="center"
                alignItems="center"
            >
                {dialogTitle === "Add Task" ? <AddCircleIcon sx={{ paddingRight: "5px" }} /> : <EditIcon sx={{ paddingRight: "5px" }} />}
                {dialogTitle}
            </DialogTitle>

            <FormControl sx={{ padding: 4, minWidth: "300px" }}>
                <TextField
                    id="task-title"
                    label="Title"
                    required={true}
                    error={taskTitle === ""}
                    helperText={taskTitle === "" ? "Title is required!" : ""}
                    value={taskTitle}
                    onChange={({ target }) => setTaskTitle(target.value)}
                    sx={{ my: 1 }}
                />

                <TextField
                    id="task-description"
                    label="Description"
                    required={true}
                    value={taskDescription}
                    error={taskDescription === ""}
                    helperText={taskDescription === "" ? "Description is required!" : ""}
                    onChange={({ target }) => setTaskDescription(target.value)}
                    sx={{ my: 1 }}
                />

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker label="Deadline" value={taskDate} onChange={(selectedDate) => setTaskDate(selectedDate)} sx={{ my: 1 }} />
                </LocalizationProvider>

                <FormLabel id="priority-radio-group" sx={{ mt: 1 }}>Priority</FormLabel>
                <RadioGroup
                    aria-labelledby="priority-radio-group"
                    defaultValue={taskPriority}
                    name="radio-buttons-group"
                    row={true}
                    onChange={(selectedPriority) => setTaskPriority(selectedPriority.target.value)}
                >
                    <FormControlLabel value="low" control={<Radio />} label="Low" />
                    <FormControlLabel value="med" control={<Radio />} label="Medium" />
                    <FormControlLabel value="high" control={<Radio />} label="High" />
                </RadioGroup>
                <Stack display="flex" direction="row" justifyContent="flex-end" spacing={1} pt="16px">
                    {dialogTitle === "Add Task" ?
                        <Button
                            variant='contained'
                            sx={{ width: "100px" }}
                            startIcon={<AddCircleIcon />}
                            onClick={handleAdd}
                        >
                            Add
                        </Button> :
                        <Button
                            variant='contained'
                            sx={{ width: "100px" }}
                            startIcon={<EditIcon />}
                            onClick={handleUpdate}
                        >
                            Edit
                        </Button>}
                    <Button
                        variant='contained'
                        sx={{ width: "100px", backgroundColor: "red" }}
                        startIcon={<DoDisturbAltIcon />}
                        onClick={handleClose}
                    >Cancel</Button>
                </Stack>

            </FormControl>
        </Dialog>
    )
}

export default TaskDialog