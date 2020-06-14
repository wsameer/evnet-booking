import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const SearchEvent = ({ searchQuery, handleQueryChange }) => {
  return (
    <Form.Control
      type="text"
      autoFocus
      value={searchQuery}
      placeholder="Search events"
      autoComplete="off"
      onChange={e => handleQueryChange(e)}
    />
  );
};

SearchEvent.propTypes = {
  searchQuery: PropTypes.string.isRequired
};

export default SearchEvent;
