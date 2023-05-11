import React, { useEffect, useMemo, useState } from 'react'
import { Box,useTheme,Button, Typography, TextField, Select, InputLabel, MenuItem, FormControl, useMediaQuery } from '@mui/material';
import { BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment/moment';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { tokens } from '../../../theme';

const Chart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const isNorMobile = useMediaQuery("(min-width:600px)")
  const [revenueData, setRevenueData] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dataTo, setDateTo] = useState('')
  const [data, setData] = useState([])
  const [type, setType] = useState('')
  const handleReadData = async() => {
      await getDocs(collection(db, "/orders"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
              setRevenueData(newData);
          })       
  }

  useEffect(() => {
    handleReadData()
},[])


const computedDataTypeYear = useMemo(() => {
  return revenueData.reduce((prevObj, data)=>{
    const dateStr = data.timePeding;
    const parts = dateStr.split(' ');
    const date = parts[1];
    const time = parts[0];
    const [day, month, year] = date.split('/');
    const [hour, minute] = time.split(':');
    const isoDateStr = `${year}-${month}-${day}T${hour}:${minute}`;

    const Month = new Date(isoDateStr).getMonth() + 1
   
    if(Month === 1) {
      return {
        ...prevObj,
        Thang1: (prevObj.Thang1 || 0) + data.totalPrice
      }
      
    }
    if(Month === 2) {
      return {
        ...prevObj,
        Thang2: (prevObj.Thang2 || 0) + data.totalPrice
      }
    }
    if(Month === 3) {
      return {
        ...prevObj,
        Thang3: (prevObj.Thang3 || 0) + data.totalPrice
      }
    }
    if(Month === 4) {
      return {
        ...prevObj,
        Thang4: (prevObj.Thang4 || 0) + data.totalPrice
      }
    }
    if(Month === 5) {
      return {
        ...prevObj,
        Thang5: (prevObj.Thang5 || 0) + data.totalPrice
      }
    }
    if(Month === 6) {
      return {
        ...prevObj,
        Thang6: (prevObj.Thang6 || 0) + data.totalPrice
      }
    }
    if(Month === 7) {
      return {
        ...prevObj,
        Thang7: (prevObj.Thang7 || 0) + data.totalPrice
      }
    }
    if(Month === 8) {
      return {
        ...prevObj,
        Thang8: (prevObj.Thang8 || 0) + data.totalPrice
      }
    }
    if(Month === 9) {
      return {
        ...prevObj,
        Thang9: (prevObj.Thang9 || 0) + data.totalPrice
      }
    }
    if(Month === 10) {
      return {
        ...prevObj,
        Thang10: (prevObj.Thang10 || 0) + data.totalPrice
      }
    }
    if(Month === 11) {
      return {
        ...prevObj,
        Thang11: (prevObj.Thang11 || 0) + data.totalPrice
      }
    }
    if(Month === 12) {
      return {
        ...prevObj,
        Thang12: (prevObj.Thang12 || 0) + data.totalPrice
      }
    }
  }, {})
}, [revenueData])

const computedDataTypeMonth = useMemo(() => {
    const nowMonth = new Date().getMonth() + 1
    const nowYear = new Date().getFullYear()
    const dailySales = {}
    revenueData.forEach(sale => {
      const dateStr = sale.timePeding;
      const parts = dateStr.split(' ');
      const date = parts[1];
      const [day, month, year] = date.split('/');
      const isoDateStr = `${year}-${month}-${day}`;
      const Month = new Date(isoDateStr).getMonth() + 1
      const Year = new Date(isoDateStr).getFullYear()
      
      if(Month == nowMonth && Year == nowYear) {
      
        if (dailySales[isoDateStr]) {
          dailySales[isoDateStr] += sale.totalPrice;
         
        } 
        else {
          dailySales[isoDateStr] = sale.totalPrice;
          
        }
      }
    });
    return dailySales
}, [revenueData])

const computedBookingTypeToDay = useMemo(() => {
  return revenueData.reduce((prevObj, data) => {
    const now = new Date().getDate()
    const nowMonth = new Date().getMonth() + 1
    const nowYear = new Date().getFullYear()
    const dateStr = data.timePeding;
    const parts = dateStr.split(' ');
    const date = parts[1];
    const [day, month, year] = date.split('/');
    const isoDateStr = `${year}-${month}-${day}`;
    const ngay =  new Date(isoDateStr).getDate();
    const Month = new Date(isoDateStr).getMonth() + 1
    const Year = new Date(isoDateStr).getFullYear()

    if(ngay === now && Month === nowMonth && Year === nowYear) {
      return {
        ...prevObj,
        today: (prevObj.today || 0) + data.totalPrice
      }
    }
    return prevObj
  },{})

}, [revenueData])

const filterRevenueByDate = () => {
  const result = {}
  revenueData.filter(data => {
    const dateStr = data.timePeding;

    const parts = dateStr.split(' ');
 
    const date = parts[1];

    const [day, month, year] = date.split('/');
  
    const isoDateStr = `${year}-${month}-${day}`;
 
    const revenueDataDate = moment(isoDateStr);
   
    return revenueDataDate.isBetween(dateFrom, dataTo, null, []);
  }).forEach(sale => {
    const dateStr = sale.timePeding;
    const parts = dateStr.split(' ');
    const date = parts[1];
    const [day, month, year] = date.split('/');
    const isoDateStr = `${year}-${month}-${day}`;

    const ngay = isoDateStr
    if ( sale.statusOrder==="DONE" && result[ngay]) {
      result[ngay] += sale.totalPrice;
    }
    else {
      result[ngay] = sale.totalPrice;
    }
  })
  const _data = []
  for(let key in result) {
    _data.push({name: key, total: result[key]})
  }   
 setData(_data)
}
useEffect(() => {
  filterRevenueByDate()
 },[dataTo])

  const handleFilterByDate = (filter) => {
    let result = []
    switch(filter){
      case 'today':
        result = [{
          name: 'Hôm nay',
          total: computedBookingTypeToDay?.today
        }]
        break;
      case 'thisMonth':
        for(let key in computedDataTypeMonth) {
          result.push({name: key, total: computedDataTypeMonth[key]})
        }
        break;
      case 'thisYear':
        result = [
          {
            name: 'January',
            total: computedDataTypeYear.Thang1,
          },
          {
            name: 'February',
            total: computedDataTypeYear.Thang2,
          },
          {
            name: 'March',
            total: computedDataTypeYear.Thang3,
          },
          {
            name: 'April',
            total: computedDataTypeYear.Thang4,
          },
          {
            name: 'May',
            total: computedDataTypeYear.Thang5,
          },
          {
            name: 'June',
            total: computedDataTypeYear.Thang6,
          },
          {
            name: 'July',
            total: computedDataTypeYear.Thang7,
          },
          {
            name: 'August',
            total: computedDataTypeYear.Thang8,
          },
          {
            name: 'September',
            total: computedDataTypeYear.Thang9,
          },
          {
            name: 'October',
            total: computedDataTypeYear.Thang10,
          },
          {
            name: 'November',
            total: computedDataTypeYear.Thang11,
          },
          {
            name: 'December',
            total: computedDataTypeYear.Thang12,
          },
        ];
        break;
      default:
        break;
    }
    setData(result)
  }
  
  return (
    <Box display="flex"  marginTop="-10px" flexDirection="column">
      <Box display="flex" marginLeft="30px" marginBottom="20px">
        <form >
          <Box display="flex" marginLeft="20px" marginRight="40px">
            <Box display="flex" marginRight="20px">
                <Typography variant='h5'sx={{color:colors.greenAccent[500]}} marginRight="10px">From Date</Typography>
                <TextField size='small' type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}/>
            </Box>
            <Box display="flex" >
                <Typography variant='h5' sx={{color:colors.greenAccent[500]}} marginRight="10px">To Date</Typography>
                <TextField size='small' type="date" value={dataTo} onChange={(e) => setDateTo(e.target.value)}/>
            </Box>
          </Box>
        </form>
        
        <FormControl  sx={{
          bgcolor: colors.primary[400],
          boxShadow: 1,
          borderRadius: 2,
          minWidth: 100,
          color:colors.greenAccent[400],
        }} >
        <InputLabel sx={{color:colors.greenAccent[400],marginTop:-1}}>Filter By</InputLabel>
          <Select size='small'  className='date-select' value={type} onChange={(e) => handleFilterByDate(e.target.value)}>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="thisMonth">This Month</MenuItem>
              <MenuItem value="thisYear">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ResponsiveContainer width="100%" height={220} >
      <BarChart
          width={600}
          height={220}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total" fill={colors.greenAccent[600]} background={{ fill: colors.grey[100] }}/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default Chart