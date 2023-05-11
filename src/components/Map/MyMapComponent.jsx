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
    googleMapsApiKey: "AIzaSyCpj7Wz9DyR1zeANOG59bYNoXQ_6wDrPkA",
    libraries
  })

  if(!isLoaded) return <div>Loading....</div>
  return <Map handlePlaces={handlePlaces} />
}





export default Places;