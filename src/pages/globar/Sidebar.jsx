import React, { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton,Typography,useTheme } from '@mui/material';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
const Item = ({title, to, icon, selected, setSelected}) =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem active={selected === title} style={{color:colors.grey[100]}} onClick={()=> setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to}/>
    </MenuItem>
  )
}

const Sidebars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()
  const [isCollapsed,setIsCollapsed] = useState(false)
  const [selected,setSelected] = useState("Dashboard")
  const currentUser = JSON.parse(localStorage.getItem("admin"))||[]
  
  const handleLogout = ()=>{
    navigate("/login")
    localStorage.setItem("admin",JSON.stringify(null));
    console.log("click");
  }
  return (
    <Box height="670px"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important` 
        },
        "& .pro-icon-wrapper":{
          backgroundColor: "transparent !important"
        },
        "& .pro-inner-item":{
          padding: "5px 35px 5px 20px !important" 
        },
        "& .pro-inner-item:hover":{
          color: "#868dfb !important" 
        },
        "& .pro-inner-item.active": {
          color: "#6870fa !important" 
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and menu icon */}
          <MenuItem 
            onClick={()=> setIsCollapsed(!isCollapsed)}
            icon={isCollapsed? <MenuOutlinedIcon/> : undefined}
            style={{
              margin:"10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed &&(
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant='h3' color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={()=> setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon/>
                </IconButton>
              </Box>
            )}
            {/* User */}
            {!isCollapsed &&(
              <Box mb="25px">
                <Box 
                  display="flex" 
                  marginTop="10px"
                  justifyContent="center"
                  alignItems="center"
                >

                  <img 
                  alt="profile-user" 
                  width="100px" 
                  height="100px" 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU" 
                  style={{cursor:"pointer" , borderRadius:"50%"}}
                  />
                </Box>

                <Box textAlign="center">
                  <Typography 
                    variant="h2" 
                    color={colors.grey[100]} 
                    fontWeight="bold" 
                    sx={{m:" 10px 0 0 0"}}>{currentUser[0]?.fullName}</Typography>
                  <Typography 
                    variant="h5" 
                    color={colors.greenAccent[500]} >{currentUser[0]?.phone}</Typography>
                </Box>
              </Box>
            )
           }
          </MenuItem>
           
           
           
           
           {/* Menu Items */}
           <Box paddingLeft={isCollapsed? undefined: "10%"} >
              <Item 
                title="Dashboard"
                to="/"
                icon={<DashboardIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography>Page</Typography>
              <Item 
                title="User"
                to="user"
                icon={<PersonIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item 
                title="Category"
                to="category"
                icon={<CategoryIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item 
                title="Order"
                to="order"
                icon={<FoodBankIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item 
                title="Order Complete"
                to="orderComplete"
                icon={<DinnerDiningIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item 
                title="Voucher"
                to="voucher"
                icon={<LoyaltyOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography>Function</Typography>
              <MenuItem style={{color:colors.grey[100]}} >
                <Typography onClick={handleLogout} display="flex" gap="15px" ml="5px"><LogoutOutlinedIcon/> Logout</Typography>
              </MenuItem>
           </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebars