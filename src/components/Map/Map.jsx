import React, { useMemo, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import { Box } from '@mui/material';
import PlacesAutoComplete from './PlacesAutoComplete';

const Map = ({handlePlaces,setAddressd})=>{
    const center = useMemo(()=>({ lat : 16.047079, lng : 108.206230}),[])
    const [selected,setSelected] = useState("")
    const [maps,setMaps] = useState("")
    const [address,setAddress] = useState("")
    setAddressd(address)
    handlePlaces(selected)
    return (
      <Box display="flex" flexDirection='column' >
        <Box className='places-container' style={{color:"red"}}>
            <PlacesAutoComplete setSelected={setSelected} setMaps={setMaps} setAddress={setAddress}/>
        </Box>
  
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName='map-container'
          mapContainerStyle={{width:"1050px",height:"300px"}}
        >
          {
            maps && <Marker position={maps} />
          }
        </GoogleMap>
      </Box>
    )
  }

export default Map