import Link from "next/link";
import prisma from "../api/lib/prisma";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const ListAllHouses = ({ houses }) => {
	console.log("Houses :", houses);
	return (
		<Container>
			<h1>List of all houses</h1>
			<Row>
				<Col>
					<ListGroup>
						{houses.map((house) => (
							<ListGroup.Item key={house.id}>
								<Link href={`/houses/${house.id}`}>{house.title}</Link>
								<p>{house.city}</p>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

export default ListAllHouses;

export async function getServerSideProps() {
	const houses = await prisma.houses.findMany();

	return {
		props: { houses },
	};
}
