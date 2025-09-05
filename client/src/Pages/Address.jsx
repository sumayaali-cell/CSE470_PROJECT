import { getItemsById } from "@/Api/postApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Address = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDl409IJsG4lVc1XtSxlUZHxKUIKi9pNyw', 
  });

  const fetchData = async () => {
    try {
      const response = await getItemsById(id);
      console.log(response);
      
      setLocation({
        lat: parseFloat(response.data.latitude),
        lng: parseFloat(response.data.longitude),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoaded) return <p>Loading Google Maps...</p>;
  if (!location) return <p>Loading location...</p>;

  return (
    <div className="max-w-full  h-screen">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={location}
        zoom={15}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
};

export default Address;

