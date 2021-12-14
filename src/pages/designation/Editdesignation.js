// import { InputLabel, makeStyles } from '@material-ui/core'
// import React from 'react'
// import { useState } from 'react'
// import { editUser, getUsers } from '../../enviornment/Apis'
// import { useHistory, useParams} from 'react-router-dom'
// import { useEffect } from 'react'
// import axios from 'axios'
// import * as Apis from '../../enviornment/Apis'
// import MenuItem from '@mui/material/MenuItem';
// import { useFormik } from 'formik'
// import { TextField } from '@material-ui/core'
// import Select from '@mui/material/Select';
// import * as yup from 'yup'


// const useStyle= makeStyles(
//     {
//         container:{
//             width:'50%',
//             margin:'5% 0 0 25%',
//             '& > *':{
//                 marginTop: 20
//             }
//         }
//     }
// )

// const initialValue={
//     title:'',
    
// }



// export default function Editdesignation() {



//     const [dep, setdep] = useState([]);
//     useEffect(
//         () => {
//             readData()
//         }, []
//     )
//     const readData = () => {
//         let data = {
//             createdById: "61a0dab0777b848f7b22f811",
//         }
//         axios.post(Apis.deplist(), data).then((response) => {
//             setdep(response.data.data)
//         })

//     };

//     const [user, setUser] = useState(initialValue);
//     const{ }=user;
//     const {id}= useParams();
//     const history=useHistory();
    
//     const formik = useFormik({
//         initialValues: {
//             title: "",
//             createdById: "61a0dab0777b848f7b22f811",
            
//             departmentId:""


//         },

//         validationSchema: yup.object({
//             title: yup.string().required("Title is required")
//         }),
//     })


//     const [des, setdes] = useState([]);
//     useEffect(
//         () => {
//             getData()
//         }, []
//     )
//     const getData = () => {
//         let data = {
//             createdById: "61a0dab0777b848f7b22f811",
//         }
//         axios.post(Apis.deslist(id), data).then((response) => {
//             setdes(response.data.data)
//         })

//     };
//     useEffect(() => {
//         loadUserData();   
//     },[]);
    
//     const loadUserData= async ()=>{
//        const response= await getUsers(id);
//        setUser(response.data)
//     }

//     const classes=useStyle();
//     const handleChange=(e)=>{
//         setUser({...user, [e.target.name]:e.target.value });
        
//     }

//     const editDesDetails = async()=>{
//         await editUser(id,user);
//         history.push('/designationlist')
//     }

//     return (
//         // <FormGroup className={classes.container}>
//         //     <Typography variant="h4">Edit User</Typography>
//         //     <FormControl>
//         //         <InputLabel>Name</InputLabel>
//         //         <Input onChange={(e)=>onValueChange(e)} name= 'name' value={name} />
//         //     </FormControl>
//         //     <FormControl>
//         //         <InputLabel>Email</InputLabel>
//         //         <Input onChange={(e)=>onValueChange(e)} name= 'email' value={email} />
//         //     </FormControl>
//         //     <FormControl>
//         //         <InputLabel>Contact Number</InputLabel>
//         //         <Input onChange={(e)=>onValueChange(e)} name= 'mobile' value={mobile} />
//         //     </FormControl>
//         //     <Button variant="contained" onClick={()=>editUserDetails()} >Edit User</Button>
//         // </FormGroup>
//         <div className={classes.container}>
//         <h1>Designation</h1>
//         <form onSubmit={formik.handleSubmit}>
//             <div className="position-relative">
//                 <TextField
//                     label="Enter Designation"
//                     name="title"
//                     onChange={(e)=>this.Change(e,handleChange)}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.title}
//                     type='text'
//                 /><br></br>
//                 {formik.touched.title && formik.errors.title ? (
//                     <span className="text_error_message text-danger"> {formik.errors.title} </span>
//                 ) : null}
//             </div><br />
//             <InputLabel id="demo-simple-select-label">description</InputLabel>
//             <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 name='departmentId'
//                 onChange={(e)=>this.Change(e,handleChange)}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.departmentId}
//             >
//                 {
//                     dep.map((item, index) =>
//                         <MenuItem key={index} value={item._id}>{item.title}</MenuItem>
//                     )
//                 }
//             </Select>
            

//             <div><br />
//                 <button type="submit" className="btn btn-danger" onClick={()=>editDesDetails()}>update Designation</button>

//             </div>

//         </form>
//     </div>
// )
    
// }


import {  InputLabel, makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import { TextField } from '@material-ui/core'
import * as yup from 'yup'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
// import * as Apis from '../../enviornment/enviornment'
import MenuItem from '@mui/material/MenuItem';
import * as Apis from '../../context/Api'
import Info from '../../context/Info';

import Select from '@mui/material/Select';


export default function Editdesignation() {
    const [dep, setdep] = useState([]);
    

    const {id} = useParams();
    



    
   

    useEffect(
        () => {
            getData()
            getDetails()
        }, []
    )
    const getData = () => {
        let data = {
            createdById: Info.userInfo._id,
        }
        axios.post(Apis.departmentlist(), data).then((response) => {
            setdep(response.data.data)
            
        })

    };

    const getDetails = () => {
        let data = {
            _id:id,
        }
        axios.post(Apis.detailDes(), data).then((response) => {
            
            toast(response.data.message);
            
            for(let item in formik.initialValues){
                formik.setFieldValue(item, response.data.data[item])
            }

        })

    };



    

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
            createdById: Info.userInfo._id,
            
            departmentId: ""


        },

        validationSchema: yup.object({
            title: yup.string().required("Title is required")
        }),

        onSubmit: (values) => {
            let updateObj = {
                _id:id,
                title:values.title,
                departmentId:values.departmentId
            }
            axios.post(Apis.editdes(),updateObj).then((response) => {
                
    
                if (response.data.code === 200) {
                    toast(response.data.message);
                    history.push('/designationlist')
                    
                    
                }
                else{
                    toast(response.data.message);
                }
            })
            

           
        }
    });

   



    const history = useHistory();
    const classes = useStyle();

    return (
        <div className={classes.container}>
            <h1>Update Designation</h1>
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
                {formik.values.departmentId}

                <div><br />
                    <button type="submit" className="btn btn-danger">Update Designation</button>

                </div>
                
            </form>
            <ToastContainer />
        </div>
        
    )
}
