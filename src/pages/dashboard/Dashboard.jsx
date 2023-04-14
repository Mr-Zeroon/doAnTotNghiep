import { Box,useTheme,Button,IconButton,Typography } from '@mui/material'
import React from 'react'
import Header from '../../components/Header/Header'
import {tokens} from "../../theme"
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VNChart from '../../components/Chart/VNChart';
import BarChart from '../../components/Chart/BarChart';
import StartBox from '../../components/StartBox.jsx/StartBox';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
      
        <Box>
          <Button
            sx={{
              backgroundColor:colors.blueAccent[700],
              color:colors.grey[100],
              fontSize:"14px",
              fontWeight:"bold",
              padding:"10px 20px"
            }}
          >
            <DownloadOutlinedIcon sx={{mr:"10px"}} />
            Download Reports
          </Button>
        </Box>
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
            title="55"
            subtitle="User"
            progress="0.75"
            increase="+14%"
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
            title="9"
            subtitle="Shipper"
            progress="0.5"
            increase="+14%"
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
            title="6"
            subtitle="Store"
            progress="0.25"
            increase="+14%"
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
            title="5"
            subtitle="Admin"
            progress="1"
            increase="+14%"
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
              <Box>
                <Typography variant='h5' fontWeight="600" color={colors.grey[100]}>
                  Revenue Generated
                </Typography>
                <Typography variant='h3' fontWeight="600" color={colors.greenAccent[500]}>
                  $59,432,121
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{fontSize:"26px",color:colors.greenAccent[500]}}
                  />
                </IconButton>
              </Box>
            </Box>

            <Box height="250px" ml="-20px">
              {/* <LineChart isDashboard={true}/> */}
            </Box>
          </Box>
          {/* VNChart */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant='h5' fontWeight="600" sx={{ marginBottom: "15px" }}>
                VietNam Based Traffic
            </Typography>
            <Box height="200px">
              <VNChart isDashboard={true} />
            </Box> 
          </Box>
        </Box>
    </Box>
  )
}

export default Dashboard