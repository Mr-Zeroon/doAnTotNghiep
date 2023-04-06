import { Box,useTheme,Button, Typography } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import React from 'react'
import Header from '../../components/Header/Header';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { user } from '../../apis/user';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const User = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const handleAdd = (e)=>{
    e.preventDefault();
    navigate("/user/userAdd")
  }
  const columns = [
    {field:"id", headerName:"id",flex:0.5},
    {field:"fullName", headerName:"Name",flex:1,cellClassName:"name-column-cell"},
    {field:"phoneNumber", headerName:"Phone Number",flex:1},
    {field:"password", headerName:"Password",flex:1},
    {field:"avatar", headerName:"Avatar",flex:1},
    {field:"address", headerName:"Address",flex:1},
    {field:"typeUser", 
    headerName:"Type User",
    flex:1,
    renderCell:({row:{ typeUser }})=>{
      return (
        <Box
          width="90%"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            typeUser==="Admin"
            ?colors.greenAccent[600]
            :colors.greenAccent[700]
            
          }
          borderRadius="4px"
          >
          {typeUser==="Admin" && <AdminPanelSettingsOutlinedIcon/>}
          {typeUser==="Customer" && <PersonIcon/>}
          {typeUser==="Store" && <StoreMallDirectoryIcon/>}
          {typeUser==="Shipper" && <LocalShippingIcon/>}
          <Typography color={colors.grey[100]} sx={{ml:"5px"}}>
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
          const onClick = (e) => {
            const currentRow = params.row;
            return alert(JSON.stringify(currentRow, null, 4));
          };
          
          return (
            <Box direction="row" spacing={2} display="flex" gap="5px">
              <Button variant="contained" color="warning" size="small" onClick={onClick}>Edit</Button>
              <Button variant="contained" color="error" size="small" onClick={onClick}>Delete</Button>
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