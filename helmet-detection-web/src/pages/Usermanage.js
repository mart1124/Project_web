import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PageHeader from '../componants/PageHeader'
import { makeStyles} from '@material-ui/core/styles';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { Button, Container, Paper, Toolbar } from '@mui/material';import TableUserShow from '../componants/TableUserShow';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Popup from '../componants/Popup';
import Register from './Register';


const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(2),
        width: '100%'
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newUserButton: {
        position: 'absolute',
        
    }
  }));


function Usermanage() {

    const classes = useStyles()
    const [userData, setUserData] = useState()
    const [onAddUser, setOnAddUser] = useState(false)
    const [openPopup, setOpenPopup] = useState()
    const [onRemove, setOnRemove] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);

    async function fetchData(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/getuser',
          })
            .then(response => {
                const responseData = response.data.userData
                setUserData(responseData)
                setIsLoaded(true)
            })
            .catch(err => {
              console.error(err)
            })
    }

    useEffect(() => {
        
        if (onRemove === true) {
            setOnRemove(false)
        }
        if (onAddUser === true) {
            setOnRemove(false)
        }
        fetchData();
        
    }, [onRemove,onAddUser]);

    const openInPopup = () => {
        setOpenPopup(true)
    }

    if (isLoaded !== true){
        return <div></div>
    }
    return (
        <>
        <Container component='main'>
        <div className={classes.main}>
            <Paper Container className={classes.pageContent}>
                <Toolbar  style={{display:"flex", justifyContent:"space-between"}}> 
                    <PageHeader 
                        title='User Management'
                        icon= {<PeopleOutlinedIcon fontSize='large' color='primary' />}
                    />
                    <Button
                        
                        variant='contained'
                        color='success'
                        startIcon={<PersonAddIcon />}
                        className={classes.newUserButton}
                        onClick={() => openInPopup()}
                    >
                        Add New User
                    </Button>
                </Toolbar>
                <TableUserShow userdata={userData} onRemove={setOnRemove} onAddUser={setOnAddUser} />
                
            </Paper>
        </div>
        </Container>
        
        <Popup 
            title='ADD NEW USER'
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
        >
            <Register setOpenPopup={setOpenPopup} setOnAddUser={setOnAddUser} />
        </Popup> 
        </>   
    )
}

export default Usermanage
