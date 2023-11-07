import React from 'react';
import {Wrapper} from "@googlemaps/react-wrapper"
import MapUi from './MapUi';

function map(props) {



  return (
<Wrapper apiKey={"API KEY"} libraries={"places"}>
  	<MapUi></MapUi>
</Wrapper>
  );
}

export default map;