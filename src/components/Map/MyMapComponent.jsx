import React, { useState } from 'react'
import {  useLoadScript } from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import Map from './Map';

 const Places = ({handleLatLong,setAddress}) => {
  const [place,setPlace] = useState("")
  const [addressd,setAddressd] = useState("")

  handleLatLong(place)
  const handlePlaces = (value) =>{
    setPlace(value)
  }
  setAddress(addressd)
  const [ libraries ] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAyRvcVrm7Y4RQ0vMje5WQA0JGy4L1TEMM",
    libraries
  })

  if(!isLoaded) return <div>Loading....</div>
  return <Map handlePlaces={handlePlaces} setAddressd={setAddressd}/>
}

export default Places;