import React from 'react'
import Geocode from "react-geocode";


function MyComponent() {
    Geocode.setApiKey("AIzaSyB1KM0R3xVa8P0_VvMQah-F16OFrIYORs8");
    Geocode.fromAddress("ADDRESS").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
      },
      (error) => {
        console.error(error);
      }
    );

  return 
}

export default React.memo(MyComponent)