import {  InputLabel} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import { TextField } from '@material-ui/core'
import * as yup from 'yup'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from '../../Components/spinner/Spinner';

// import * as Apis from '../../enviornment/enviornment'
import MenuItem from '@mui/material/MenuItem';
import * as Apis from '../../context/Api'
import Info from '../../context/Info';

import Select from '@mui/material/Select';


export default function StateEdit() {
    const [statelist, setstatelist] = useState([]);
    const [spinner, setspinner] = useState(true)

    const {id} = useParams();
    
    useEffect(
        () => {
            getData()
            getDetails()
        }, []
    )
    const getData = () => {
        let data = {
            createdById: Info.userInfo._id
        }
        axios.post(Apis.countryList(), data).then((response) => {
            setstatelist(response.data.data)
            
        })

    };

    const getDetails = () => {
        let data = {
            _id:id,
            userId:Info.userInfo._id
        }
        axios.post(Apis.StateDetails(), data,{headers: {'x-access-token': Info.token}}).then((response) => {
            setspinner(false)   
            toast(response.data.message);
            
            for(let item in formik.initialValues){
                formik.setFieldValue(item, response.data.data[item])
            }

        })

    };

    // const useStyle = makeStyles(
    //     {
    //         container: {
    //             width: '50%',
    //             margin: '5% 0 0 25%',
    //             '& > *': {
    //                 marginTop: 20
    //             }
    //         }
    //     }
    // )

    const formik = useFormik({
        initialValues: {
            title: "",
            createdById: Info.userInfo._id,
            countryId: ""


        },

        validationSchema: yup.object({
            title: yup.string().required("Title is required")
        }),

        onSubmit: (values) => {
            let updateObj = {
                _id:id,
                title:values.title,
                countryId:values.countryId,
                userId:Info.userInfo._id
            }
            axios.post(Apis.StateEdit(),updateObj,{headers: {'x-access-token': Info.token}}).then((response) => {
                
    
                if (response.data.code === 200) {
                    toast(response.data.message);
                    history.push('/Statelist')
                    
                    
                }
                else{
                    toast(response.data.message);
                }
            })
        }
    });

   



    const history = useHistory();
    // const classes = useStyle();

    return (
    <>
    {
            spinner && <Spinner />
        }
         <div className="container">
            <h1>Edit State</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="position-relative">
                    <TextField
                        label="Enter State"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        type='text'
                    /><br></br>
                    {formik.touched.title && formik.errors.title ? (
                        <span className="text_error_message text-danger"> {formik.errors.title} </span>
                    ) : null}
                </div><br />
                
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
                        statelist.map((item, index) =>
                            <MenuItem key={index} value={item._id}>{item.title}</MenuItem>
                        )
                    }
                </Select>
                

                <div><br />
                    <button type="submit" className="btn btn-danger">Edit state</button>
                    <Link to="/Statelist" className="btn btn-danger m-3">Back</Link>
                </div>
                
            </form>
            <ToastContainer />
         </div>
        </>
    )
}
