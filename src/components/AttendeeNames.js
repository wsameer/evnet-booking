import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";

const AttendeeNames = props => {
  const { count, controlName, values, onChangeHandler } = props;

  return Array(count)
    .fill()
    .map((member, index) => (
      <Form.Group
        as={Row}
        key={`${controlName}-${index + 2}`}
        controlId={`${controlName}-${index + 2}`}
      >
        <Form.Label column sm="2">
          Name of Attendee #{index + 2}
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={values[index]}
            required
            onChange={e => {
              e.persist();
              onChangeHandler(e, index);
            }}
            placeholder="Enter a name"
          />
          <Form.Control.Feedback type="invalid">
            Please enter the name of Attendee #{index + 2}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    ));
};

AttendeeNames.propTypes = {
  count: PropTypes.number.isRequired,
  controlName: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired
};

export default AttendeeNames;
