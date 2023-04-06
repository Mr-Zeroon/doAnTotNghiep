import React from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const initialValues = {
  id_staff:"",
  fullName_staff:"",
  phoneNumber:"",
  password:"",
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const userSchema = yup.object().shape({
  id_staff:yup.string().required("required"),
  fullName_staff:yup.string().required("Did not enter the fullName"),
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Did not enter the phoneNumber"),
  password:yup.string().required("Did not enter the password"),
})

const EmployeeAdd = () => {
  
  const navigate = useNavigate()
  const isNorMobile = useMediaQuery("(min-width:600px)")
  const handleFormSubmit =(value)=>{
    console.log(value);
    navigate("/employee")
    
  }
  const handleBack =()=>{
    navigate("/employee")
    
  }
  return (
    <Box m="20px">
      <Header  title="Employee" subtitle="Manage admin information"/>
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
                label="FullName Staff"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName_staff}
                name="fullName_staff"
                error={!!touched.fullName_staff && !!errors.fullName_staff}
                helperText={touched.fullName_staff && errors.fullName_staff}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="PhoneNumber"
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
                label="PassWord"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
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

export default EmployeeAdd