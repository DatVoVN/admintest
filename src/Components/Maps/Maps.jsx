import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 48.8584, lng: 2.2945 };
const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(true);

  const originRef = useRef();
  const destinationRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    if (results) {
      const newDistance = results.routes[0].legs[0].distance.text;
      const newDuration = results.routes[0].legs[0].duration.text;

      setDirectionsResponse(results);
      setDistance(newDistance);
      setDuration(newDuration);

      const origin = originRef.current.value;
      const destination = destinationRef.current.value;
      const searchInfo = {
        origin,
        destination,
        distance: newDistance,
        duration: newDuration,
      };
      setSearchHistory((prevHistory) => [searchInfo, ...prevHistory]);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setSearchHistory([]);
  }

  if (!isLoaded) {
    return <SkeletonText />;
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw">
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}>
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1">
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="green" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance}</Text>
          <Text>Duration: {duration}</Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
      <Box position="absolute" bottom={0} left={0} w="100%">
        <Box
          p={4}
          bgColor="none"
          shadow="base"
          display={showSearchResults ? "flex" : "none"}
          flexWrap="wrap">
          {searchHistory.map((search, index) => {
            const distanceInNumber = parseFloat(search.distance);
            const price = 0.8 * distanceInNumber;

            return (
              <div
                key={index}
                style={{
                  padding: "0.5em",
                  margin: "0.5em",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f3f3f3",
                  marginRight: "2px",
                  marginBottom: "2px",
                  display: "flex",
                  alignItems: "center", // Căn giữa theo chiều dọc
                  justifyContent: "space-between", // Canh chỉnh các phần tử con
                }}>
                <p>
                  <span style={{ fontWeight: "bold" }}>Origin:</span>{" "}
                  {search.origin} -{" "}
                  <span style={{ fontWeight: "bold" }}>Destination:</span>{" "}
                  {search.destination} -{" "}
                  <span style={{ fontWeight: "bold" }}>Distance:</span>{" "}
                  {search.distance} -{" "}
                  <span style={{ fontWeight: "bold" }}>Duration:</span>{" "}
                  {search.duration} -{" "}
                  <span style={{ fontWeight: "bold" }}>Prices:</span> {price}$
                </p>
              </div>
            );
          })}
        </Box>
        <Button onClick={() => setShowSearchResults(!showSearchResults)}>
          {showSearchResults ? "Hide Results" : "Show Results"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Maps;
