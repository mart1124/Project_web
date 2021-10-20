import { Table, TableBody, TableRow, TableCell, TableHead, TablePagination, TableFooter, TableContainer} from '@mui/material'
import React from 'react'
import Controls from './Controls'
import axios from 'axios'
import { makeStyles} from '@material-ui/core/styles';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Notification from './Notification';
import ConfirmDialog from './ConfirmDialog';

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
        }
      },
  }));

function TableUserShow(props) {

    const { userdata, onRemove } = props
    const pages = [10, 15, 25]
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
    const [confirmDialog, setConfirmDialog] = React.useState({isOpen:false , title:'', subTitle:''})
    const [notify, setNotify] = React.useState({isOpen: false, massage:'', type:''});
    const classes = useStyles()

    const handleClickRemoveUser = (event) => {
        axios({
            method: 'delete',
            url: 'http://localhost:3001/api/delete',
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
                    type: 'error'
                })
                onRemove(true)
                
            })
            .catch(err => {
              console.error(err)
            })
        
    };
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const recordsAfterPagingAndSorting = () => {
        return userdata.slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }
    
    return (
        <>
        <TableContainer>
        <Table className={classes.table} aria-label="Video table"  size="small">
            <TableHead>
                <TableRow >
                    <TableCell align="center" width='10%'>ID</TableCell>
                    <TableCell align="center" width='10%'>Name</TableCell>
                    <TableCell align="center" width='10%'>Username</TableCell>
                    <TableCell align="center" width='10%'>Role</TableCell>
                    <TableCell align="center" width='10%'>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {   
                userdata !== null ? (
                    recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => 
                        (
                        <TableRow key={item.id} >
                            <TableCell align="center" width='10%'>{item.id}</TableCell>
                            <TableCell align="center" width='10%'>{item.name}</TableCell>
                            <TableCell align="center" width='10%'>{item.email}</TableCell>      
                            <TableCell align="center" width='10%'>{item.permission === 1 ? ('Admin'): 'User' }</TableCell>
                            <TableCell align="center" width='10%'>
                                <Controls.ActionButton
                                    variant="text"
                                    color="secondary" 
                                    onClick={() => 
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: "Are you sure you want to delete ?",
                                            subTitle: "You can't undo this operation",    
                                            onConfirm: () => { handleClickRemoveUser(item) }
                                    })}
                                > 
                                    <DeleteRoundedIcon color='error'/>
                                </Controls.ActionButton>
                            </TableCell>
                        </TableRow>
                        )
                    )
                ): <li> Not have data </li>
               
            }
        </TableBody>
        <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={pages}
                rowsPerPage={rowsPerPage}
                count={userdata.length}
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
        </>
    )
}

export default TableUserShow

