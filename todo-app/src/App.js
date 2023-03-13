import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Toast from './components/Toast'
import Header from './components/Header'
import Tasks from './components/Tasks'
import TaskDialog from './components/TaskDialog'

const App = () => {
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')
    const [selectedTask, setSelectedTask] = useState({ title: '', description: '', deadline: '', priority: "low", isComplete: false })
    const [hideTaskTitle, setHideTaskTitle] = useState(false)
    const [tasks, setTasks] = useState([])


    const handleClickAdd = () => {
        setDialogTitle('Add Task')
        setDialogOpen(true)
    }

    const handleClickUpdate = (task) => {
        setDialogTitle('Edit Task')
        setSelectedTask(task)
        setHideTaskTitle(true)
        setDialogOpen(true)
    }

    return (
        <Grid container spacing={1}>
            <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} setMessage={setToastMessage} />
            <TaskDialog
                dialogTitle={dialogTitle}
                task={selectedTask}
                setSelectedTask={setSelectedTask}
                tasks={tasks}
                setTasks={setTasks}
                open={dialogOpen}
                setOpen={setDialogOpen}
                setToastOpen={setToastOpen}
                setToastMessage={setToastMessage}
                hideTaskTitle={hideTaskTitle}
                setHideTaskTitle={setHideTaskTitle}
            />
            <Grid item width="100%">
                <Header handleClickAdd={handleClickAdd} />
            </Grid>
            <Grid item width="100%">
                <Tasks
                    tasks={tasks}
                    setTasks={setTasks}
                    handleClickUpdate={handleClickUpdate}
                    setToastOpen={setToastOpen}
                    setToastMessage={setToastMessage}
                />
            </Grid>
        </Grid>
    )
}

export default App