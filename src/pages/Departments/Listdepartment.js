import { Link } from 'react-router-dom'
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import * as Apis from '../../context/Api'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';
import Spinner from '../../Components/spinner/Spinner';
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
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let key = JSON.parse(localStorage.getItem('userinfo'))._id
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
 
   

    useEffect(() => {
        getdata(1)
    }, [])

    const getdata = (page) => {
        let data = {

            createdById: key,
            count: Count,
            page: page

        }

        axios.post(Apis.departmentlist(), data).then((response) => {

            setlist(response.data.data)
            settotalCount(response.data.totalCount)
            setspinner(false)

        })
    };

    const deleteTitle = (_id) => {

        axios.post(Apis.departmentDelet(), {
            _id: _id,

        }).then((response) => {
            toast(response.data.message);
            getdata()
            setOpen(false);
        })

    }

    return (


        <div>
            {
                spinner && <Spinner />
            }
            <div className="container">
                <div>
                    <h3 className="text-center">   Department list</h3>
                    <div className="text-left d-flex justify-content-end">
                        <Link className="btn btn-warning " to="/department/add">
                            <h4>Add Department</h4>
                        </Link>
                    </div>
                </div>

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
                                    <th scope="row">{index + 1}</th>
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
                <div className="d-flex justify-content-center m-4">

                    <Pagination
                        count={Math.ceil(totalCount / Count)}
                        showFirstButton
                        showLastButton
                        onChange={(event, value) => {
                            getdata(value)
                        }}

                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}




