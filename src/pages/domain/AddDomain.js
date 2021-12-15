import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { TextField } from '@mui/material'
import * as Apis from '../../context/Api'
import Info from '../../context/Info'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function AddDomain() {


    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            title: "",
            createdById: Info.userInfo._id,
            userId: Info.userInfo._id,
            description: ""
            // token: Info.userInfo.jwtToken
        },

        validationSchema: yup.object({
            title: yup.string().max(30, "Must be 30 characters or less").required("Domain is required"),
            description: yup.string().min(10, "Must be 10 characters or more").required("Description is required")

        }),

        onSubmit: (values) => {
            axios.post(Apis.domainAdd(), values, { headers: { 'x-access-token': Info.token } }).then((response) => {
                if (response.data.code === 200) {
                    toast(response.data.message);
                    history.push('/domainList')
                }
                else {
                    toast(response.data.message);
                }
            })
        }

    })


    return (
        <div className='container'>
            <h1>Domain </h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label='Enter Domain'
                    name='title'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    type='text'
                /><br/>
                {formik.touched.title && formik.errors.title ? (
                    <span className='text_error_message text-danger' >{formik.errors.title}</span>
                ) : null}
                <br/>
                <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    variant="outlined"
                    name='description'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    type='text'
                /><br/>
                {formik.touched.description && formik.errors.description ? (
                    <span className='text_error_message text-danger' >{formik.errors.description}</span>
                ) : null}
                <div>

                    <button type="submit" className="btn btn-success">Add</button>

                    <Link to="/domainList" className="btn btn-danger m-3">Back</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
