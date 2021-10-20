import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, TablePagination , TableFooter} from '@mui/material';
import axios from 'axios';

import Notification from './Notification';
import Controls from './Controls';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PrintIcon from '@mui/icons-material/Print';

import ConfirmDialog from './ConfirmDialog';
import Popup from './Popup';
import DisplayImage from './DisplayImage';


const useStyles = makeStyles((theme) => ({
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
    },
   
  }));

function Tableshow (props) {
    const { listVideo, setListVideo , onRemove , user} = props
    const [recordData, setRecordData] = React.useState()
    const pages = [5, 15, 25]
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
    const [notify, setNotify] = React.useState({isOpen: false, massage:'', type:''});
    const [confirmDialog, setConfirmDialog] = React.useState({isOpen:false , title:'', subTitle:''})
    const [openPopup, setOpenPopup] = useState()
    const classes = useStyles();


    const handleClickRemove = (event) => {
        setListVideo({...listVideo, isReload: true})
        axios({
            method: 'get',
            url: 'http://localhost:3001/removevideo',
            params: {id: event.id}
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
                onRemove(true)
                
            })
            .catch(err => {
              console.error(err)
            })
        
     };
    const handleClick = (event) => {
        let{ id, name } = event
        window.open(`http://localhost:3600/print/${id}/${name}`);     
    };

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
        return listVideo.listData.data.slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    return (
        <>
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
                               
                                {
                                user ? (
                                <>
                                <Controls.ActionButton
                                    variant="text"
                                    color="secondary" 
                                    onClick={() => 
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: "Are you sure you want to delete ?",
                                            subTitle: "You can't undo this operation",    
                                            onConfirm: () => { handleClickRemove(item) }
                                    })}> 
                                    
                                    <DeleteRoundedIcon sx={{ fontSize: 28 }} color='error'/>
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    variant="text"
                                    color='primary'
                                    onClick={() => {
                                        handleClick(item)
                                    }} >
                                    <PrintIcon sx={{ fontSize: 28 }}  />
                                </Controls.ActionButton>
                            </>
                            ): 
                            <Controls.ActionButton
                                variant="text"
                                color='primary'
                                onClick={() => {
                                    handleClick(item)
                                }} >
                                <PrintIcon sx={{ fontSize: 28 }}  />
                            </Controls.ActionButton>
                        }
                                
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
                count={listVideo.listData.data.length}
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

export default Tableshow
