import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'; 
import Action from '../../actions'
import {connect} from 'react-redux'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const EditTask = (props) => {
    const {open, setOpen, id, complete, bucketAllList, task} = props
    const [name, setEdit] = useState(props.name)
    const [bucket, setBucket] = useState(props.bucket)
    const [bucketName, setBucketName] = useState('')
    const [error, setError] = useState(false)
    const classes = useStyles();

    const formSubmit = (e) => {
        e.preventDefault()

        const c = [...task]
        const checkIfAlreadyPresent = c.filter(v => v.name === name && v.id !== id)
        if (!name || (!bucketName && bucket === 5)){
            setError('Fill All Details')
        }else if (checkIfAlreadyPresent && checkIfAlreadyPresent.length<=0){
            let r = {id, name, complete, bucket, type:'update'}
            if (bucketName) r = {...r, bucket:bucketName}
            props.taskAction(r)
            setEdit('')
            setBucket('')
            setOpen(false)
        }else{
            setError('This to do is already added!')
        }
        
    }

    const handleClose = () => {
        setEdit('')
        setOpen(false)
    }

    const changeBucketList = (e) => {
        setBucket(e.target.value)
        if (error) setError(false)
    }

    const updateBucketName = (e) => {
        setBucketName(e.target.value)
        if (error) setError(false)
    }

    const updateTask = (e) => {
        setEdit(e.target.value)
        if (error) setError(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
               
            <Fade in={open}>
            <div className={classes.paper} >
                { error &&
                <div className='error-wrapper'>
                    <span>{error}</span>
                </div>
                }
                <h2 id="transition-modal-title">Edit Task</h2>
                <form onSubmit={formSubmit} autoComplete="off">
                    <div>
                        <TextField id="edit-task" value={name} label="Edit Task" paceholder="" name="task" type="text" onChange={updateTask} required/>
                    </div>
                    <div style={{margin:'10px 0'}}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={bucket}
                            style={{width:'100%'}}
                            onChange={changeBucketList}
                            >
                                {bucketAllList.map((v,i) => 
                                <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                )}
                        </Select>
                    </div>
                    {bucket === 5 ?
                        <div>
                            <TextField id="edit-task" value={bucketName} label="Edit Task" paceholder="" name="task" type="text" onChange={updateBucketName}/>
                        </div>
                        :
                        <></>
                    }
                    <div>   
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
            </Fade>
        </Modal>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        bucketAllList: state.task.bucket,
        task: state.task.task
    }
}

const mapDispatchToProps = {
    ...Action
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);