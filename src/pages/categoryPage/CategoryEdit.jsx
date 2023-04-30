import React, { useState } from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button,Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { collection, doc, updateDoc, query, where } from "firebase/firestore";
import {db, storage} from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { update } from 'firebase/database';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const userSchema = yup.object().shape({
  id:yup.string().required("required"),
  name:yup.string().required("Did not enter the name"),
  thumnail:yup.string().required("Did not enter the Image"),
})

const CategoryEdit = () => {
    const navigate = useNavigate()
    const {editID} = useParams()
    const [nameCategoriEdit, setNameCategoriEdit] = useState("");
    const [imgCategoriEdit, setImgCategoriEdit] = useState();
    const isNorMobile = useMediaQuery("(min-width:600px)")
    const [ url, setUrl] = useState()
    console.log("name",nameCategoriEdit);
    const handleBack =()=>{
        navigate("/category") 
      }
    const handleUploadImage = (e) => {
        if(e.target.files[0]) {
            setImgCategoriEdit(e.target.files[0]);
        }
    }

    const handleUpdate = async() => {
        const imageRefUpdate = ref(storage, `/imageCategori/image/`+ editID);
            uploadBytes(imageRefUpdate, imgCategoriEdit)
            .then(() => {
                query(collection(db, "/categorys"), where("id", "==", editID));
            getDownloadURL(imageRefUpdate).then(async (url) => {
                setUrl(url);
                const user = doc(db, "/categorys", editID);
                await updateDoc(user, {
                id:editID,
                name:nameCategoriEdit,
                thumnail: url
                });  
            }).catch(error => {
                console.log(error.message, "err");
            });
                setImgCategoriEdit(null)
            })
            navigate("/category") 
    }

    
    const handleClickUpdate = (e) => {
        e.preventDefault()
        if(!nameCategoriEdit || !imgCategoriEdit) {
            alert("Vui lòng nhập đầy đủ thông tin cần Update")
        }else {
            handleUpdate()
            alert("Update thành công")
        }
        
    }
  return (
    <Box m="20px">
      <Header  title="Category" subtitle="Category Management"/>
      <Box display='flex' justifyContent='flex-end' marginTop="-36px">
        <Button type="submit" color='secondary' variant='contained' onClick={handleBack}>Back</Button>
      </Box>
      <Formik 
        validationSchema={userSchema}
      >
        <form onSubmit={handleClickUpdate}>
          <Box 
          display="flex" 
          flexDirection="column"
          gap="30px"
          marginTop="30px"
          gridTemplateColumns="repeat(4,minmax(0, 1fr))"
          sx={{
            "& > div":{gridColumn: isNorMobile ? undefined:"span 4"}
          }}
          >
            <Box className="input-form">
              <TextField
                required
                fullWidth
                variant='filled'
                type="text" 
                label="Name"
                value={nameCategoriEdit} 
                onChange={(e) => setNameCategoriEdit(e.target.value)} 
                sx={{gridColumn:"span 4"}}
              />
            </Box>
            <Box className="input-form">
              <TextField 
                required
                fullWidth
                variant='filled'
                type="file"
                onChange={(e) => handleUploadImage(e)} 
                sx={{gridColumn:"span 4"}}/>
            </Box>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color='secondary' variant='contained'>Update</Button>
          </Box>
        </form>
      </Formik>
    </Box>
  )
}

export default CategoryEdit