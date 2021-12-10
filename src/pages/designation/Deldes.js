import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Info from '../../context/Info'
import * as Apis from '../../context/Api'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
export default function Deldes() {


    const [des, setdes] = useState([])

    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        let data = {
            createdById: Info.userInfo._id,
            isDeleted: "true"

        };

        axios.post(Apis.deslist(), data).then((response) => {
            setdes(response.data.data)
            console.log(response.data.data);
        })
    }

    return (
        < >
            <div className="container">
                <TableContainer component={Paper}>
                    <Table aria-label='simpletable'>
                        <TableHead>
                            <TableRow>
                                <TableCell>deletId
                                <TableCell/>
                                    Department
                                </TableCell>
                                <TableCell>
                                    Designation
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                des.map((item,index)=>(
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            {index+1}
                                        </TableCell>
                                        <TableCell>
                                            {item.departmentTitle}
                                        </TableCell>
                                        <TableCell>
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                        <button className="btn btn-primary" onClick={()=>{
                                            console.log(item._id);
                                        }}>
                                            <i className="bi bi-plus-square-fill"></i>
                                        </button>
                                        </TableCell>
                                    </TableRow>

                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
