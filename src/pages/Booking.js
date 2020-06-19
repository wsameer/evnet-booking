import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BookingForm from "../components/BookingForm";
import EventImage from "../components/EventImage";
import BookingReceipt from "../components/BookingReceipt";

const Booking = props => {
  /** stores the user selected booking event */
  const [bookingEvent, setBookingEvent] = useState();

  /** stores the status of the booking - valid / invalid */
  const [bookingStatus, setBookingStatus] = useState(false);

  /** stores the list of attendees */
  const [bookingMembers, setBookingMembers] = useState([]);

  /** store the details of the booking */
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    contact: "",
    numOfSeats: 1,
    guestNames: ""
  });

  /**
   * Handles the attendee name change event
   * @param {object} event The DOM event object
   * @param {number} index The index of the attendee to be updated
   */
  const handleAttendeeNameChange = (event, index) => {
    let items = [...bookingMembers];
    let item = { ...items[index] };
    item = event.target.value;
    items[index] = item;
    setBookingMembers(items);
    setBookingDetails({
      ...bookingDetails,
      guestNames: items.join(", ")
    });
  };

  /**
   * Handles the input change event for all the from elements but the attendees one
   * @param {object} event The DOM event object
   */
  const handleInputChange = event => {
    const name = event.target.name;
    const value =
      name === "numOfSeats"
        ? parseInt(event.target.value, 10)
        : event.target.value;

    if (name === "numOfSeats") {
      setBookingMembers(Array(value - 1).fill(''));
    }

    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  /**
   * Handle the post form submit things
   * @param {boolean} status The status of the booking
   * (actually it is not required in this case,
   * but in real project it is useful for handling
   * pending stuff like Payments )
   */
  const handleBookingComplete = status => {
    setBookingStatus(true);
  };

  /**
   * Called each time the state object is updated
   */
  useEffect(() => {
    if (props.location.state == null) {
      props.history.push("/");
    } else {
      setBookingEvent(props.location.state);
    }
  }, [props.location.state]);

  return (
    <>
      <Row>
        <Col sm={12} />
      </Row>

      {bookingEvent && (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h3 className="text-center mb-3">{bookingEvent.title}</h3>
          </Col>
          <hr />
          <Col xs={12} sm={4} className="text-center">
            <EventImage
              image={bookingEvent.image}
              height={"200"}
              width={"200"}
            />
          </Col>
          <Col xs={12} sm={8} className="bookingForm">
            {bookingStatus ? (
              <div>
                <h1>Tickets Booked!</h1>
                <BookingReceipt bookingDetails={bookingDetails} />
              </div>
            ) : (
                <BookingForm
                  bookingDetails={bookingDetails}
                  bookingEvent={bookingEvent}
                  bookingMembers={bookingMembers}
                  handleInputChange={handleInputChange}
                  handleBookingComplete={handleBookingComplete}
                  handleAttendeeNameChange={handleAttendeeNameChange}
                />
              )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Booking;
