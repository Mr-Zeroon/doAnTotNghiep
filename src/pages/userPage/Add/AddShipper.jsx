import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button,Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';
import { collection,  getDocs, setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase';
import Header from '../../../components/Header/Header';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



const initialValues = {
  id:uuidv1(),
  fullName:"",
  phone:"",
  passWord:"",
  dateOfBirth:"",
  vehicleNumber:"",
  typeUser:"SHIPPER",
  gender:"Nam",
  isDeleted:false
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const userSchema = yup.object().shape({
  id:yup.string().required("required"),
  fullName:yup.string().required("Did not enter the Full Name"),
  phone: yup.string().matches(phoneRegExp, 'Phone Number is not valid').required("Did not enter the Phone Number"),
  passWord:yup.string().required("Did not enter the Password"),
  vehicleNumber:yup.string().required("Did not enter the License plates"),
  dateOfBirth:yup.string().required("Did not enter the Birth Day"),
  gender:yup.string().required("Did not enter the Gender"),
})

const AddShipper = () => {
  const [images, setImages] = useState("")
  const navigate = useNavigate()
  const isNorMobile = useMediaQuery("(min-width:600px)")
  const [user,setUser] = useState([])
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
        const id = uuidv1()
        const imageRef = ref(storage, "/imageFood/" + id);
        uploadBytes(imageRef, e.target.files[0])
            .then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setImages(prev => [...prev, url])

                }).catch(error => {
                    console.log(error.message, "err");
                });
            })
    }
}
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
      const newCityRef = doc(collection(db, "users"));
      var bcrypt = require('bcryptjs');
       bcrypt.hash(value.passWord, 10, async function  (err, hash)  {
        await setDoc(newCityRef,{
          id:newCityRef.id,
          fullName:value.fullName,
          phone:value.phone,
          passWord:hash,
          avatar:"",
          gender:value.gender,
          dateOfBirth:value.dateOfBirth,
          vehicleNumber:value.vehicleNumber,
          typeUser:value.typeUser,
          listIdentifycation:images,
          email:"",
          isDeleted:false,
          createdAccount:date
        });
        toast.success("Create Shipper Success");
        navigate("/user") 
      });
    
    
  }
  
  const handleBack =()=>{
    navigate("/user") 
  }

 
  return (
    <Box m="20px">
      <Header  title="User" subtitle="Shipper Add"/>
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

              <FormControl fullWidth sx={{gridColumn:"span 4"}}>
                <InputLabel >Gender</InputLabel>
                <Select
                    variant='filled'
                    label= "Gender"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.gender}
                    name="gender"
                >
                    <MenuItem value="Nữ">Nữ</MenuItem>
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Khác">Khác</MenuItem>
                </Select>
              </FormControl>

              <TextField 
                fullWidth
                variant='filled'
                type='date'
                label="Birth Day"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfBirth}
                name="dateOfBirth"
                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{gridColumn:"span 4"}}
              /> 
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="License plates"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vehicleNumber}
                name="vehicleNumber"
                error={!!touched.vehicleNumber && !!errors.vehicleNumber}
                helperText={touched.vehicleNumber && errors.vehicleNumber}
                sx={{gridColumn:"span 4"}}
              /> 
              <TextField 
                required
                fullWidth
                variant='filled'
                type="file"
                onChange={(e) => handleImageChange(e)}
                sx={{gridColumn:"span 4"}}/>
                {
                   images &&
                   images.map((img, index) => (
                   <span key={index} className=' w-36'> <img src={img} alt="" style={{height:"120px",width:"200px",marginTop:"10px"}}  /></span>
                    ))
                }
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

export default AddShipper