import React ,{useEffect} from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { TextField } from '@mui/material'
import * as Apis from '../../context/Api'
import Info from '../../context/Info'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function AddSkils() {
    
    useEffect(() => {
        console.log(Info);
    }, [])
    let history=useHistory();
    
    const formik = useFormik({
        initialValues: {
            title: "",
            userId:Info.userInfo._id,
            createdById:Info.userInfo._id,
            companyId:Info.userInfo.companyId
            // token: Info.userInfo.jwtToken
        },
        
        validationSchema: yup.object({
            title: yup.string().max(30, "Must be 30 characters or less").required("Skill is required")
        }),
        
        onSubmit: (values) => {
            axios.post(Apis.skillsAdd(), values, {headers: {'x-access-token': Info.token}}).then((response) => {
                if (response.data.code === 200) {
                    toast(response.data.message);
                    history.push('/SkillsList')
                }
                else {
                    toast(response.data.message);
                }
            })
        }

    })


    return (
        <div className='container'>
            <h1>Skills </h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label='Enter skill'
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

                    <button type="submit" className="btn btn-success">Add</button>

                    <Link to="/SkillsList" className="btn btn-danger m-3">Back</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
