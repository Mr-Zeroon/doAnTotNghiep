import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button,Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { v1 as uuidv1 } from 'uuid';
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import {db, storage} from '../../firebase';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
const initialValues = {
  id:uuidv1(),
  name:"",
  code:"",
  endDate:"",
  discountMoney:"",
  minOrderPrice:"",
  limitMax:"",
  description:"",
}
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
  const [images, setImages] = useState("")
  const isNorMobile = useMediaQuery("(min-width:600px)")
  const [voucher,setVoucher] = useState([])
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
    if(voucher.find(u=>u.code===value.code))
    {
      toast.error("Code Already Exists")
    }
    else if(value.discountMoney<0)
    {
      toast.error("Discount Money must be greater than 0")
    }
    else if(value.minOrderPrice<0)
    {
      toast.error("Min Order Price must be greater than 0")
    }
    else if(value.limitMax<0)
    {
      toast.error("Limit Max must be greater than 0")
    }
    else {
        const newCityRef = doc(collection(db, "vouchers"));
        await setDoc(newCityRef,{
          id:newCityRef.id,
          name:value.name,
          code:value.code,
          endDate:value.endDate,
          discountMoney:value.discountMoney,
          minOrderPrice:value.minOrderPrice,
          limitMax:value.limitMax,
          description:value.description,
          image:images,
          listCustomer:[],
          isDeleted:false,
          isShow:true,
          typeVoucher:"ADMIN"
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
                   
                  <span><img src={images} alt="" style={{height:"120px",width:"200px",marginTop:"10px"}} /></span>
                
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

export default VoucherAdd