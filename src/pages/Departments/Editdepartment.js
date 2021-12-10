import React, { useEffect,useState } from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import validation from '../../context/validation'
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import * as Apis from '../../context/Api'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Spinner from '../../Components/spinner/Spinner';
import Info from '../../context/Info'


export default function Editdepartment() {
    const [spinner, setspinner] = useState(true)

    // let history = useHistory();
    const { id } = useParams()


    useEffect(
        () => {
            getdetails();

        }, [])

    const getdetails = () => {
        let data = {
            _id: id,
        }
        axios.post(Apis.departmentdetails(), data).then((response) => {
            setspinner(false)   
            for (let item in formik.initialValues) {
                formik.setFieldValue(item, response.data.data[item])
                // toast(response.data.message);
            }
        })
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            createdById: Info.userInfo._id,
        },
        validationSchema: Yup.object({
            title: Yup.string().max(30, 'Must be 30 characters or less').required("Enter Your title")
                .matches(validation.pattern.NAME, ' not valid')
                .matches(validation.pattern.BACKSPACE, ' not valid'),
        }),
        onSubmit: (values) => {
            let updateObj = {
                _id: id,
                title: values.title,
            }
            axios.post(Apis.departmentupdate(), updateObj).then((response) => {

                if (response.data.code === 200) {
                    toast(response.data.message);

                    history.push("/department/list");
                } else {
                    toast(response.data.message);
                }
            })
        }
    });

    const history = useHistory();
    return (
        <>

            <div className="container">

        {
            spinner && <Spinner />
        }
         <div>
                    <h3 className="text-center">   Department list</h3>
                    <div className="text-left d-flex justify-content-end">
                        <Link className="btn btn-warning " to="/department/add">
                            <h4>Edit Department</h4>
                        </Link>
                    </div>
                </div>
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
                                    type='text' className='d-flex m-4' />
                                <span className=" form_icon"><i className="bi bi-person-circle"></i></span>
                            </div>
                            {formik.touched.title && formik.errors.title ? (
                                <span className='text_error_message text-danger' >{formik.errors.title}</span>
                            ) : null}
                            <div>

                                <button type="submit" className="btn btn-danger" >Edit</button>

                                <Link to="/department/list" className="btn btn-success m-3">Back</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </>
    )
}
