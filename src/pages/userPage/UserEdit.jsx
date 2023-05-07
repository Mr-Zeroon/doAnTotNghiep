import React from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button,Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { collection, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const userSchema = yup.object().shape({
  id:yup.string().required("required"),
  fullName:yup.string().required("Did not enter the fullName"),
  phone: yup.string().matches(phoneRegExp, 'Phone Number is not valid').required("Did not enter the phoneNumber"),
  passWord:yup.string().required("Did not enter the password"),
  email:yup.string().email("invalid Email").required("Did not enter the email"),
  typeUser:yup.string().required("Did not enter the typeUser"),
})

const UserEdit = () => {
  const navigate = useNavigate()
  const {editID} = useParams()
  const isNorMobile = useMediaQuery("(min-width:600px)")
  const initialValues = {
    id:editID,
    fullName:"",
    phone:"",
    passWord:"",
    email:"",
    typeUser:"ADMIN",
  }
  const [user,setUser] = useState([])
  const fetchPost = async () => {  
    await getDocs(collection(db, "/users"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setUser(newData);
        }) 
      }
  useEffect(()=>{
    fetchPost();
  }, [])

  const handleFormSubmit = async (value) => {  
    if(user.find(u=>u.email===value.email && u.id!==value.id))
    {
      toast.error("Email already exists")
    }
    else{
      var bcrypt = require('bcryptjs');
      bcrypt.hash(value.passWord, 10, async function  (err, hash)  {
            query(collection(db, "/users"), where("id", "==", editID));
              const user = doc(db, "/users", editID);
              await updateDoc(user, {
                fullName:value.fullName,
                phone:value.phone,
                passWord:hash,
                email:value.email,
                typeUser:value.typeUser,
                isDeleted:false 
              });  
          toast.success("Update User Success");
          navigate("/user") 
        });
      }
    }
        
   
  
  const handleBack =()=>{
    navigate("/user") 
  }

  
  return (
    <Box m="20px">
      <Header  title="User" subtitle="User Management"/>
      <Box display='flex' justifyContent='flex-end' marginTop="-36px">
        <Button type="submit" color='secondary' variant='contained' onClick={handleBack}>Back</Button>
      </Box>
      <Formik 
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({values,errors,touched,handleBlur,handleChange,handleSubmit})=>(
        
          <form onSubmit={handleSubmit}>
            <Box 
              display="grid" 
              gap="30px"
              marginTop="30px"
              gridTemplateColumns="repeat(4,minmax(0, 1fr))"
              sx={{
                "& > div":{gridColumn: isNorMobile ? undefined:"span 4"}
              }}
            >
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='password'
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passWord}
                name="passWord"
                error={!!touched.passWord && !!errors.passWord}
                helperText={touched.passWord && errors.passWord}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{gridColumn:"span 4"}}
              />
                
             <FormControl fullWidth sx={{gridColumn:"span 4"}}>
                <InputLabel >Type User</InputLabel>
                <Select
                    
                    variant='filled'
                    label= "Type User"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.typeUser}
                    name="typeUser"
                >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color='secondary' variant='contained'>UPDATE</Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default UserEdit