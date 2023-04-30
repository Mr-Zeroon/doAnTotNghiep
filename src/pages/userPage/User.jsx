import { Box,useTheme,Button, Typography } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { collection, getDocs, doc, deleteDoc, where, query, updateDoc } from "firebase/firestore";
import {db} from '../../firebase'
const User = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const handleAdd = (e)=>{
    e.preventDefault();
    navigate("/user/userAdd")
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
  const columns = [
    {field:"id", headerName:"ID",flex:0.5},
    {field:"fullName", headerName:"Name",flex:0.7,cellClassName:"name-column-cell"},
    {field:"phone", headerName:"Phone Number",flex:0.5},
    {field:"email", headerName:"Email",flex:1},
    {field:"typeUser", 
    headerName:"Type User",
    flex:0.8,
    renderCell:({row:{ typeUser }})=>{
      return (
        <Box
          width="80%"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            typeUser==="ADMIN"
            ?colors.greenAccent[600]
            :colors.greenAccent[700]
            
          }
          borderRadius="4px"
          >
          {typeUser==="ADMIN" && <AdminPanelSettingsOutlinedIcon/>}
          {typeUser==="CUSTOMER" && <PersonIcon/>}
          {typeUser==="STORE" && <StoreMallDirectoryIcon/>}
          {typeUser==="SHIPPER" && <LocalShippingIcon/>}
          <Typography color={colors.grey[100]} sx={{ml:"0px"}}>
            {typeUser}
          </Typography>
        </Box>
      )
    }},
    {field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      
      renderCell: (params) => {
        const currentRow = params.row;
        
          const handleEdit = () => {
            const currentRow = params.row;           
              navigate(`/user/${currentRow.id}`)
          };
          const handleDelete = async (e) =>{
            const currentRow = params.row;                       
              await deleteDoc(doc(db, "/users", currentRow.id));
              fetchPost();
          }

          const handleLock = async (e) =>{         
            if(currentRow.typeUser!=="ADMIN" && currentRow.isDeleted === false){             
               query(collection(db, "/users"), where("id", "==", currentRow.id));
                const user = doc(db, "/users", currentRow.id);
                await updateDoc(user, {
                  id:currentRow.id,
                  fullName:currentRow.fullName,
                  phone:currentRow.phone,
                  passWord:currentRow.passWord,
                  email:currentRow.email,
                  typeUser:currentRow.typeUser,
                  isDeleted:true 
                });
            }
            else if(currentRow.typeUser!=="ADMIN" && currentRow.isDeleted===true){             
               query(collection(db, "/users"), where("id", "==", currentRow.id));
                const user = doc(db, "/users", currentRow.id);
                await updateDoc(user, {
                  id:currentRow.id,
                  fullName:currentRow.fullName,
                  phone:currentRow.phone,
                  passWord:currentRow.passWord,
                  email:currentRow.email,
                  typeUser:currentRow.typeUser,
                  isDeleted:false 
                });
            }
            fetchPost();
          }
          return (
            <Box>
             { 
             (currentRow.typeUser==="ADMIN")
             ?(
              <Box direction="row" spacing={2} display="flex" gap="5px" >
                <Button variant="contained" color="success" size="small" onClick={handleEdit}>Edit</Button>
                <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
              </Box>
             )
             :(<Button variant="contained" color="warning" size="small" onClick={handleLock}>{currentRow.isDeleted===true?"UnLock":"Lock"}</Button>)
             }
            </Box>
          );
          
      },
    }

]
  return (
    <Box m="20px" >
      <Header  title="User" subtitle="User Management"/>
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
        <DataGrid rows={user} columns={columns} components={{Toolbar:GridToolbar}}/>
      </Box>
    </Box>
  )
}

export default User