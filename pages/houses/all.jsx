import Link from "next/link";
import prisma from "../api/lib/prisma";

const ListAllHouses = ({ houses }) => {
	console.log("Houses :", houses)
	return (
		<>
			<h1>List of all houses</h1>
			<ul>
				{houses.map((house) => (
					<li key={house.id}>
						<Link href={`/houses/${house.id}`}>
							{house.title}
						</Link>
						<p>{house.place}</p>
					</li>
				))}
			</ul>

		</>
	);
}

export default ListAllHouses;

export async function getServerSideProps() {
	const houses = await prisma.houses.findMany()

	return {
		props: { houses }
	}
}