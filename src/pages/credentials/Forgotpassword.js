import React from 'react'
import validation from '../../context/validation'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import * as Apis from '../../context/Api'





export default function Forgotpassword() {

    const formik = useFormik({
        initialValues: {
            email: '',

        },
        validationSchema: Yup.object({

            email: Yup.string().max(30, 'Must be 15 characters or less').required("User Email is Required")
                .matches(validation.pattern.EMAIL, 'email is not valid'),

        }),
        onSubmit: (values) => {
            console.log(values)
            submitData(values)
        },
    })
    let submitData = (values) => {

        axios.post(Apis.login(), values).then((response) => {
            if (response.data.code === 200) {
                toast(response.data.message);
                // history.push('/Header')


            }
        })

    }

    return (
        <div className="background min-vh-100 d-flex flex-row align-items-center">
            <div className="container  ">
                <div className="row justify-content-center">
                    <div className=" col-md-8">
                        <h1 className="text-center mt-4">Logo here</h1>
                        <div className="row  mt-5 d-flex justify-content-center">
                            <div className="border bg-white col-md-8  p-5">
                                <h4 className="" > Forgot Password</h4>
                                <form onSubmit={formik.handleSubmit}>

                                    <div className='position-relative'>
                                        <TextField
                                            label='Email'
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            type='email' className='d-flex m-4' />
                                        <span className='form_icon' ><i className="bi bi-envelope-fill"></i></span>
                                    </div>

                                    {formik.touched.email && formik.errors.email ? (
                                        <span className='text_error_message text-danger' >{formik.errors.email}</span>
                                    ) : null}


                                    <div>
                                        <button type="submit" className="btn btn-danger">Send Link</button>


                                        <Link to="/Login" className=" m-3">Login</Link>

                                    </div>
                                </form>

                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}
