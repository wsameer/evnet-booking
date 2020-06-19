import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import BusyIndicator from "../components/BusyIndicator";
import SearchEvent from "../components/SearchEvent";
import EventCard from "../components/EventCard";
import MOCKDATA from "../data/data.json";

const Listing = () => {
  /** stores all the events up for booking */
  const [events, setEvents] = useState([]);

  /** stores the search query to fiter out the events */
  const [searchQuery, setSearchQuery] = useState("");

  /** stores the filtered events based on the query */
  const [filteredEvents, setFilteredEvents] = useState([]);

  /** stores the data loading flag */
  const [isLoading, setIsLoading] = useState(false);

  /** stores any errors, and displays them */
  const [error, setError] = useState({ active: false, type: null });

  /**
   * To filter the events based on the search query
   * @param {string} search The search string entered by the user
   */
  const filterData = search => {
    search = search.toLowerCase();
    setFilteredEvents(() =>
      events.filter((event, index) => {
        if (search == null) {
          return event;
        }
        return event.title.toLowerCase().indexOf(search) > -1;
      })
    );
  };

  /**
   * Handles the on change event for search input
   */
  const handleQueryChange = event => {
    setSearchQuery(event.target.value);
    filterData(event.target.value);
  };

  /**
   * To get data from API
   */
  // async function getEventsData() {
  //   const response = await fetch(API_URL, HTTP_HEADERS);
  //   if (response.status === 200) {
  //     response
  //       .json()
  //       .then(res => {
  //         setFilteredEvents(res);
  //         setIsLoading(false);
  //       })
  //       .catch(err => {
  //         setIsLoading(false);
  //         setError({ active: true, type: 400 });
  //       });
  //   } else {
  //     setIsLoading(false);
  //     setError({ active: true, type: response.status });
  //   }
  // }

  /**
   * Called once after the component is mounted
   */
  useEffect(() => {
    setIsLoading(true);
    // ideally would call an API to get the details here
    // getEventsData();

    setTimeout(() => {
      setEvents(MOCKDATA);
      setFilteredEvents(MOCKDATA);
      setIsLoading(false);
    }, 1000);

    return () => {
      // cleanup
    };
  }, []);

  if (error && error.active) {
    return (
      <Col sm={12}>
        <p>{error}</p>
      </Col>
    );
  }

  if (isLoading) {
    return <BusyIndicator />;
  }

  return (
    <Container>
      <Row>
        <Col
          md={{ span: 6, offset: 3 }}
          xs={{ span: 8, offset: 2 }}
          className="text-center mt-4"
        >
          <SearchEvent
            searchQuery={searchQuery}
            handleQueryChange={handleQueryChange}
          />
        </Col>
      </Row>

      <Row>
        {filteredEvents.length === 0 && (
          <Col sm={12} className="text-center mt-5">
            No data found
          </Col>
        )}

        {filteredEvents.length > 0 &&
          filteredEvents.map((event, index) => (
            <Col sm={12} md={4} key={index}>
              <EventCard event={event} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Listing;
