import { Link } from 'react-router-dom'
import axios from 'axios'
import * as Apis from '../../enviornment/Apis'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';
import Spinner from '../../Components/spinner/Spinner';



export default function Listdepartment() {
    const [spinner, setspinner] = useState(true)
    const [totalCount, settotalCount] = useState(0)
    const [list, setlist] = useState([]);

    let Count = 5

    useEffect(() => {
        getdata(1)
    }, [])

    const getdata = (page) => {
        let data = {

            createdById: "61a0dab0777b848f7b22f811",
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
                    <div className="text-left">
                        <Link className="btn btn-danger m-2 " to="/department/add">
                            <h4>Add Department</h4>
                        </Link>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Title</th>
                            <th scope="col">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, index) => (


                                <tr key={item._id}>
                                    <th scope="row">{`${index + 1}`}</th>
                                    <td>{item.title} </td>
                                    <td>
                                        <Link className="btn btn-success m-2" to={`/department/edit/${item._id}`}  ><i className="bi bi-pencil-square"></i></Link>
                                        <button className="btn btn-danger m-2" onClick={() => { deleteTitle(item._id) }} >
                                            <i className="bi bi-trash"></i></button>
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




