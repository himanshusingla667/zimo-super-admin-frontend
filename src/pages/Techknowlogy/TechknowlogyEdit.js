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

export default function TechknowlogyEdit() {

    useEffect(() => {
        console.log(Info);
    }, [])
    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            title: "",
            description:"",
            createdById: Info.userInfo._id,
            userId: Info.userInfo._id,

        },

        validationSchema: yup.object({
            title: yup.string().max(30, "Must be 30 characters or less").required(" Techknowlogy is required")
        }),

        onSubmit: (values) => {
            axios.post(Apis.tecAdd(), values, { headers: { 'x-access-token': Info.token } }).then((response) => {
                if (response.data.code === 200) {
                    toast(response.data.message);
                    history.push('/Techknowlogylist')
                }
                else {
                    toast(response.data.message);
                }
            })
        }

    })


    return (
        <div className='container'>
            <h1> Techknowlogy</h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label='Enter Techknowlogy'
                    name='title'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    type='text'
                />
                {formik.touched.title && formik.errors.title ? (
                    <span className='text_error_message text-danger' >{formik.errors.title}</span>
                ) : null}
                <div>

                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                        name="description"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.description}
                       />
                       {formik.touched.description && formik.errors.description ? (
                    <span className='text_error_message text-danger' >{formik.errors.description}</span>
                ) : null}

                    </div>
                    <button type="submit" className="btn btn-success">Edit Description</button>

                    <Link to="/Techknowlogylist" className="btn btn-danger m-3">Back</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
