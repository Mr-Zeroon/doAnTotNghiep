import { Box,useTheme,Button,IconButton,Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import {tokens} from "../../theme"
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StartBox from '../../components/StartBox.jsx/StartBox';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useMemo } from 'react';
import Chart from '../../components/Chart/ChartHome/Chart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Dashboard = () => {
  const theme = useTheme();
  const [user,setUser] = useState([])
  const colors = tokens(theme.palette.mode)
  const [order,setOrder] = useState([])

  const fetchOrder = async () => {  
    await getDocs(collection(db, "/orders"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setOrder(newData);
        }) 
      }

  let tong = 0;
  for(let a of order){
    if(a.statusOrder == "DONE"){
      tong += a.totalPrice
    }
  }
  let giaodich = 0
  for(let a of order){
    if(a.statusOrder == "DONE"){
      giaodich += 1
    }
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
    fetchOrder();
  }, [])
      const handleCountUser = useMemo(() => {
        return user.reduce((a,b) => {
          
          if(b.typeUser === "ADMIN") {
            return {
              ...a,
              admin: (a.admin || 0) + 1
            }
           
          }
          if(b.typeUser === "CUSTOMER") {
            return {
              ...a,
              customer: (a.customer || 0) + 1
            }
            
          }
          if(b.typeUser === "STORE") {
            return {
              ...a,
              store: (a.store || 0) + 1
            }
            
          }
          if(b.typeUser === "SHIPPER") {
            return {
              ...a,
              shipper: (a.shipper || 0) + 1
            }
            
          }
          return {...a}
        }, {})
      },[user])
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
      </Box>
 {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW1 */}
          {/* USER */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StartBox
            title={handleCountUser.customer}
            subtitle="Customer"
            progress="0.75"
            icon={
              <PersonIcon
                sx={{ color:colors.greenAccent[600],fontSize:"26px"}}
              />
            }
          />
        </Box>
          {/* Shipper */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StartBox
            title={handleCountUser.shipper}
            subtitle="Shipper"
            progress="0.5"
            icon={
              <LocalShippingIcon
                sx={{ color:colors.greenAccent[600],fontSize:"26px"}}
              />
            }
          />
        </Box>
            {/* Store */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StartBox
            title={handleCountUser.store}
            subtitle="Store"
            progress="0.25"
            icon={
              <StoreMallDirectoryIcon
                sx={{ color:colors.greenAccent[600],fontSize:"26px"}}
              />
            }
          />
        </Box>
            {/* ADMIN */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StartBox
            title={handleCountUser.admin}
            subtitle="Admin"
            progress="1"
            icon={
              <AdminPanelSettingsOutlinedIcon
                sx={{ color:colors.greenAccent[600],fontSize:"26px"}}
              />
            }         
          />
        </Box>

        {/* ROW2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
            </Box>

            <Box height="250px" ml="-20px">
              <Chart/>
            </Box>
          </Box>
          {/* VNChart */}
          <Box
            gridColumn="span 4"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Box height="200px"  display="flex" flexDirection="center" alignItems="">
              <StartBox
                title={tong}
                subtitle="Total Revenue"
                progress="0.65"
                icon={
                  <PointOfSaleIcon
                    sx={{ color:colors.greenAccent[600],fontSize:"26px",}}
                  />
                }        
              />
            </Box> 
            
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Box height="200px"  display="flex" flexDirection="center" alignItems="">
              <StartBox
                title={giaodich}
                subtitle="Successful transaction"
                progress="0.35"
                icon={
                  <ReceiptIcon
                    sx={{ color:colors.greenAccent[600],fontSize:"26px",}}
                  />
                }        
              />
            </Box> 
          </Box>
        </Box>
    </Box>
  )
}

export default Dashboard