import React, { useState } from 'react'
import { Formik } from 'formik';
import { Box, TextField,Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { collection, addDoc, setDoc,doc  } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {db} from '../../firebase';
import { v1 as uuidv1 } from 'uuid';
import { storage } from '../../firebase'
import { toast } from 'react-toastify';

const CategoryAdd = () => {
  const navigate = useNavigate()
  const [names, setNames] = useState("")
  const [images, setImages] = useState("")
  const isNorMobile = useMediaQuery("(min-width:600px)")

  const handleImageChange = (e) => {
      if (e.target.files[0]) {
          const id = uuidv1()
          const imageRef = ref(storage, "/imageCategory/" + id);
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

  const handleSubmit = async (e) => {
    e.preventDefault();     
    try {
      const newCityRef = doc(collection(db, "categorys"));
      await setDoc(newCityRef,{
        id:newCityRef.id,
        name:names,
        thumnail:images,
        isDeleted:false  
      }, );
        toast.success("Add Category Success")
        navigate("/category")
      
      } catch (e) {
        console.error("Error adding document: ", e);
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
      <Formik>
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
            <Box>
              <TextField
                required
                fullWidth
                variant='filled'
                type="text" 
                label="Name"
                value={names}
                onChange={(e) => setNames( e.target.value )}
                sx={{gridColumn:"span 4"}}
              />
            </Box>
            <Box>
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