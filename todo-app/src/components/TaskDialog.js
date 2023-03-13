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

const TaskDialog = ({ dialogTitle, task, setSelectedTask, tasks, setTasks, open, setOpen, setToastOpen, setToastMessage, hideTaskTitle, setHideTaskTitle }) => {
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [taskDescription, setTaskDescription] = useState(task.description)
    const [taskDate, setTaskDate] = useState(task.deadline)
    const [taskPriority, setTaskPriority] = useState(task.priority)
    const [taskTitleError, setTaskTitleError] = useState('')

    useEffect(() => {
        setTaskTitle(task.title)
        setTaskDescription(task.description)
        setTaskDate(task.deadline)
        setTaskPriority(task.priority)
    }, [task])

    const handleCurrentTaskTitle = (title) => {
        setTaskTitle(title)
        const existingTitle = tasks.find((t) => t.title === title)
        setTaskTitleError("")
        if (existingTitle) {
            setTaskTitleError("Task title must be distinct!")
        }
    }

    const handleClose = () => {
        setOpen(false)
        setTimeout(() => {
            setTaskTitle('')
            setTaskDescription('')
            setTaskDate('')
            setSelectedTask({ title: '', description: '', deadline: '', priority: "low", isComplete: false })
            setHideTaskTitle(false)
        }, 100)
    }

    const handleAdd = () => {
        if (!taskTitleError && taskTitle && taskDescription && taskDate) {
            const newTask = {
                title: taskTitle,
                description: taskDescription,
                deadline: taskDate,
                priority: taskPriority,
                isComplete: false
            }
            setTasks(tasks.concat(newTask))
            setToastOpen(true)
            setToastMessage("Task successfully added!")
            handleClose()
        }
    }

    const handleUpdate = () => {
        if (taskDescription && taskDate) {
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
            setToastOpen(true)
            setToastMessage("Task successfully updated!")
            handleClose()
        }
    }

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
                {!hideTaskTitle && <TextField
                    id="task-title"
                    label="Title"
                    required={true}
                    error={taskTitle === "" || taskTitleError !== ""}
                    helperText={taskTitle === "" ? "Title is required!" : taskTitleError}
                    value={taskTitle}
                    onChange={({ target }) => handleCurrentTaskTitle(target.value)}
                    sx={{ my: 1 }}
                />}

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
                    <DatePicker
                        label="Deadline"
                        value={taskDate}
                        onChange={(selectedDate) => setTaskDate(selectedDate)}
                        sx={{ my: 1 }}
                        slotProps={{
                            textField: {
                                error: !taskDate,
                                helperText: !taskDate ? "Deadline is required!" : "",
                                required: true
                            }
                        }}
                    />
                </LocalizationProvider>

                <FormLabel id="priority-radio-group" sx={{ mt: 1 }}>Priority</FormLabel>
                <RadioGroup
                    aria-labelledby="priority-radio-group"
                    value={taskPriority}
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
                        sx={{
                            width: "100px",
                            backgroundColor: "red",
                            '&:hover': {
                                backgroundColor: '#DC143C',
                            }
                        }}
                        startIcon={<DoDisturbAltIcon />}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Stack>
            </FormControl>
        </Dialog>
    )
}

export default TaskDialog