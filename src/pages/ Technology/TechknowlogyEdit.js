import React, { useEffect,useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { TextField } from '@mui/material'
import * as Apis from '../../context/Api'
import Info from '../../context/Info'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useHistory,useParams } from 'react-router-dom'
import Spinner from '../../Components/spinner/Spinner';

export default function TechknowlogyEdit() {
    const [spinner, setspinner] = useState(true)

<<<<<<< HEAD
   
=======
    useEffect(() => {
        
    }, [])
>>>>>>> 75747f55740ab4113d25018448cb9620349607c4
    let history = useHistory();
    let {id}=useParams()



    useEffect(
        () => {
            getDetails()
        }, []
    )

    const getDetails = () => {
        let data = {
            _id: id,
            userId:Info.userInfo._id,
            createdById:Info.userInfo._id,
            companyId:Info.userInfo.companyId,

        }
        axios.post(Apis.tecDetails(), data,  {headers: {'x-access-token': Info.token}}).then((response) => {
            setspinner(false)   
             for (let item in formik.initialValues) {
               formik.setFieldValue(item, response.data.data[item])
                
            }
        })
    };


    const formik = useFormik({
        initialValues: {
            title: "",
            description:"",
            userId: Info.userInfo._id,

        },

        validationSchema: yup.object({
            title: yup.string().max(30, "Must be 30 characters or less").required(" Techknowlogy is required")
        }),

        onSubmit: (values) => {
            let editData={
                userId: Info.userInfo._id,
                title:values.title,
                _id: id,
                description:values.description,
                createdById:Info.userInfo._id,
                companyId:Info.userInfo.companyId,
            }
            axios.post(Apis.tecEdit(), editData, { headers: { 'x-access-token': Info.token } }).then((response) => {
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
             {
            spinner && <Spinner />
        }
            <h1> Technology</h1>
            <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
                <TextField
                    label='Enter Technology'
                    name='title'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    type='text'
                />
                {formik.touched.title && formik.errors.title ? (
                    <span className='text_error_message text-danger' >{formik.errors.title}</span>
                ) : null}
              </div><br/>
                <div className="mt-4">
                <TextField
                    id="outlined-multiline-static"
                    label="description"
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
                </div>
                <div>
                    <button type="submit" className="btn btn-success">Edit Description</button>

                    <Link to="/Techknowlogylist" className="btn btn-danger m-3">Back</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
