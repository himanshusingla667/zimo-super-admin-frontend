import {  InputLabel } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import { TextField } from '@material-ui/core'
import * as yup from 'yup'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import * as Apis from '../../context/Api'
import Info from '../../context/Info';
import Spinner from '../../Components/spinner/Spinner';
import Select from '@mui/material/Select';


export default function Editdesignation() {
    const [dep, setdep] = useState([]);
    const [spinner, setspinner] = useState(true)

    const {id} = useParams();
    



    
   

    useEffect(
        () => {
            getData()
            getDetails()
        }, []
    )
    const getData = () => {
        let data = {
            createdById: Info.userInfo._id,
            
        }
        axios.post(Apis.departmentlist(), data).then((response) => {
            setdep(response.data.data)
            
        })

    };

    const getDetails = () => {
        let data = {
            _id:id,
            createdById:Info.userInfo._id,
            
        }
        axios.post(Apis.detailDes(), data).then((response) => {
            
            toast(response.data.message);
            setspinner(false)
            
            for(let item in formik.initialValues){
                formik.setFieldValue(item, response.data.data[item])
            }

        })

    };



    

    
    const formik = useFormik({
        initialValues: {
            title: "",
            createdById: Info.userInfo._id,
            
            departmentId: ""


        },

        validationSchema: yup.object({
            title: yup.string().required("Title is required")
        }),

        onSubmit: (values) => {
            let updateObj = {
                _id:id,
                title:values.title,
                departmentId:values.departmentId,
            }
            axios.post(Apis.editdes(),updateObj).then((response) => {
                
    
                if (response.data.code === 200) {
                    toast(response.data.message);
                    history.push('/designationlist')
                    
                    
                }
                else{
                    toast(response.data.message);
                }
            })
            

           
        }
    });

   



    const history = useHistory();
   

    return (
        <div className='container'>
             {
                spinner && <Spinner />
            }
            <h1>Update Designation</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="position-relative">
                    <TextField
                        label="Enter Designation"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        type='text'
                    /><br></br>
                    {formik.touched.title && formik.errors.title ? (
                        <span className="text_error_message text-danger"> {formik.errors.title} </span>
                    ) : null}
                </div><br />
                
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='departmentId'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.departmentId}
                >
                    {
                        dep.map((item, index) =>
                            <MenuItem key={index} value={item._id}>{item.title}</MenuItem>
                        )
                    }
                </Select>
                

                <div><br />
                    <button type="submit" className="btn btn-danger">Update Designation</button>

                </div>
                
            </form>
            <ToastContainer />
        </div>
        
    )
}
