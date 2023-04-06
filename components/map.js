import { useState, useMemo, useCallback, useRef } from "react";
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import MarkerHouse from "./markerHouse";

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
import "@reach/combobox/styles.css";

import { Slider } from "@reach/slider";
import "@reach/slider/styles.css";
import HouseList from "./houseList";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Map = () => {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 51.514244, lng: 7.468429 }), []);

  const [myMove, setMyMove] = useState();
  const [moveRadius, setMoveRadius] = useState(10000);
  const [fetchUrl, setFetchUrl] = useState();
  const [markerFlag, setMarkerFlag] = useState(false);

  const onLoad = useCallback((map) => ((mapRef.current = map), []));

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    console.log({ lat, lng });

    setFetchUrl(
      `/api/locations/search/{"radius":${moveRadius},"lat":${lat},"lng":${lng}}`
    );
    setMarkerFlag(true);
    setMyMove({ lat, lng });

    mapRef.current.panTo({ lat, lng });
  };

  const circleOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#FF0000",
    fillColor: "#FF0000",
  };

//  return (
//    <>
//      <div >
//        <div >
//          <h3>Moving to?</h3>

//          <Combobox onSelect={handleSelect}>
//            <ComboboxInput
//              value={value}
//              onChange={(e) => setValue(e.target.value)}
//              disabled={!ready}
//              // className="combobox-input"
//              placeholder="Location you looking for"
//            />
//            <ComboboxPopover>
//              <ComboboxList>
//                {status === "OK" &&
//                  data.map(({ place_id, description }) => (
//                    <ComboboxOption key={place_id} value={description} />
//                  ))}
//              </ComboboxList>
//            </ComboboxPopover>
//          </Combobox>
//          <div>
//            <h3>Add radius for the search</h3>
//          </div>
//          <Slider
//            min={500}
//            max={50000}
//            step={500}
//            value={moveRadius}
//            onChange={setMoveRadius}
//            defaultValue={moveRadius}
//            className="slider"
//          />
//        </div>
//        <div className="map">
//          <GoogleMap
//            zoom={10}
//            center={center}
//            mapContainerClassName="map-container"
//            // options={options}
//            onLoad={onLoad}
//          >
//            {markerFlag && (
//              <>
//                <MarkerHouse fetchUrl={fetchUrl} />
//                <Marker
//                  position={myMove}
//                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
//                />
//                <Circle
//                  center={myMove}
//                  radius={moveRadius}
//                  options={circleOptions}
//                />
//              </>
//            )}
//          </GoogleMap>
//        </div>
//      </div>
//	  {fetchUrl && <HouseList fetchUrl={fetchUrl} />}
//    </>
//  );
//};

return (
    <Container>
      <Row className="mt-3">
        <Col md={6}>
          <h5>Moving to?</h5>
          <Combobox onSelect={handleSelect}>
            <ComboboxInput className="combobox-input" value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} placeholder="Location you looking for" />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        
        
          <h5>Add radius for the search</h5>
          <Form>
            <Form.Group controlId="formRange">
              <Form.Label>Radius: {moveRadius} meters</Form.Label>
              <Form.Control type="range" min={500} max={50000} step={500} value={moveRadius} onChange={(e) => setMoveRadius(e.target.valueAsNumber)} />
            </Form.Group>
          </Form>
        
		</Col>
      </Row>
      
        <Col>
          <div className="map mt-3">
            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" onLoad={onLoad}>
			{markerFlag && (
			<>
				<MarkerHouse fetchUrl={fetchUrl} />
				<Marker position={myMove} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
				<Circle
				center={myMove}
				radius={moveRadius}
				options={circleOptions}
				/>
			</>
			)}
			</GoogleMap>
		  </div>
		</Col>
		
		{fetchUrl && <HouseList fetchUrl={fetchUrl} />}
    </Container>
	)
}


export default Map;
