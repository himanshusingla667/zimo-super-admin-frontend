import { Link } from 'react-router-dom'
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import * as Apis from '../../context/Api'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';
import Spinner from '../../Components/spinner/Spinner';
import Info from '../../context/Info';

// delete mui button
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
// delete mui button close

export default function Listdepartment() {
    const [spinner, setspinner] = useState(true)
    const [totalCount, settotalCount] = useState(0)
    const [list, setlist] = useState([]);
    const [sortOrder, setsortOrder] = useState("asc")
    const [deletId, setdeletId] = useState('')
    const [open, setOpen] = useState(false);
    const [status, setstatus] = useState("true")
    const [delStatus, setdelStatus] = useState('false')
    
    const [searchTerm, setsearchTerm] = useState("")
    const [srpage, setsrpage] = useState(1);
    


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // let key = JSON.parse(localStorage.getItem('userinfo'))._id
    let Count = 5

    const sorting = (col) => {
        if (sortOrder === "asc") {
            const sorted = [...list].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setlist(sorted);
            setsortOrder("dsc")
        }
        if (sortOrder === "dsc") {
            const sorted = [...list].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setlist(sorted);
            setsortOrder("asc")
        }
    }
 
   

   
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


    const getData = (page) => {
        let data = {

            createdById: Info.userInfo._id,
            count: Count,
            page: page,
            searchText: searchTerm,
            isActive: status,
            isDeleted: delStatus,

        }

        axios.post(Apis.departmentlist(), data).then((response) => {

            setlist(response.data.data)
            settotalCount(response.data.totalCount)
            setspinner(false)
            setsrpage(page)
            
        })
    };

    const deleteTitle = (_id) => {

        axios.post(Apis.departmentDelet(), {
            _id: _id,

        }).then((response) => {
            toast(response.data.message);
            getData(1)
            setOpen(false);
        })

    }

    return (
        <div>
            {
                spinner && <Spinner />
            }
            
            <div className="container">
           
            <div className='row'>
            <h1 className="text-center m-4">DepartmentList</h1>
                    <div className="col-3   ">
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
                           
                            >Active</option>}
                            <option value="false">
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
                            <button className="btn btn-danger " onClick={() => {
                                setsearchTerm('')
                                setdelStatus('false')
                                setstatus('true')
                               
                            }}> clear</button>
                        </span>
                    </div>
                    <div className="col-1">
                   
                    <div className="text-left">
                        <Link className="btn btn-warning " to="/department/add">
                            Add
                        </Link>
                    </div>
                </div>
                </div>
               
                { list.length>0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" >S.no</th>
                            <th scope="col" onClick={() => sorting("title")}>Title<i className="bi bi-chevron-down"></i></th>
                            <th scope="col" >Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, index) => (

                                <tr key={item._id}>
                                    <th scope="row">{Count * (srpage - 1) + index + 1}</th>
                                    <td>{item.title} </td>
                                    <td>
                                        <Link className="btn btn-success m-2" to={`/department/edit/${item._id}`}  ><i className="bi bi-pencil-square"></i></Link>

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
                                                <Button onClick={() => { deleteTitle(deletId) }}>Yes </Button>

                                            </DialogActions>
                                        </Dialog>
                                    </td>
                                </tr>
                            )
                            )}

                    </tbody>
                </table>
                ): <div className='text-center mt-5'>No record found</div>}
                <div>
                { totalCount > Count ? (
                <div className="d-flex justify-content-center m-4">

                    <Pagination
                        count={Math.ceil(totalCount / Count)}
                        showFirstButton
                        showLastButton
                        onChange={(event, value) => {
                            getData(value)
                        }}
                    />
                </div>
                   ): null}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}




