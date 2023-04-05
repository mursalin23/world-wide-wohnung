import prisma from "../api/lib/prisma";

const Seekers = ({ seekers }) => {
	//const returnedSeekers = [...seekers]
	console.log(seekers)
	return (
		<>
			<h1>List of Seekers</h1>
			{seekers.map((seeker) => {
				return (
					<div key={seeker.id}>
						{seeker.name}
					</div>
				)
			})}
		</>
	);
}

export default Seekers;

export async function getServerSideProps() {
	const seekers = await prisma.seekers.findMany()
	return {
		props: { seekers }
	}
}