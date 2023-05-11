import React from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
      Combobox,
      ComboboxInput,
      ComboboxPopover,
      ComboboxList,
      ComboboxOption,
  } from "@reach/combobox";

const PlacesAutoComplete = ({setSelected,setMaps}) =>{
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleSelect = async (address)=> {
      setValue(address,false);
      clearSuggestions();
      const results = await getGeocode({address});
      const { lat , lng } = await getLatLng(results[0])
      const latLong = lat + ";" + lng
      setSelected(latLong)
      setMaps({ lat , lng })
    }
  
    return (
    <Combobox onSelect={handleSelect} >
      <ComboboxInput 
        value={value} 
        onChange={(e)=>setValue(e.target.value)} 
        disabled={!ready}
        className='combobox-input'
        placeholder='Search in address'
        style={{color:"white",width:"1050px",height:"50px",backgroundColor:"black"}}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && data.map(({place_id,description})=>(
          <ComboboxOption key={place_id} value={description} style={{color:"black",fontFamily:"'Source Sans Pro', sans-serif"}} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    )
  }

export default PlacesAutoComplete