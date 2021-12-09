import React, { useState } from 'react'
import validation from '../../context/validation'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import * as Apis from '../../context/Api'
import { Link } from 'react-router-dom';




export default function Signup() {
    const [state, setstate] = useState('password')

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            confirmpassword: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string().max(45, 'Must be 45 characters or less').required("Enter Your name")
                .matches(validation.pattern.NAME, 'Name is not valid')
                .matches(validation.pattern.BACKSPACE, 'Name is not valid'),

            email: Yup.string().max(30, 'Must be 15 characters or less').required("User Email is Required")
                .matches(validation.pattern.EMAIL, 'email is not valid'),
            password: Yup.string().required('Password is Required').max(30, 'Must30 characters or less')
                .matches(validation.pattern.PASSWORD, 'Password is not valid'),
            confirmpassword: Yup.string().required('Confirm Your Password ').max(30, 'Must be 10 characters or less')
                .matches(validation.pattern.PASSWORD, 'Password is not valid'),
        }),
        onSubmit: (values) => {
            console.log(values)
            submitData(values)
        },
    })
    let submitData = (values) => {

        axios.post(Apis.login(), values).then((response) => {
            if (response.data.code === 200) {
                // const [state, setstate] = useState('password')
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
                        <h1 className="text-center mt-4">Welcom to React</h1>
                        <div className="row  mt-5 d-flex justify-content-center">
                            <div className="border bg-white col-md-8  p-5">
                                <h1 className="text-center" > Register</h1>
                                <form onSubmit={formik.handleSubmit}>

                                    <div className='position-relative'>
                                        <TextField
                                            label='userName'
                                            name="userName"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.userName}
                                            type='userName' className='d-flex m-4' />
                                        <span className=" form_icon"><i className="bi bi-person-circle"></i></span>
                                    </div>
                                    {formik.touched.userName && formik.errors.userName ? (
                                        <span className='text_error_message text-danger' >{formik.errors.userName}</span>
                                    ) : null}

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
                                        }}>
                                            {
                                                state === 'password' && <i id="eye-fill" className="bi bi-eye-fill" ></i>
                                            }
                                            {
                                                state === 'text' && <i id="eye-slash-fill" className="bi bi-eye-slash-fill"></i>
                                            }

                                        </span>
                                    </div>
                                    {formik.touched.password && formik.errors.password ? (
                                        <span className='text_error_message text-danger'>{formik.errors.password}</span>
                                    ) : null}

                                    <div className='position-relative'>
                                        <TextField label='confirmpassword'
                                            name="confirmpassword"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmpassword}
                                            type={state} className='d-flex m-4' />

                                        <span className='form_icon' onClick={() => {
                                            if (state === 'text') {
                                                setstate('password')
                                            } else {
                                                setstate('text')

                                            }
                                        }}>
                                            {
                                                state === 'password' && <i className="bi bi-eye-fill" ></i>
                                            }
                                            {
                                                state === 'text' && <i className="bi bi-eye-slash-fill"></i>
                                            }

                                        </span>
                                    </div>

                                    {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                        <span className='text_error_message text-danger'>{formik.errors.confirmpassword}</span>
                                    ) : null}

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-danger" >Signup</button>
                                        <Link to="/Login" className="btn btn-success m-3">Login</Link>
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
