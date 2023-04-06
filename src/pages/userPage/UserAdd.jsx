import React from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button,Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const initialValues = {
  id_staff:"",
  fullName:"",
  phoneNumber:"",
  password:"",
  avatar:"",
  address:"",
  typeUser:"User",
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const userSchema = yup.object().shape({
  id:yup.string().required("required"),
  fullName:yup.string().required("Did not enter the fullName"),
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Did not enter the phoneNumber"),
  password:yup.string().required("Did not enter the password"),
  avatar:yup.string().required("Did not enter the avatar"),
  address:yup.string().required("Did not enter the address"),
  typeUser:yup.string().required("Did not enter the typeUser"),
})

const UserAdd = () => {
  const navigate = useNavigate()
  const isNorMobile = useMediaQuery("(min-width:600px)")
  const handleFormSubmit =(value)=>{
    console.log(value);
    navigate("/user") 
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
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="Avatar"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.avatar}
                name="avatar"
                error={!!touched.avatar && !!errors.avatar}
                helperText={touched.avatar && errors.avatar}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
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
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Shipper">Shipper</MenuItem>
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Store">Store</MenuItem>
                </Select>
              </FormControl>
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

export default UserAdd