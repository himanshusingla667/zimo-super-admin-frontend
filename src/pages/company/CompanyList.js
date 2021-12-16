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


export default function CompanyList() {

    const [company, setcompany] = useState([]);
    const [totalcount, settotalcount] = useState([]);
    const [pageNbr, setpageNbr]=useState()
    const [deletId, setdeletId] = useState('')
    const [open, setOpen] = useState(false);



    const handleClickOpen = () => {
        setOpen(true);
     };
     const handleClose = () => {
         setOpen(false);
     };

    let count = 5;


    useEffect(() => {
        getData(1)
    }
        , [])


    const getData = (page) => {
        let Data = {
            createdById: Info.userInfo._id,
            count: count,
            page: page,
            
        };

        axios.post(Apis.companyList(), Data).then((response) => {
            setcompany(response.data.data);
            settotalcount(response.data.totalCount);
            setpageNbr(page)
            
        })
    }


     const deleteData = (_id) => {
         let delData={
             _id: _id,
             userId:Info.userInfo._id

         }
         axios.post(Apis.companyDelete(),delData, {headers: {'x-access-token': Info.token}}).then((response) => {
             getData();
             toast(response.data.message);
             setOpen(false);
         })

     }

    return (
        <div className='container'>
            <div>
                <div className="text-left d-flex justify-content-end">
                    <Link className="btn btn-warning " to="/addCompany">
                        <h4>Add Company</h4>
                    </Link>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table area-aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                S.no
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                            Date Of Foundation
                            </TableCell>
                            <TableCell>
                            email
                            </TableCell>
                            <TableCell>
                            Head Office
                            </TableCell>
                            <TableCell>
                            Logo
                            </TableCell>
                            <TableCell>
                            Contact Number
                            </TableCell>
                            <TableCell>
                            Website
                            </TableCell>
                            <TableCell>
                            Action
                            </TableCell>
 
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            company.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                    {count * (pageNbr - 1) + index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.dateOfFoundation}
                                    </TableCell>
                                    <TableCell>
                                        {item.email}
                                    </TableCell>
                                    <TableCell>
                                        {item.headOfficeAdd}
                                    </TableCell>
                                    <TableCell>
                                        {item.logo}
                                    </TableCell>
                                    <TableCell>
                                        {item.phoneNumber}
                                    </TableCell>
                                    <TableCell>
                                        {item.website}
                                    </TableCell>
                                    <TableCell>
                                     {/* <Link className="btn btn-success m-2" to={`/domainEdit/${item._id}`}  ><i className="bi bi-pencil-square"></i></Link> */}
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
                                                <Button onClick={() => { deleteData(deletId) }}>
                                                    Yes
                                                </Button>
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
                    count={Math.ceil(totalcount / count)}
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
