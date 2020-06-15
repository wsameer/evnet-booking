import React from "react";
import PropTypes from "prop-types";

const EventImage = ({ image, height, width }) => {
  return (
    <>
      <img
        className="event-image"
        src={image}
        alt=""
        height={height}
        width={width}
      />
    </>
  );
};

EventImage.defaultProps = {
  height: "100%",
  width: "100%"
};

EventImage.propTypes = {
  image: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string
};

export default EventImage;
