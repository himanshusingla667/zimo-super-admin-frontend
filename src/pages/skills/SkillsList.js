import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Info from '../../context/Info';
import * as Apis from '../../context/Api'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../Components/spinner/Spinner';
import Switch from '@mui/material/Switch';

export default function SkillsList() {

    const [skills, setskills] = useState([]);
    const [totalcount, settotalcount] = useState([]);
    const [pageNbr, setpageNbr] = useState()
    const [deletId, setdeletId] = useState('')
    const [open, setOpen] = useState(false);
    const [sortOrder, setsortOrder] = useState("asc")
    const [status, setstatus] = useState("true")
    const [delStatus, setdelStatus] = useState('false')
    const [searchTerm, setsearchTerm] = useState("")
    const [spinner, setspinner] = useState(true)
    const [clear, setClear] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const sorting = (col) => {
        if (sortOrder === "asc") {
            const sorted = [...skills].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setskills(sorted);
            setsortOrder("dsc")
        }
        if (sortOrder === "dsc") {
            const sorted = [...skills].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setskills(sorted);
            setsortOrder("asc")
        }
    }

    let count = 4;

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
        let Data = {

            userId: Info.userInfo._id,
            count: count,
            page: page,
            searchText: searchTerm,
            isActive: status,
            isDeleted: delStatus

        };

        axios.post(Apis.skillsList(), Data).then((response) => {
            setskills(response.data.data);
            settotalcount(response.data.totalCount);
            setpageNbr(page)
            setspinner(false)

        })
    }

    const activeStatus = (_id,toggle) => {
        let activeData = {
            _id: _id,
            userId: Info.userInfo._id,
            isActive: toggle

        }
        axios.post(Apis.skillsStatus(), activeData, { headers: { 'x-access-token': Info.token } }).then((response) => {
            getData(1);
            toast(response.data.message);

        })
    }
    const deleteData = (_id) => {
        let delData = {
            _id: _id,
            userId: Info.userInfo._id,
            createdById: Info.userInfo._id,
            companyId: Info.userInfo.companyId

        }
        axios.post(Apis.skillsDelete(), delData, { headers: { 'x-access-token': Info.token } }).then((response) => {
            getData();
            toast(response.data.message);
            setOpen(false);
        })

    }

    return (
        <div className='container'>
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
                                    console.log(status);
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






            <div>
                <div className="text-left d-flex justify-content-end">
                    <Link className="btn btn-warning " to="/addSkilss">
                        <h4>Add Skills</h4>
                    </Link>
                </div>
            </div>
            {skills.length > 0 ? (

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" >S.no</th>
                            <th scope="col" onClick={() => sorting("title")}>Skills<i className="bi bi-chevron-down"></i></th>
                            <th scope="col" >Actions</th>
                            <th scope="col" >Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            skills.map((item, index) => (

                                <tr key={item._id}>
                                    <th scope="row">{count * (pageNbr - 1) + index + 1}</th>
                                    <td className="col-2">{item.title} </td>
                                    <td className="col-2">{item.countryTitle} </td>


                                    <td >
                                        <Link className="btn btn-success m-2" to={`/editSkills/${item._id}`}  ><i className="bi bi-pencil-square"></i></Link>

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
                                                <Button onClick={() => { deleteData(deletId) }}>Yes </Button>

                                            </DialogActions>
                                        </Dialog>
                                    </td>
                                    <td>

                                        <Switch {...label} defaultChecked={item.isActive}
                                            onClick={(e) => {
                                                activeStatus(item._id, item.isActive)

                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                            )}

                    </tbody>
                </table>
            ) : <div className='text-center mt-5'>No record found</div>}
            {
                totalcount > count ? (
                    <div className=" d-flex justify-content-center m-4">
                        <Pagination
                            count={Math.ceil(totalcount / count)}
                            onChange={(event, value) => {
                                getData(value)
                            }}
                            shape="rounded"
                        />
                    </div>
                ) : null}
            <ToastContainer />
        </div>
    )
}
