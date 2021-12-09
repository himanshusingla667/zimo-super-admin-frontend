import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import validation from '../../context/validation'
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import * as Apis from '../../context/Api'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import Info from '../../context/Info'

export default function Addform() {
   

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            title: '',
            createdById:Info.userInfo._id,
        },
        validationSchema: Yup.object({
            title: Yup.string().max(30, 'Must be 30 characters or less').required("Enter Your title")
                .matches(validation.pattern.NAME, ' not valid')
                .matches(validation.pattern.BACKSPACE, ' not valid'),
        }),
        onSubmit: (value) => {
            submitData(value)
        }
    })


    let submitData = (value) => {
        console.log(value);
        
        axios.post(Apis.departmentadd(), value).then((response) => {
          
            if (response.data.code === 200) {
                toast(response.data.message)
                history.push("/department/list");
            }
           
        })
    }



    return (
        <>
            <div className="container">
              
              <div className="row">
                    <div className="col-6">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='position-relative'>
                                <TextField
                                    label='title'
                                    name="title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                    type='title' className='d-flex m-4' />
                                <span className=" form_icon"><i className="bi bi-person-circle"></i></span>
                            </div>
                            {formik.touched.title && formik.errors.title ? (
                                <span className='text_error_message text-danger' >{formik.errors.title}</span>
                            ) : null}
                            <div>

                                <button type="submit" className="btn btn-danger" >Add</button>

                                <Link to="/department/list" className="btn btn-success m-3">Back</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}
