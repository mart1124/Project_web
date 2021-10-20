import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Popup from '../componants/Popup';
import ConfirmDialog from '../componants/ConfirmDialog';
import Notification from '../componants/Notification';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Toolbar } from '@mui/material';
import Controls from '../componants/Controls';
import DisplayImage from '../componants/DisplayImage';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import RestoreIcon from '@mui/icons-material/Restore';
import PageHeader from '../componants/PageHeader';


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
        
    },
    table: {
      marginTop : theme.spacing(3),
      '& thead th': {
          fontWeigh: '600',
          color: '#f5f5f5',
          backgroundColor: theme.palette.primary.light
          
      },
      '& tbody td': {
          fontWeigh: '300',
      },
      '& tbody tr:hover': {
          backgroundColor: '#fffbf2',
          cursor: 'pointer'
      }
    },
    imageshow: {
        width: 100,
        height: 75
    }
    
  }));

function RecoverData() {

    const [recoverDataTbl, setRecoverDataTbl] = useState()
    const [recordData, setRecordData] = useState()
    const [isLoaded, setIsLoaded] = useState(false);
    const [onRecov, setOnRecov] = useState(false);
    const pages = [5, 15, 25]
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
    const [notify, setNotify] = React.useState({isOpen: false, massage:'', type:''});
    const [confirmDialog, setConfirmDialog] = React.useState({isOpen:false , title:'', subTitle:''})
    const [openPopup, setOpenPopup] = useState()
    const classes = useStyles();

    async function fetchRecoverData(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/getdata/recovery',
          })
            .then(response => {
                const responseData = response.data.datarecov
                setRecoverDataTbl(responseData)
                setIsLoaded(true)
            })
            .catch(err => {
              console.error(err)
            })
    }

    async function dataRecover(item){
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/data/recovery',
            params: { id : item.id }
          })
            .then(response => {
                console.log(response.data.massage)
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })
                setNotify({
                    isOpen: true,
                    massage: response.data.massage,
                    type: 'success'
                })
                setOnRecov(true)
            })
            .catch(err => {
              console.error(err)
            })
    }

    useEffect(() => {
        
        if (onRecov === true) {
            setOnRecov(false)
        }
        fetchRecoverData();
        
    }, [onRecov]);

    const openInPopup = pictureName => {
        setRecordData(pictureName)
        setOpenPopup(true)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    const recordsAfterPagingAndSorting = () => {
        return recoverDataTbl.slice(page*rowsPerPage, (page+1)*rowsPerPage)
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
                        title='Recovery Data'
                        icon= {<RestoreIcon fontSize='large' color='primary' />}
                    />
                </Toolbar>
                <TableContainer square = "true" >
                <Table className={classes.table} aria-label="Video table"  size="small" >
                    <TableHead>
                    <TableRow >
                        <TableCell align="center" width='10%'>Date</TableCell>
                        <TableCell align="center" width='10%'>Time</TableCell>
                        <TableCell align="center" width='10%'>Type</TableCell>
                        <TableCell align="center">Picture</TableCell>
                        <TableCell align="center" width='20%'>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.createdAt.split(' ')[0] }</TableCell>
                                    <TableCell align="center">{item.createdAt.split(' ')[1]}</TableCell>
                                    <TableCell align="center">{item.type}</TableCell>
                                    <TableCell align="center">
                                        
                                        <Controls.ActionButton
                                            variant="text"
                                            color="primary"
                                            onClick={() => {openInPopup(item.name)}} >
                                            <img src={`http://localhost:3001/resources/upload/img/${item.name}`} alt="image-Show" className={classes.imageshow} />
                                        </Controls.ActionButton>
                                        
                                    </TableCell>
                                    
                                    <TableCell align="center">
                                        {/* Delete Button */}
                                        <Controls.ActionButton
                                            variant="text"
                                            color="warning" 
                                            onClick={() => 
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: "Are you sure you want to Reovery ?",
                                                    subTitle: "This information is publicly available.",    
                                                    onConfirm: () => { dataRecover(item) }
                                            })}> 
                                            
                                            <RestoreFromTrashIcon sx={{ fontSize: 28 }}  color='pimary'/>
                                        </Controls.ActionButton>
                                        
                                    </TableCell>
                    
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={pages}
                        rowsPerPage={rowsPerPage}
                        count={recoverDataTbl.length}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                    </TableFooter>
                    </Table>
                    
                </TableContainer>
            </Paper>
            </div>
        </Container>
        <Notification
            notify = {notify}
            setNotify = {setNotify}
        />
        <ConfirmDialog 
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
        />
        <Popup 
            title='HelmetDetection'
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
        >
            <DisplayImage recordData={recordData} />
        </Popup>
        </>
    )
}

export default RecoverData
