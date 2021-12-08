import React, { useState } from 'react'
import validation from '../../enviornment/validation'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import * as Apis from '../../enviornment/Apis'

export default function Login() {
    let history = useHistory();


    const [state, setstate] = useState('password')

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        validationSchema: Yup.object({

            email: Yup.string().max(30, 'Must be 15 characters or less').required("User Email is Required")
                .matches(validation.pattern.EMAIL, 'email is not valid'),
            password: Yup.string().required('Password is Required').max(30, 'Must30 characters or less')
                .matches(validation.pattern.PASSWORD, 'Password is not valid'),
        }),
        onSubmit: (values) => {
            
            submitData(values)
        },
    })
    let submitData = (values) => {

        axios.post(Apis.login(), values).then((response) => {
            if (response.data.code === 200) {
                console.log("response", response)
                toast(response.data.message);
                localStorage.setItem('userinfo', JSON.stringify(response.data.data));
                history.push("/");
            } else {
                toast(response.data.message);
            }
        })

    }

    return (
        <div className="background min-vh-100 d-flex flex-row align-items-center">
            <div className="container  ">
                <div className="row justify-content-center">
                    <div className=" col-md-8">
                        <h1 className="text-center mt-4">Logo Here</h1>
                        <div className="row  mt-5 d-flex justify-content-center">
                            <div className="border bg-white col-md-8  p-5">
                                <h1 className=" text-center" > Login</h1>
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


                                        <div className='position-relative'>
                                            <TextField label='Password'
                                                name="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}

                                                type={state}
                                                className='d-flex m-4'

                                            />
                                            <span className='form_icon' onClick={() => {
                                                if (state === 'text') {
                                                    setstate('password')

                                                } else {
                                                    setstate('text')

                                                }
                                            }}>setItem

                                                {
                                                    state === 'password' ? <i className="bi bi-eye-fill" ></i> : <i className="bi bi-eye-slash-fill"></i>
                                                }

                                            </span>
                                        </div>
                                        {formik.touched.password && formik.errors.password ? (
                                            <span className='text_error_message text-danger'>{formik.errors.password}</span>
                                        ) : null}
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-danger" >Login</button>

                                        <Link to="/Signup" className="btn btn-success m-3">Signup</Link>
                                        <br />

                                    </div>
                                    <Link to="/forgotpassword" >Forgot password</Link>
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
