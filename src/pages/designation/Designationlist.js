import {  makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import * as Apis from '../../enviornment/Apis'
import './designation.css';
import Pagination from '@mui/material/Pagination';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';



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
    //Pagination starts
    // const [page, setPage] = useState(1);
    const [totalCount, settotalCount]=useState([]);
    let Count= 4

    
    // pagination ends
    useEffect(
        () => {
            getData(1)

        }, []
    )
    const getData = (page) => {
        let data = {
            createdById: "61a0dab0777b848f7b22f811",
            page:page,
            count:Count
        }
        axios.post(Apis.deslist(), data).then((response) => {
            setUsers(response.data.data)
            settotalCount(response.data.totalCount)
        })

    };

    const deleteUserData = (_id) => {
        axios.post(Apis.delDes(), {
            _id: _id
        }).then((response) => {
            getData()
            toast(response.data.message);
        })

    }

    return (
        <div>
            <Link to="/adddesignation" className="btn btn-primary marginleft">Add New Designation</Link>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >

                            <TableCell>S.No</TableCell>

                            <TableCell>department</TableCell>

                            <TableCell>Designation</TableCell>

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
                                        {user.designationTitle}
                                    </TableCell>

                                    <TableCell>
                                    <Link className="btn btn-success m-2" to={`/editdesignation/${user._id}`} ><i className="bi bi-pencil-square"></i></Link>
                                        <button className="btn btn-danger" onClick={() => { deleteUserData(user._id) }} ><i className="bi bi-trash"></i></button>
                                    </TableCell>
                                </TableRow>
                            ))
                            
                        }
                    </TableBody>
                    
                </Table>
                    <div className=" d-flex justify-content-center m-4">
                    <Pagination 
                    count={Math.ceil(totalCount/Count)}
                    
                    onChange={(event,value)=>getData(value)}
                    shape="rounded"
                    
                    />
                    </div>
            </TableContainer>
            <ToastContainer />
        </div>

    )
}
