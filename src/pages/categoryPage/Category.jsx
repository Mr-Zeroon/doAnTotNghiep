import { Box,useTheme,Button, Typography } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase'
import { doc, deleteDoc } from "firebase/firestore";

const Category = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [categoriData, setCategoriData] = useState([]);
  const colors = tokens(theme.palette.mode)
  const handleAdd = (e)=>{
    e.preventDefault();
    navigate("/category/Add")
  }
    //read
    const fetchPost = async () => {
      await getDocs(collection(db, "/categorys"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
              setCategoriData(newData);                
          })
     
  }
  useEffect(()=>{
    fetchPost();
  }, [])

  const columns = [
    {field:"id", headerName:"ID",flex:0.6},
    {field:"name", headerName:"Name",flex:0.5,cellClassName:"name-column-cell"},
    {field:"thumnail", headerName:"Image",flex:1},
    {field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      
      renderCell: (params) => {
          const onClick = (e) => {
            const currentRow = params.row;
            return alert(JSON.stringify(currentRow, null, 4));
          };
          const handleDelete = async (e) =>{
            const currentRow = params.row;
            await deleteDoc(doc(db, "/categorys", currentRow.id));
            fetchPost();
          }
          const handleEdit = () => {
            const currentRow = params.row;           
              navigate(`/category/${currentRow.id}`)
          };
         
          return (
            <Box direction="row" spacing={2} display="flex" gap="5px">
              <Button variant="contained" color="warning" size="small" onClick={handleEdit}>Edit</Button>
              <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
            </Box>
          );
      },
    }
  ]
 


  return (
    <Box m="20px" >
      <Header  title="Category" subtitle="Category Management"/>
      <Box display='flex' justifyContent='flex-end' marginTop="-36px">
        <Button type="submit" color='secondary' variant='contained' onClick={handleAdd}>ADD</Button>
      </Box>
      <Box m="40px 0 0 0" marginTop="5px" height="75vh" sx={{
        "& .MuiDataGrid-root":{
          border:"none"
        },
        "& .MuiDataGrid-cell":{
          borderBottom:"none"
        },
        "& .name-column-cell":{
          color:colors.greenAccent[300]
        },
        "& .MuiDataGrid-columnHeaders":{
          backgroundColor:colors.blueAccent[700],
          borderBottom:"none"
        },
        "& .MuiDataGrid-virtualScroller":{
          backgroundColor:colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer":{
          backgroundColor:colors.blueAccent[700],
          borderTop:"none"
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
          color:`${colors.grey[100]} !important`
        },
      }}>
        <DataGrid rows={categoriData} columns={columns} components={{Toolbar:GridToolbar}}/>
      </Box>
    </Box>
  )
}

export default Category