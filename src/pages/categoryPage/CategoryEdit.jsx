import React, { useState } from 'react'
import { Formik } from 'formik';
import { Box, TextField,Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { collection, doc, updateDoc, query, where } from "firebase/firestore";
import {db, storage} from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { v1 as uuidv1 } from 'uuid';


const CategoryEdit = () => {
  const navigate = useNavigate()
  const {editID} = useParams()
  const [names, setNames] = useState("")
  const [images, setImages] = useState("")
  console.log(names,"ads");
  console.log(images,"adss");
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
      query(collection(db, "/categorys"), where("id", "==", editID));
      const category = doc(db, "/categorys", editID);
      await updateDoc(category,{
        name:names,
        thumnail:images,  
      });
      console.log(category,"nha");
      toast.success("Update Category Success");
      navigate("/category") 
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
        <form onSubmit={handleFormSubmit}>
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
      </Formik>
    </Box>
  )
}

export default CategoryEdit