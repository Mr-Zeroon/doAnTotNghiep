import React, { useState } from 'react'
import { Formik } from 'formik';
import * as yup from "yup";
import { Box, TextField,Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {db} from '../../firebase';
import { v1 as uuidv1 } from 'uuid';
import { storage } from '../../firebase'


const userSchema = yup.object().shape({
  name:yup.string().required("Did not enter the name"),
  thumnail:yup.string().required("Did not enter the thumnail"),
})

const CategoryAdd = () => {
    const [idCategori, setIdCategori] = useState("");
    const [nameCategori, setNameCategori] = useState("");
    const [imgCategori, setImgCategori] = useState();
    const [ url, setUrl] = useState()
    const navigate = useNavigate()
    const isNorMobile = useMediaQuery("(min-width:600px)")
    const handleUploadImage = (e) => {
      if(e.target.files[0]) {
          setImgCategori(e.target.files[0]);
      }
  }
  const writeCategoriData = async (id, name, url) => {
    await addDoc(collection(db, "/categorys"), {
        id: id,
        name: name,
        thumnail:url
    })
}
const handleSubmit = (e) => {
  e.preventDefault()
  if(!nameCategori || !imgCategori) {
      alert("Vui lòng nhập đủ thông tin!!")
  }else{
      const id = uuidv1()
      setIdCategori(id)
      const imageRef = ref(storage,`/imageCategori/image/`+ id);
      uploadBytes(imageRef, imgCategori)
      .then(() => {
      getDownloadURL(imageRef).then((url) => {
          setUrl(url);
          writeCategoriData(id, nameCategori, url)
      })
      .catch(error => {
          console.log(error.message, "err");
      });
          setImgCategori(null)
      })
      setNameCategori("")
      navigate("/category")
  }
}

  const handleBack =()=>{
    navigate("/category")
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
        <form onSubmit={handleSubmit}>
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
                value={nameCategori} 
                onChange={(e) => setNameCategori(e.target.value)} 
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
              <Button type="submit" color='secondary' variant='contained'>ADD</Button>
          </Box>
        </form>
      </Formik>
    </Box>
  )
}

export default CategoryAdd