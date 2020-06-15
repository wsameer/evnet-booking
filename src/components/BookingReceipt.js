import React from "react";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup, Button } from "react-bootstrap";

const BookingReceipt = ({ bookingDetails }) => {
  return (
    <div>
      <p>Booking Details</p>
      <hr />

      <ListGroup>
        <ListGroup.Item>
          <span>Name: {bookingDetails.name}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Email: {bookingDetails.email}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Contact: {bookingDetails.contact}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Number of seats booked: {bookingDetails.numOfSeats}</span>
        </ListGroup.Item>
        {bookingDetails.numOfSeats > 1 &&
          bookingDetails.guestNames.split(",").map((member, index) => (
            <ListGroup.Item key={index}>
              <span>
                Name of Attendee #{index + 2} is {member}
              </span>
            </ListGroup.Item>
          ))}
      </ListGroup>

      <hr />
      <div className="text-center mb-4">
        <LinkContainer to="/">
          <Button variant="primary">Browse more events!</Button>
        </LinkContainer>
      </div>
    </div>
  );
};

BookingReceipt.propTypes = {
  bookingDetails: PropTypes.object.isRequired
};

export default BookingReceipt;
