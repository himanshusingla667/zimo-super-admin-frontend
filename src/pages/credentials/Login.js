import React, { useState } from 'react'
import validation from '../../context/validation'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

import * as Apis from '../../context/Api'
import '../../assets /main.css'
import img from "../../assets /images/zimologo.png"

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
                localStorage.setItem('token', JSON.stringify(response.data.jwtToken));

                history.push("/");
            } else {
                toast(response.data.message);
            }
        })

    }

    return (
        // <div classNameName="background min-vh-100 d-flex flex-row align-items-center">
        //     <div classNameName="container  ">
        //         <div classNameName="row justify-content-center">
        //             <div classNameName=" col-md-8">
        //                 <h1 classNameName="text-center mt-4">Logo Here</h1>
        //                 <div classNameName="row  mt-5 d-flex justify-content-center">
        //                     <div classNameName="border bg-white col-md-8  p-5">
        //                         <h1 classNameName=" text-center" > Login</h1>
        //                         <form onSubmit={formik.handleSubmit}>


        //                             <div classNameName='position-relative'>
        //                                 <TextField
        //                                     label='Email'
        //                                     name="email"
        //                                     onChange={formik.handleChange}
        //                                     onBlur={formik.handleBlur}
        //                                     value={formik.values.email}
        //                                     type='email' classNameName='d-flex m-4' />
        //                                 <span classNameName='form_icon' ><i classNameName="bi bi-envelope-fill"></i></span>
        //                             </div>
        //                             {formik.touched.email && formik.errors.email ? (
        //                                 <span classNameName='text_error_message text-danger' >{formik.errors.email}</span>
        //                             ) : null}


        //                             <div>


        //                                 <div classNameName='position-relative'>
        //                                     <TextField label='Password'
        //                                         name="password"
        //                                         onChange={formik.handleChange}
        //                                         onBlur={formik.handleBlur}
        //                                         value={formik.values.password}

        //                                         type={state}
        //                                         classNameName='d-flex m-4'

        //                                     />
        //                                     <span classNameName='form_icon' onClick={() => {
        //                                         if (state === 'text') {
        //                                             setstate('password')

        //                                         } else {
        //                                             setstate('text')

        //                                         }
        //                                     }}>

        //                                         {
        //                                             state === 'password' ? <i classNameName="bi bi-eye-fill" ></i> : <i classNameName="bi bi-eye-slash-fill"></i>
        //                                         }

        //                                     </span>
        //                                 </div>
        //                                 {formik.touched.password && formik.errors.password ? (
        //                                     <span classNameName='text_error_message text-danger'>{formik.errors.password}</span>
        //                                 ) : null}
        //                             </div>

        //                             <div classNameName="text-center">
        //                                 <button type="submit" classNameName="btn btn-danger" >Login</button>

        //                                 <Link to="/Signup" classNameName="btn btn-success m-3">Signup</Link>
        //                                 <br />

        //                             </div>
        //                             <Link to="/forgotpassword" >Forgot password</Link>
        //                         </form>
        //                     </div>
        //                 </div>
        //                 <ToastContainer />
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <section className="bgcolor">
            <div className="container one">
                <div className="row cus-border">
                    <div className="col-sm-6 cus-bg">
                        <div className="inner">
                            <h1 className="text-center">LOGIN</h1>
                            <p className="cus-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                        </div>
                    </div>
                    <div className="col-sm-6 bgcol">
                        <div className="col-sm-12 d-flex justify-content-end">
                            <img className="cu-img" src={img} alt="User Img" />
                        </div>
                        <form className="cus-form" onSubmit={formik.handleSubmit}>
                            <div className="mb-3 inputwithicon">
                                <label htmlfor="pwd" className="form-label">Corporate ID</label>
                                <input type="text" className="form-control width" placeholder="Corporate ID" />
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="mb-3 inputwithicon">
                                <label htmlfor="pwd" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}

                                />
                                <i className="far fa-envelope"></i>
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <span classNameName='text_error_message text-danger' >{formik.errors.email}</span>
                            ) : null}

                            <div className="mb-3 inputwithicon">
                                <label htmlfor="pwd" className="form-label">Password</label>
                                <input
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    type={state}
                                />
                                <span classNameName='form_icon' onClick={() => {
                                    if (state === 'text') {
                                        setstate('password')

                                    } else {
                                        setstate('text')

                                    }
                                }}>
                                    {
                                        state === 'password' ? <i className="fas fa-lock"></i> : <i className="fas fa-eye eyes"></i>
                                    }

                                </span>


                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <span classNameName='text_error_message text-danger'>{formik.errors.password}</span>
                            ) : null}
                            <div className="form-check mb-3">
                                <Link to="#" className="cus-link"> Forgot Password</Link>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">

                                <button className="btn btn-primary cus-btn mr1" type='submit' >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}
