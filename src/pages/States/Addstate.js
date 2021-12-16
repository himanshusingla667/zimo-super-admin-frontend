import React, { useEffect,useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material'
import * as Apis from '../../context/Api'
import Info from '../../context/Info'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Addstate() {

    const [country ,setcountry]= useState([]);

    useEffect(() => {
        // console.log(Info);
        countryData()
    }, [])
    let history = useHistory();

const countryData =() =>{
    let data ={

    }
    axios.post(Apis.countryList(), data).then((response) => {
        setcountry(response.data.data)
    })
}
    const formik = useFormik({
        initialValues: {
            title: "",
            countryId:'',
            createdById: Info.userInfo._id,
            userId: Info.userInfo._id,

        },

        validationSchema: yup.object({
            title: yup.string().max(30, "Must be 30 characters or less").required(" State is required"),
            countryId:yup.string().required("Country Required"),
        }),

        onSubmit: (values) => {
            axios.post(Apis.stateAdd(), values, { headers: { 'x-access-token': Info.token } }).then((response) => {
                if (response.data.code === 200) {
                    toast(response.data.message);
                    history.push('/Statelist')
                }
                else {
                    toast(response.data.message);
                }
            })
        }

    })


    return (
        <div className='container'>
            <h1> States</h1>
            <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
                <TextField
                    label='Enter States'
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
              <div>
                    <Box sx={{ maxWidth: 200 }}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='countryId'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.countryId}
                    >
                        {
                            country.map((item, index) =>
                                <MenuItem key={index} value={item._id}>{item.title}</MenuItem>
                            )
                        }
                    </Select>
                    </FormControl>
                    </Box>
                    {formik.touched.departmentId && formik.errors.countryId ? (
                        <span className="text_error_message text-danger"> {formik.errors.countryId} </span>
                    ) : null}

                </div>

              
                <div>
                    <button type="submit" className="btn btn-success">Add</button>

                    <Link to="/Statelist" className="btn btn-danger m-3">Back</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
