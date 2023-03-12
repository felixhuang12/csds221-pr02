import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Toast from './components/Toast'
import Header from './components/Header'
import Tasks from './components/Tasks'
import TaskDialog from './components/TaskDialog'

const App = () => {
    const [toastOpen, setToastOpen] = useState(true)
    const [toastMessage, setToastMessage] = useState('aerf')
    const [toastMessageType, setToastMessageType] = useState('success')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('')
    const [selectedTask, setSelectedTask] = useState({ title: '', description: '', deadline: '', priority: "low", isComplete: false })

    function createData(title, description, deadline, priority, isComplete) {
        return { title, description, deadline, priority, isComplete }
    }

    // const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, false),
    //     createData('Ice cream sandwich', 237, 9.0, 37, true),
    //     createData('Eclair', 262, 16.0, 24, false)
    // ];

    const [tasks, setTasks] = useState([])


    const handleClickAdd = () => {
        console.log('add clicked')
        setDialogTitle('Add Task')
        setDialogOpen(true)
    }

    const handleClickUpdate = (task) => {
        console.log('update clicked')
        setDialogTitle('Edit Task')
        setSelectedTask(task)
        setDialogOpen(true)
    }

    console.log(selectedTask)

    const handleClickDelete = (task) => {
        console.log('delete clicked')
    }

    return (
        <Grid container spacing={1}>
            <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} setMessage={setToastMessage} messageType={toastMessageType} setMessageType={setToastMessageType} />
            <TaskDialog
                dialogTitle={dialogTitle}
                task={selectedTask}
                setSelectedTask={setSelectedTask}
                tasks={tasks}
                setTasks={setTasks}
                open={dialogOpen}
                setOpen={setDialogOpen}
            />
            <Grid item width="100%">
                <Header handleClickAdd={handleClickAdd} />
            </Grid>
            <Grid item width="100%">
                <Tasks tasks={tasks} setTasks={setTasks} handleClickUpdate={handleClickUpdate} handleClickDelete={handleClickDelete} />
            </Grid>
        </Grid>
    )
}

export default App
