import React from "react";
import "./button.css";

export const Button = ({ onButtonClick }) => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&language=en`
          )
            .then((response) => response.json())
            .then((data) => {
              const loc = data.display_name.split(",");
              onButtonClick({
                value: latitude + " " + longitude,
                label: loc[0] + " " + loc[1],
              });
            });
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
          onButtonClick(null);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      onButtonClick(null);
    }
  };
  return (
    <button onClick={getLocation}>
      Use Current &nbsp;<i className='fa-solid fa-location-arrow'></i>
    </button>
  );
};
