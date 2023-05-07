// const MyMapComponent = withScriptjs(
//     withGoogleMap(props => (
//       <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: props.lat, lng: props.lng }}
//         onClick={e => console.log(e)}
//       >
//         {props.isMarkerShown && (
//           <Marker position={{ lat: props.lat, lng: props.lng }} />
//         )}
//         <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
//           {props.markers.map(marker => (
//             <CustomMarker
//               key={marker.id}
//               marker={marker}
  
//             />
//           ))}
//         </MarkerClusterer>
//       </GoogleMap>
//     ))
//   );
//   export default MyMapComponent;