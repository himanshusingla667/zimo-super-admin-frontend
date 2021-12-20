import React from 'react'
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
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";


export default function AddCompany() {


    let history = useHistory();



    const { ref } = usePlacesWidget({
        apiKey: "AIzaSyC0y2S4-iE2rHkYdyAsglz_qirv0UtpF1s",
        onPlaceSelected: (place) => {
            formik.setFieldValue("headOfficeAdd", place.formatted_address);
        },
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: '',
            website: '',
            headOfficeAdd: '',
            dateOfFoundation: '',
            createdById: Info.userInfo._id,
            userId: Info.userInfo._id,
        },
        validationSchema: Yup.object({
            name: Yup.string().max(30, 'Must be 30 characters or less').required("Enter Your title")
                .matches(validation.pattern.NAME, ' not valid')
                .matches(validation.pattern.BACKSPACE, ' not valid'),

            email: Yup.string().min(5, 'Enter valid email').required("Email is required ")
                .matches(validation.pattern.EMAIL, 'Invalid')
                .matches(validation.pattern.BACKSPACE, 'Invalid'),

            phoneNumber: Yup.string().min(10, 'Enter valid number').required('Number is required')
                .matches(validation.pattern.MOB_NO, 'Invalid')
                .matches(validation.pattern.BACKSPACE, 'Invalid'),

            website: Yup.string().min(5, 'Enter valid data').required('Website is required')
                .matches(validation.pattern.EMAIL, 'Invalid')
                .matches(validation.pattern.BACKSPACE, 'Invalid'),

            headOfficeAdd: Yup.string().min(5, 'enter valid address').required('Address is required')
                .matches(validation.pattern.DESCRIPTION, 'invalid')
                .matches(validation.pattern.BACKSPACE, 'invalid'),

            dateOfFoundation: Yup.string().required('Date is requied')



        }),
        onSubmit: (value) => {
            submitData(value)
        }
    })


    let submitData = (value) => {
        console.log(value);

        axios.post(Apis.companyAdd(), value, { headers: { 'x-access-token': Info.token } }).then((response) => {

            if (response.data.code === 200) {
                toast(response.data.message)
                history.push("companyList");
            }

        })
    }



    return (
        <>
            <div className="container">



                <form onSubmit={formik.handleSubmit}>
                    <div className="row g-2 ">
                        <div className=' col-md-6'>
                            <TextField
                                label='Name'
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                type='text' className='d-flex m-4' />
                            {formik.touched.name && formik.errors.name ? (
                                <span className='text_error_message text-danger' >{formik.errors.name}</span>
                            ) : null}
                        </div>

                        <div className='col-md-6'>
                            <TextField
                                label='Email'
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                type='email' className='d-flex m-4' />
                            {formik.touched.email && formik.errors.email ? (
                                <span className='text_error_message text-danger' >{formik.errors.email}</span>
                            ) : null}
                        </div>
                        <div className='col-md-6'>
                            <TextField
                                label='Mobile'
                                name="phoneNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                                type='text' className='d-flex m-4' />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <span className='text_error_message text-danger' >{formik.errors.phoneNumber}</span>
                            ) : null}
                        </div>
                        <div className='col-md-6'>
                            <TextField
                                label='Website'
                                name="website"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.website}
                                type='email' className='d-flex m-4' />
                            {formik.touched.website && formik.errors.website ? (
                                <span className='text_error_message text-danger' >{formik.errors.website}</span>
                            ) : null}
                        </div>


                        <div className='col-md-6'>
                            <TextField
                                fullWidth
                                style={{ width: "250px", marginRight: "20px" }}
                                color="secondary"
                                variant="outlined"
                                inputRef={ref}
                                id="headOfficeAdd"
                                label='Address'
                                name="headOfficeAdd"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                multiline
                                rows={4}
                                value={formik.values.headOfficeAdd}
                                type='text' className='d-flex m-4' />
                            <Autocomplete
                                style={{ width: "250px" }}
                                id="countryAnother"
                                placeholder="countryAnother"
                                value={formik.values.countryAnother}
                                apiKey="AIzaSyC0y2S4-iE2rHkYdyAsglz_qirv0UtpF1s"
                                onPlaceSelected={(place) =>
                                    formik.setFieldValue("countryAnother", place.formatted_address)
                                }
                                onChange={formik.handleChange}
                            />
                            {formik.touched.headOfficeAdd && formik.errors.headOfficeAdd ? (
                                <span className='text_error_message text-danger' >{formik.errors.headOfficeAdd}</span>
                            ) : null}
                        </div>


                        <div className='col-md-6'>
                            <TextField
                                label='Date yyyy/mm/dd'
                                name="dateOfFoundation"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                                value={formik.values.dateOfFoundation}
                                type='text' className='d-flex m-4' />
                            {formik.touched.dateOfFoundation && formik.errors.dateOfFoundation ? (
                                <span className='text_error_message text-danger' >{formik.errors.dateOfFoundation}</span>
                            ) : null}
                        </div>


                    </div>
                    <div>

                        <button type="submit" className="btn btn-success">Add</button>

                        <Link to="/companyList" className="btn btn-danger m-3">Back</Link>
                    </div>
                </form>



                <ToastContainer />
            </div>
        </>
    )
}
