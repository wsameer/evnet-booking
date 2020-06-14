import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AttendeeNames from "./AttendeeNames";

const BookingForm = props => {
  const {
    bookingEvent,
    bookingMembers,
    bookingDetails,
    handleInputChange,
    handleBookingComplete,
    handleAttendeeNameChange
  } = props;
  const [validated, setValidated] = useState(false);
  const [seatsUpForBooking, setSeatsUpForBooking] = useState();

  /**
   * Handle form submit event
   */
  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidated(true);

    if (form.checkValidity() === false) {
      return event.stopPropagation();
    }
    handleBookingComplete(true);
  };

  useEffect(() => {
    if (bookingEvent.availableSeats > 6) {
      setSeatsUpForBooking(6);
    } else {
      setSeatsUpForBooking(bookingEvent.availableSeats);
    }
  }, [bookingEvent.availableSeats]);

  if (!bookingEvent) {
    return <div>'Waiting....'</div>;
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="bookingFormName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="name"
              type="text"
              required
              pattern="[a-zA-Z\s]+"
              placeholder="John Doe"
              value={bookingDetails.name || ""}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="bookingFormEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="email"
              type="email"
              required
              pattern="[^ @]*@[^ @]*"
              placeholder="johndoe@domain.com"
              value={bookingDetails.email || ""}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="bookingFormContact">
          <Form.Label column sm="2">
            Phone Number
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="contact"
              type="text"
              minLength="10"
              maxLength="10"
              required
              placeholder="Phone number"
              value={bookingDetails.contact || ""}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a contact number.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="bookingFormNumberOfSeats">
          <Form.Label column sm="2">
            Number of Seats
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              name="numOfSeats"
              value={bookingDetails.numOfSeats}
              onChange={handleInputChange}
            >
              {Array(seatsUpForBooking)
                .fill()
                .map((seat, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </Form.Control>
          </Col>
        </Form.Group>

        {bookingDetails.numOfSeats > 1 && (
          <AttendeeNames
            count={bookingDetails.numOfSeats - 1}
            controlName={"bookingFormMembers"}
            values={bookingMembers}
            onChangeHandler={handleAttendeeNameChange}
          />
        )}

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>

        <LinkContainer to="/">
          <Button variant="danger" className="mt-3 ml-3">
            Cancel
          </Button>
        </LinkContainer>
      </Form>

      <hr />
    </>
  );
};

export default BookingForm;
