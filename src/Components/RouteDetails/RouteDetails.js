import React from "react";
import { Box, Text } from "@chakra-ui/react";

const RouteDetails = ({ distance, duration, origin, destination }) => {
  return (
    <Box p={4} borderRadius="lg" bgColor="white" shadow="base">
      <Text>Khoảng cách: {distance}</Text>
      <Text>Thời gian: {duration}</Text>
      <Text>Xuất phát từ: {origin}</Text>
      <Text>Đến: {destination}</Text>
    </Box>
  );
};

export default RouteDetails;
