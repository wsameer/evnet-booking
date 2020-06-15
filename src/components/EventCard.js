import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Card, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import EventImage from "./EventImage";

const EventCard = ({ event }) => {
  return (
    <Card className="event-card">
      <Card.Body>
        <Card.Title className="text-center mb-3">{event.title}</Card.Title>

        <Row>
          <Col xs={6}>
            <EventImage image={event.image} />
          </Col>

          <Col xs={6}>
            <Card.Text>{event.eventDate}</Card.Text>
            <Card.Text>Available Seats: {event.availableSeats}</Card.Text>
            {event.availableSeats === 0 ? (
              <Badge variant="secondary">Sold Out</Badge>
            ) : (
              <LinkContainer
                to={{
                  pathname: "/booking",
                  state: event
                }}
              >
                <Button>Book</Button>
              </LinkContainer>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

Error.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventCard;
