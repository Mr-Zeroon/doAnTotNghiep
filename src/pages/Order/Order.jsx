import { Box,useTheme,Button, Typography } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import { tokens } from '../../theme';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


const Order = () => {
  const [order,setOrder] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const fetchPost = async () => {  
    await getDocs(collection(db, "/orders"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setOrder(newData);
        }) 
      }
  useEffect(()=>{
    fetchPost();
  }, [])
  const columns = [
    {field:"id", headerName:"ID",flex:0.5},
    {field:"idCustomer", headerName:"ID Customer",flex:0.5},
    {field:"address", headerName:"Address",flex:0.7,cellClassName:"name-column-cell"},
    {field:"phone", headerName:"Phone Number",flex:0.5},
    {field:"shipPrice", headerName:"Ship Price",flex:0.5},
    {field:"totalPrice", headerName:"Total Price",flex:0.5},
    {field:"typePayment", headerName:"Type Payment",flex:0.7,    
      renderCell:({row:{ typePayment }})=>{
        return (
          <Box
            width="80%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              typePayment==="CASH"
              ?colors.greenAccent[600]
              :colors.greenAccent[700]
              
            }
            borderRadius="4px"
            >
            {typePayment==="CASH" && <AttachMoneyOutlinedIcon/>}
            {typePayment==="BANKING" && <AccountBalanceOutlinedIcon/>}
            
            <Typography color={colors.grey[100]} sx={{ml:"0px"}}>
              {typePayment}
            </Typography>
          </Box>
        )
      }
    },
    {field:"statusOrder", headerName:"Status Order",flex:0.7,    
      renderCell:({row:{ statusOrder}})=>{
        return (
          <Box
            width="80%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              statusOrder==="PENDING"
              ?colors.greenAccent[600]
              :colors.greenAccent[700]
              
            }
            borderRadius="4px"
            >
            {statusOrder==="PENDING" && <PendingActionsOutlinedIcon/>}
            {statusOrder==="DELIVERING" && <LocalShippingOutlinedIcon/>}
            {statusOrder==="DONE" && <EventAvailableOutlinedIcon/>}
            {statusOrder==="CANCEL" && <CancelOutlinedIcon/>}
            {statusOrder==="CONFIRM" && <ThumbUpAltIcon/>}
            
            <Typography color={colors.grey[100]} sx={{ml:"0px"}}>
              {statusOrder}
            </Typography>
          </Box>
        )
      }
    },
    

]
return (
  <Box m="20px" >
    <Header  title="Order" subtitle="Order Management"/>
    <Box display='flex' justifyContent='flex-end' marginTop="-36px">
      
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
      <DataGrid rows={order} columns={columns} components={{Toolbar:GridToolbar}}/>
    </Box>
  </Box>
)
  
}

export default Order