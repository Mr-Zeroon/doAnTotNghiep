import { Box,useTheme,Button } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, where, query, updateDoc } from "firebase/firestore";
import {db} from '../../firebase'
import { toast } from 'react-toastify';
const VoucherPage = () => {
  const navigate = useNavigate();
  const [voucher,setVoucher] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const handleAdd = (e)=>{
    e.preventDefault();
    navigate("/voucher/voucherAdd")
  }
  const fetchPost = async () => {  
    await getDocs(collection(db, "/vouchers"))
    
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => 
                ({...doc.data(), id:doc.id })
                );
            setVoucher(newData);
        }) 
      }
  useEffect(()=>{
    fetchPost();
  }, [])
  const voucherAdmin = voucher.filter(v=>v.typeVoucher == "ADMIN")
  const columns = [
    {field:"id", headerName:"ID",flex:0.5},
    {field:"name", headerName:"Name",flex:0.7,cellClassName:"name-column-cell"},
    {field:"code", headerName:"Code",flex:1},
    {field:"endDate", headerName:"End Date",flex:1},
    {field:"discountMoney", headerName:"Discount Money",flex:1},
    {field:"minOrderPrice", headerName:"Min Order Price",flex:1},
    {field:"limitMax", headerName:"Limit Max",flex:0.8},
    {field:"image", headerName:"Image",flex:0.5 ,renderCell: (params) => <img src={params.value} style={{height:"35px",width:"110px"}}/>},
    {field: 'action',
      headerName: 'Action',
      flex:2,
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      
      renderCell: (params) => {
        const currentRow = params.row;
        const handleShow = async (e) =>{         
          if( currentRow.isShow === false){             
             query(collection(db, "/vouchers"), where("id", "==", currentRow.id));
              const user = doc(db, "/vouchers", currentRow.id);
              await updateDoc(user, {
                isShow:true 
              });
              toast.success("Open Show Voucher Success");
          }
          else if(currentRow.isShow===true){             
             query(collection(db, "/vouchers"), where("id", "==", currentRow.id));
              const user = doc(db, "/vouchers", currentRow.id);
              await updateDoc(user, {
                isShow:false 
              });
              toast.success("Lock Show Voucher Success");
          }
          fetchPost();
        }
          const handleEdit = () => {
            const currentRow = params.row;           
              navigate(`/voucher/${currentRow.id}`)
          };
          const handleDelete = async (e) =>{
            const currentRow = params.row;                       
            if( currentRow.isDeleted === false){             
              query(collection(db, "/vouchers"), where("id", "==", currentRow.id));
               const user = doc(db, "/vouchers", currentRow.id);
               await updateDoc(user, {
                 isShow:false,
                 isDeleted:true 
               });
               toast.success("Delete Voucher Success");
           }
              fetchPost();
          }
          return (
            <Box>
             { currentRow.isDeleted===true?"":
              <Box direction="row" spacing={2} display="flex" gap="5px" >
                <Button variant="contained" color="success" size="small" onClick={handleShow}>{currentRow.isShow===true?"Not Show":"Show"}</Button>
                <Button variant="contained" color="success" size="small" onClick={handleEdit}>Edit</Button>
                <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
              </Box>
             }
            </Box>
          );
          
      },
    }

]
  return (
    <Box m="20px" >
      <Header  title="Voucher" subtitle="Voucher Management"/>
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
        <DataGrid rows={voucherAdmin} columns={columns} components={{Toolbar:GridToolbar}}/>
      </Box>
    </Box>
  )
}

export default VoucherPage