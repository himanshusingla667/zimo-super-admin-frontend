import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Spinner from '../../Components/spinner/Spinner';
import * as Apis from '../../context/Api'
import './designation.css';
import Info from '../../context/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';


import Switch from '@mui/material/Switch';


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
    const [spinner, setspinner] = useState(true)
    const [clear, setClear] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    //seacrh bar start
    const [searchTerm, setsearchTerm] = useState("")
    //seacrh bar ends
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

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
    const resetFilters = () => {
        setsearchTerm('')
        setdelStatus('false')
        setstatus('true')
        setClear(!clear)
    }


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









    const classes = useStyle();


    const resetFilters = () => {

        setsearchTerm('')
        setdelStatus('false')
        setstatus('true')
        setClear(!clear)
        }

    useEffect(
        () => {
            getData(1)
        }, [clear]
    )
    const getData = (page) => {
        let data = {
            createdById: Info.userInfo._id,
            companyId: Info.userInfo.companyId,
            searchText: searchTerm,
            page: page,
            count: Count,
            isActive: status,
            isDeleted: delStatus

        }

        axios.post(Apis.deslist(), data).then((response) => {
            setUsers(response.data.data)
            settotalCount(response.data.totalCount)
            setspinner(false)
            setsrpage(page)


        })

    };
    const activeStatus = (_id,toggle) => {
        let activeData = {
            _id: _id,
            userId: Info.userInfo._id,
            isActive: toggle

        }
        axios.post(Apis.desToggle(), activeData, { headers: { 'x-access-token': Info.token } }).then((response) => {
            getData(1);
            toast(response.data.message);

        })
    }


    const activeStatus = (_id, toggle) => {
        let activeData = {
            _id: _id,
            userId: Info.userInfo._id,
            isActive: toggle

        }
        axios.post(Apis.desToggle(), activeData, { headers: { 'x-access-token': Info.token } }).then((response) => {
            getData(1);
            toast(response.data.message);

        })
    }

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
            {
                spinner && <Spinner />
            }
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
                        }} className="form-select" aria-label="Default select example">

                            {<option value="true">Active</option>}
                            <option value="false" >
                                In active</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <select onChange={(e) => {
                            setdelStatus(e.target.value)
                        }} className="form-select" aria-label="Default select example">
                            <option defaultValue={'value'}>Delete Status</option>

                            <option value="true">Deleted</option>
                            <option value="false">Not Deleted</option>
                        </select>
                    </div>
                    <div className='col-1'>
                        <span>
                            <button type="submit" className="btn btn-primary " onClick={() => {
                                if (searchTerm || status || delStatus) {
                                    
                                    getData(1)
                                }

                            }} >Search</button></span>
                    </div>
                    <div className='col-1'>
                        <span>
                        <button className="btn btn-danger " onClick={resetFilters}> clear</button>

                        </span>
                    </div>
                </div>
            </div>

            <Link to="/adddesignation" className=" btn btn-primary ">Add New Designation</Link>
            {users.length > 0 ? (

<table className="table">
    <thead>
        <tr>
            <th scope="col" >S.no</th>
            <th scope="col" onClick={() => sorting("title")}>State<i className="bi bi-chevron-down"></i></th>
            <th scope="col" onClick={() => sorting("title")}>Country<i className="bi bi-chevron-down"></i></th>
            <th scope="col" >Actions</th>
            <th scope="col" >Status</th>

        </tr>
    </thead>
    <tbody>
        {
            users.map((item, index) => (

                <tr key={item._id}>
                    <th scope="row">{Count * (srpage - 1) + index + 1}</th>
                    <td className="col-2">{item.title} </td>
                    <td className="col-2">{item.countryTitle} </td>


                    <td >
                        <Link className="btn btn-success m-2" to={`/StateEdit/${item._id}`}  ><i className="bi bi-pencil-square"></i></Link>

                        <button className="btn btn-danger" onClick={() => {
                            setdeletId(item._id)
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
                    </td>
                    <td>
                        
                        <Switch {...label} defaultChecked={item.isActive}
                            onClick={(e) => {
                                activeStatus(item._id,item.isActive)

                            }}
                        />
                    </td>
                </tr>
            )
            )}

    </tbody>
</table>
) : <div className='text-center mt-5'>No record found</div>}


            <ToastContainer />

        </div>


    )
}
