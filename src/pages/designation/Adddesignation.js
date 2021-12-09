import { makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import { useFormik } from 'formik'
import { TextField } from '@material-ui/core'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import * as Apis from '../../context/Api'
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Info from '../../context/Info';




export default function Adddesignation() {


    const [dep, setdep] = useState([]);
    useEffect(
        () => {
            getData()
        }, []
    )
    const getData = () => {
        let data = {
            createdById:Info.userInfo._id,
        }
        axios.post(Apis.departmentlist(), data).then((response) => {
            setdep(response.data.data)
        })

    };




    //  const [age, setAge] = React.useState('');
    //  const handleChange = (event) => {
    //      setAge(event.target.value);
    //  };

    const useStyle = makeStyles(
        {
            container: {
                width: '50%',
                margin: '5% 0 0 25%',
                '& > *': {
                    marginTop: 20
                }
            }
        }
    )

    const formik = useFormik({
        initialValues: {
            title: "",
            createdById:Info.userInfo._id,
            departmentId: ""


        },

        validationSchema: yup.object({
            title: yup.string().required("Title is required"),
            departmentId: yup.string().required("Please select Department")
        }),

        onSubmit: (values) => {
            

            submitData(values)
        }
    });

    let submitData = (values) => {

        axios.post(Apis.adddes(), values).then((response) => {
            

            if (response.data.code === 200) {
                toast(response.data.message);
                history.push('/designationlist')
            }
            else {
                toast(response.data.message);
            }
        })

    }



    const history = useHistory();
    const classes = useStyle();

    return (
        <div className={classes.container}>
            <h1>Designation</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="position-relative">
                    <TextField
                        label="Enter Designation"
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
                <div>
                    <Box sx={{ maxWidth: 200 }}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='departmentId'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.departmentId}
                    >
                        {
                            dep.map((item, index) =>
                                <MenuItem key={index} value={item._id}>{item.title}</MenuItem>
                            )
                        }
                    </Select>
                    </FormControl>
                    </Box>
                    {formik.touched.departmentId && formik.errors.departmentId ? (
                        <span className="text_error_message text-danger"> {formik.errors.departmentId} </span>
                    ) : null}

                </div>

                <div><br />
                    <button type="submit" className="btn btn-danger">Add Designation</button>

                </div>

            </form>
            <ToastContainer />
        </div>
    )
}
