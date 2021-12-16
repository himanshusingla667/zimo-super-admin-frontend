import React, {useEffect} from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { TextField } from '@mui/material'
import * as Apis from '../../context/Api'
import Info from '../../context/Info'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

export default function EditCountry() {
    
    
    
    let history=useHistory();
    let {id}=useParams()



    useEffect(
        () => {
            getDetails()
        }, []
    )

    const getDetails = () => {
        let data = {
            _id: id,
            userId:Info.userInfo._id
        }
        axios.post(Apis.countryDetails(), data,  {headers: {'x-access-token': Info.token}}).then((response) => {
               
             for (let item in formik.initialValues) {
               formik.setFieldValue(item, response.data.data[item])
                
            }
        })
    };





    const formik = useFormik({
        initialValues: {
            title: "",
            createdById: Info.userInfo._id,
            userId:Info.userInfo.userId,
            
        },

        validationSchema: yup.object({
            title: yup.string().max(30, "Must be 30 characters or less").required("Skill is required")
        }),
        
        onSubmit: (values) => {
            
                let Data={
                    _id:id,
                    title:values.title,
                    userId:Info.userInfo._id
                }
            
            axios.post(Apis.countryEdit(), Data,  {headers: {'x-access-token': Info.token}}).then((response) => {
                

                if (response.data.code === 200) {
                    toast(response.data.message);
                    history.push('/countryList')


                }
                else {
                    toast(response.data.message);
                }
            })
        }

    })


    return (
        <div className='container'>
            <h1>country </h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label='Enter country'
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

                    <button type="submit" className="btn btn-success">Edit</button>

                    <Link to="/countryList" className="btn btn-danger m-3">Back</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
