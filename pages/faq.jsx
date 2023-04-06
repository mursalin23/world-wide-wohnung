import Accordion from 'react-bootstrap/Accordion';

const FAQ = () => {
	return (
		<>
			<h1>Frequently Asked Questions</h1>
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>What is World Wide Wohnung?</Accordion.Header>
					<Accordion.Body>
						World Wide Wohnung is a web application that helps people find apartments when moving to a new place, whether for flat-sharing or solo apartment search.
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>How does World Wide Wohnung work?</Accordion.Header>
					<Accordion.Body>
						Users can enter the location they're planning to move to on the home page, and as they type, the application suggests places. Once the user enters the place name, it is converted to geocode (latitude, longitude) using Google's geocoding API. The user can also put in a search radius. The application then displays results from querying the database and shows them on Google Maps with markers for easy visualization. Results are also listed below the map, and clicking on an individual item leads the user to the detail info page on that house.
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>How do I add my house for renting?</Accordion.Header>
					<Accordion.Body>
						To add your house for renting, you can put detailed info about the house along with photos and create a house page.
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>Can I compare different apartments on World Wide Wohnung?</Accordion.Header>
					<Accordion.Body>
						Yes, you can compare two apartments by selecting them and hitting the compare button. This takes you to another page where the selected apartments are compared based on their image, rent, transportation, supermarkets' availability, and so on. A visually pleasing bar plot is generated using Plotly API to help you choose the perfect apartment.
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	);
}

export default FAQ;