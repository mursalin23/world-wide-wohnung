//import Wraped from "@/components/markerHouse";

import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          <h1>World Wide Wohnung: Making Apartment Search Easy</h1>
          <p>
            World Wide Wohnung is a web application that aims to make apartment search easier for people who want to live together or solely for oneself. Whether you're moving to a different country or a different city within the same country, finding a suitable apartment can be challenging, considering various factors such as location, rent, neighbors/flatmates. World Wide Wohnung aims to simplify this process by providing a platform that helps users find apartments based on their preferences.
          </p>
          <p>
            The application was built using Next.js, a full-stack development framework, with Postgres as the database and Prisma.io as the ORM. The database was hosted on Supabase, a cloud service, while Cloudinary was used for image hosting. Google Maps API was utilized for maps, geocode, and marker functionalities.
          </p>
          <p>
            To start using the application, users can enter the location they're planning to move to on the home page, and as they type, the application suggests places. Once the user enters the place name, it is converted to geocode (latitude, longitude) using Google's geocoding API. The user can also put in a search radius. The application then displays results from querying the database and shows them on Google Maps with markers for easy visualization. Results are also listed below the map, and clicking on an individual item leads the user to the detail info page on that house.
          </p>
          <p>
            In addition, users can compare two houses by selecting them and hitting the compare button. This takes the user to another page where the selected houses are compared based on their image, rent, transportation, supermarkets' availability, and so on. A visually pleasing bar plot is generated using Plotly API to help the user choose the perfect house.
          </p>
          <p>
            For people interested in sharing their houses for renting, they can put detailed info about the house along with photos and create a house page.
          </p>
          <p>
            React-Bootstrap was used to style the components for a clean and visually pleasing look.
          </p>
          <p>
            For future work, the application plans to add authentication and authorization for users, update the database schema to a many-to-many relation, and add a review feature, among others.
          </p>
          <p>
            World Wide Wohnung aims to simplify the apartment search process and make it a stress-free experience for its users. Try it out and see how it can help you find your perfect apartment.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
