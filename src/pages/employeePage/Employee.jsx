import { Box,useTheme,Button } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import { tokens } from '../../theme';
import { database } from '../../firebase'
import { getDatabase, onValue, ref, set, remove, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
const Employee = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [employeeData, setEmployeeData] = useState([])
  //read
  const handleReadData = () => {
    onValue(ref(database, '/AccountEmployee'), (snapshot) => {
        setEmployeeData([])
        const data = snapshot.val();
        if(data !==null){
          Object.values(data).map((employee,index) => {
            employee.id = index + 1
            setEmployeeData(
              (prev) => [...prev, employee])
          })
        }
    })
}

useEffect(() => {
    handleReadData()
},[])

const handleAdd = (e)=>{
  e.preventDefault();
  navigate("/employee/Add")
}
const columns = [
    {field:"id", headerName:"STT",flex:0.5},
    {field:"id_staff", headerName:"ID",flex:1},
    {field:"fullName_staff", headerName:"Name",flex:1,cellClassName:"name-column-cell"},
    {field:"phoneNumber", headerName:"Phone Number",flex:1},
    {field:"password", headerName:"Password",flex:1},
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
      <Header  title="Employee" subtitle="Manage admin information"/>
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
        <DataGrid rows={employeeData} columns={columns} components={{Toolbar:GridToolbar}}/>
      </Box>
    </Box>
  )
}

export default Employee