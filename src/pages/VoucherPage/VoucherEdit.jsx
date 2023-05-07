import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button,Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { v1 as uuidv1 } from 'uuid';
import { collection, addDoc, getDocs, setDoc, doc, query, where, updateDoc } from "firebase/firestore";
import {db, storage} from '../../firebase';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const userSchema = yup.object().shape({
  id:yup.string().required("required"),
  name:yup.string().required("Did not enter the  Name"),
  code:yup.string().required("Did not enter the  Code"),
  endDate:yup.string().required("Did not enter the End Date"),
  discountMoney:yup.string().required("Did not enter the Discount Money"),
  minOrderPrice:yup.string().required("Did not enter the Min Order Price"),
  limitMax:yup.string().required("Did not enter the Limit Max"),
  description:yup.string().required("Did not enter the Description"),
})

const VoucherAdd = () => {
  const navigate = useNavigate()
  const {editID} = useParams()
  const [images,setImages] = useState("")
  const [voucher,setVoucher] = useState([])
  const isNorMobile = useMediaQuery("(min-width:600px)")
  const initialValues = {
    id:editID,
    name:"",
    code:"",
    endDate:"",
    discountMoney:"",
    minOrderPrice:"",
    limitMax:"",
  }
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
        const id = uuidv1()
        const imageRef = ref(storage, "/imageVoucher/" + id);
        uploadBytes(imageRef, e.target.files[0])
            .then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setImages(url)
                }).catch(error => {
                    console.log(error.message, "err");
                });
            })
    }
}
  const fetchPost = async () => {  
    await getDocs(collection(db, "/vouchers"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setVoucher(newData);
        }) 
      }

  useEffect(()=>{
    fetchPost();
  }, [])

  const handleFormSubmit = async (value)=>{
    if(voucher.find(u=>u.code===value.code && u.id!==value.id))
    {
      toast.error("Code Already Exists")
    }
    else{
      query(collection(db, "/vouchers"), where("id", "==", editID));
      const voucher = doc(db, "/vouchers", editID);
      await updateDoc(voucher, {
        name:value.name,
        code:value.code,
        endDate:value.endDate,
        discountMoney:value.discountMoney,
        minOrderPrice:value.minOrderPrice,
        limitMax:value.limitMax,
        description:value.description,
        image:images
    });
        
        toast.success("Create Voucher Success");
        navigate("/voucher")
      } 
     
  }
  
  const handleBack =()=>{
    navigate("/voucher") 
  }

  
  return (
    <Box m="20px">
      <Header  title="Voucher" subtitle="Voucher Management"/>
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code}
                name="code"
                error={!!touched.code && !!errors.code}
                helperText={touched.code && errors.code}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='datetime-local'
                label="End Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate}
                name="endDate"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='number'
                label="Discount Money"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.discountMoney}
                name="discountMoney"
                error={!!touched.discountMoney && !!errors.discountMoney}
                helperText={touched.discountMoney && errors.discountMoney}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='number'
                label="Min Order Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.minOrderPrice}
                name="minOrderPrice"
                error={!!touched.minOrderPrice && !!errors.minOrderPrice}
                helperText={touched.minOrderPrice && errors.minOrderPrice}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='number'
                label="Limit Max"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.limitMax}
                name="limitMax"
                error={!!touched.limitMax && !!errors.limitMax}
                helperText={touched.limitMax && errors.limitMax}
                sx={{gridColumn:"span 4"}}
              />
              <TextField 
                fullWidth
                variant='filled'
                type='text'
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
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
                   
                  <span><img src={images} alt=""style={{height:"120px",width:"200px",marginTop:"10px"}} /></span>
                
               }
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

export default VoucherAdd