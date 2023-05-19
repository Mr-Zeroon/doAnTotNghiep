import React, { useState } from 'react'
import {  useLoadScript } from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import Map from './Map';

 const Places = ({handleLatLong}) => {
  const [places,setPlaces] = useState("")
  handleLatLong(places)
  const handlePlaces = (value) =>{
    setPlaces(value)
  }
  const [ libraries ] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCS3zaYT8njnV19W6gDGohy26RM9cg1j-c",
    libraries
  })

  if(!isLoaded) return <div>Loading....</div>
  return <Map handlePlaces={handlePlaces} />
}





export default Places;