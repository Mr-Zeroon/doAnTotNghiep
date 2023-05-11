import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';
import { collection,  getDocs, setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from '../../../firebase';
import Header from '../../../components/Header/Header';

const initialValues = {
  id:uuidv1(),
  fullName:"",
  phone:"",
  passWord:"",
  email:"",
  typeUser:"ADMIN",
  isDeleted:false
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const userSchema = yup.object().shape({
  id:yup.string().required("required"),
  fullName:yup.string().required("Did not enter the Full Name"),
  phone: yup.string().matches(phoneRegExp, 'Phone Number is not valid').required("Did not enter the Phone Number"),
  passWord:yup.string().required("Did not enter the Password"),
  email:yup.string().email("invalid Email").required("Did not enter the Email"),
})

const AddAdmin = () => {
  const navigate = useNavigate()
  const isNorMobile = useMediaQuery("(min-width:600px)")
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
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

  const handleFormSubmit = async (value)=>{
    if(user.find(u=>u.email===value.email ))
    {
      toast.error("Email already exists")
    }
    else{
      const newCityRef = doc(collection(db, "users"));
      var bcrypt = require('bcryptjs');
       bcrypt.hash(value.passWord, 10, async function  (err, hash)  {
        await setDoc(newCityRef,{
          id:newCityRef.id,
          fullName:value.fullName,
          phone:value.phone,
          passWord:hash,
          email:value.email,
          typeUser:value.typeUser,
          isDeleted:false ,
          createdAccount:date
        });
        toast.success("Create Admin Success");
        navigate("/user") 
      });
    
    }
  }
  
  const handleBack =()=>{
    navigate("/user") 
  }


  return (
    <Box m="20px">
      <Header  title="User" subtitle="Add Admin"/>
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


            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color='secondary' variant='contained'>ADD</Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default AddAdmin