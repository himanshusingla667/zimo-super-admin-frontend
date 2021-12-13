import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import * as Apis from '../../context/Api'
import './designation.css';
import Pagination from '@mui/material/Pagination';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Info from '../../context/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';


const useStyle = makeStyles({
    table: {
        width: '70%',
        margin: '10px 0 0 100px',
        fontSize: '50'
    },
    thead: {
        '& > *': {
            background: '#000000',
            color: '#ffffff'
        }
    }
})
export default function Designationlist() {

    const [users, setUsers] = useState([]);
    const [active, setactive] = useState('false')
    //
    const [sortOrder, setsortOrder] = useState("asc")
    const [deletId, setdeletId] = useState('')
    const [open, setOpen] = useState(false);
    const [searchTerm, setsearchTerm] = useState(" ")
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const sorting = (col) => {
        if (sortOrder === "asc") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted);
            setsortOrder("dsc")
        }
        if (sortOrder === "dsc") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted);
            setsortOrder("asc")
        }
    }
    //




    //seacrh bar start
    //seacrh bar ends


    //Pagination starts 
    const [totalCount, settotalCount] = useState([]);
    let Count = 4
    // pagination ends

    const classes = useStyle();


    useEffect(
        () => {
            getData(1)
            setsearchTerm()
        }, [active]
    )
    


    const getData = (page ) => {
        let data = {
            createdById: Info.userInfo._id,

            searchText: searchTerm,
            page: page,
            count: Count,
            isDeleted: active,

        }

        axios.post(Apis.deslist(), data).then((response) => {
            setUsers(response.data.data)
            settotalCount(response.data.totalCount)
            console.log(response.data.totalCount)

        })

    };

    const deleteUserData = (_id) => {
        axios.post(Apis.delDes(), {
            _id: _id
        }).then((response) => {
            getData(1);
            toast(response.data.message);
            setOpen(false);
        })

    }

    return (
        <div className={classes.table}>
            <form>
            <input type="text" placeholder="Search..." value={searchTerm || ''} className="form-control mb-2"
                onChange={(e) => {
                    setsearchTerm(e.target.value)
                }}
            /></form><span>
                <button  className="btn btn-primary m-1" onClick={() => {
                    if (searchTerm) {
                        getData(1)
                    }

                }} >Search</button></span>
            <span>
                <button className="btn btn-danger m-2" onClick={ () => {
                        setsearchTerm('')
                         getData(1)

                }}> clear</button>
            </span><span><Link to="/DesDelList" className='btn btn-secondary'>Trash</Link></span>
            <span>
                <div className="dropdown side" >
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" onClick={() => {
                            setactive("true")
                            // getData(0)
                        }} >deleted</a></li>
                        <li><a className="dropdown-item" onClick={() => {
                            setactive("false")
                            // getData(0)
                        }}>not deleted</a></li>
                        <li><a className="dropdown-item" >Something else here</a></li>
                    </ul>
                </div>
            </span><br />
            <Link to="/adddesignation" className="btn btn-primary marginleft">Add New Designation</Link>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow >

                            <TableCell>S.No</TableCell>

                            <TableCell onClick={() => sorting("title")}>department<i className="bi bi-chevron-down"></i></TableCell>

                            <TableCell onClick={() => sorting("title")}>Designation <i className="bi bi-chevron-down"></i></TableCell>

                            <TableCell>Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((user, index) => (
                                <TableRow key={index}>

                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {user.departmentTitle}
                                    </TableCell>

                                    <TableCell>
                                        {user.title}
                                    </TableCell>

                                    <TableCell>
                                        <Link className="btn btn-success m-2" to={`/editdesignation/${user._id}`} ><i className="bi bi-pencil-square"></i></Link>
                                        <button className="btn btn-danger" onClick={() => {
                                            setdeletId(user._id)
                                            handleClickOpen()
                                        }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="draggable-dialog-title"
                                        >
                                            <DialogContent>
                                                <DialogContentText>
                                                    Are you sure to delete this information..?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleClose}>
                                                    No
                                                </Button>
                                                <Button onClick={() => { deleteUserData(deletId) }}>Yes </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))

                        }
                    </TableBody>

                </Table>
                <div className=" d-flex justify-content-center m-4">
                    <Pagination
                        count={Math.ceil(totalCount / Count)}

                        onChange={(event, value) => getData(value)}
                        shape="rounded"

                    />
                </div>
            </TableContainer>
            <ToastContainer />
        </div>

    )
}
