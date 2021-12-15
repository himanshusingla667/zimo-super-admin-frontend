import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

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
    const [status, setstatus] = useState("true")
    const [delStatus, setdelStatus] = useState('false')
    //
    const [sortOrder, setsortOrder] = useState("asc")
    const [deletId, setdeletId] = useState('')
    const [open, setOpen] = useState(false);
    const [srpage, setsrpage] = useState(1);

    
  

    //seacrh bar start
    const [searchTerm, setsearchTerm] = useState("")
    //seacrh bar ends


    //Pagination starts 
    const [totalCount, settotalCount] = useState([]);
    let Count = 4
    // pagination ends




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









    const classes = useStyle();


   
    useEffect(
        () => {

                getData(1)
           
        }, []
    )

    useEffect(
        () => {
            if(status === 'true' ){
               

                getData(1)
            }
           
        }, [status]
    )
    useEffect(
        () => {
            if(delStatus === 'false'){
               

                getData(1)
            }
           
        }, [delStatus]
    )
    useEffect(
        () => {
            if(searchTerm === ''){
                

                getData(1)
            }
           
        }, [searchTerm]
    )



    // const getStatus=()=>{
    //     let statusData={
    //         _id: Info.userInfo._id,
    //         isActive: true
    //     }

    //     axios.post(Apis.desStatus(),statusData).then((response)=>{
    //         console.log("cfdd",response.data.data);
    //     })
    // }




    const getData = (page) => {
        let data = {
            createdById: Info.userInfo._id,

            searchText: searchTerm,
            page: page,
            count: Count,
            isActive: status,
            isDeleted: delStatus

        }

        axios.post(Apis.deslist(), data).then((response) => {
            setUsers(response.data.data)
            settotalCount(response.data.totalCount)

            setsrpage(page)


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
            <div>
                <div className='row'>
                    <div className="col-4">
                        <input type="text" placeholder="Search..." value={searchTerm} className="form-control mb-2"
                            onChange={(e) => {
                                setsearchTerm(e.target.value)
                            }}
                        ></input>
                    </div>
                    <div className="col-3">
                    
                        <select onChange={(e) => {
                            console.log(e.target.value)
                            setstatus(e.target.value)
                        }} class="form-select" aria-label="Default select example">
                            {/* <option selected>Active status</option> */}

                            {<option value="true"
                            // onInputChange={() => {
                            // setstatus("true")
                            // console.log('status');
                            // // getData(0)
                            // }}
                            >Active</option>}
                            <option value="false"
                            // 
                            >
                                In active</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <select onChange={(e) => {
                            setdelStatus(e.target.value)
                        }} class="form-select" aria-label="Default select example">
                            <option selected>Delete Status</option>

                            <option value="true">Deleted</option>
                            <option value="false">Not Deleted</option>
                        </select>
                    </div>
                    <div className='col-1'>
                        <span>
                            <button type="submit" className="btn btn-primary " onClick={() => {
                                if (searchTerm || status || delStatus) {
                                    console.log(status);
                                    getData(1)
                                }

                            }} >Search</button></span>
                    </div>
                    <div className='col-1'>
                        <span>
                            <button className="btn btn-danger " onClick={() => {
                                setsearchTerm('')
                                setdelStatus('false')
                                setstatus('true')
                               
                            }}> clear</button>
                        </span>
                    </div>
                </div>
            </div>


            <span>
                {/* <div className="dropdown side" >
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {active}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" onClick={() => {
                            setactive("true")
                            // getData(0)
                        }} >deleted</Link></li>
                        <li><Link className="dropdown-item" onClick={() => {
                            setactive("false")
                            // getData(0)
                        }}>not deleted</Link></li>
                        <li><Link className="dropdown-item" >Something else here</Link></li>
                    </ul>
                </div> */}

            </span><br />

            <Link to="/adddesignation" className=" btn btn-primary ">Add New Designation</Link>
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
                                        {Count * (srpage - 1) + index + 1}

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

                        onChange={(event, value) => {
                            getData(value)
                        }}
                        shape="rounded"

                    />
                </div>
            </TableContainer>
            <ToastContainer />

        </div>


    )
}
