import LocationMap from "@/components/locationMap";
import prisma from "../api/lib/prisma";

const House = ({ house }) => {

	console.log(house)
	return (
		<>

			<p>id : {house.id}</p>
			<p>title : {house.title}</p>
			<p>
				<img src={house.imageUrl} />
			</p>
			<p>houseNumber : {house.houseNumber}</p>
			<p>streetName : {house.streetName}</p>
			<p>postalCode : {house.postalCode}</p>
			<p>city : {house.city}</p>
			<p>country : {house.country}</p>
			<p>lat : {house.lat}</p>
			<p>lng : {house.lng}</p>
			<p>owner : {house.owner}</p>
			<p>price : {house.price} euro</p>
			<p>size : {house.size} square meter</p>
			<p>heating : {house.heating ? "yes" : "no"}</p>
			<p>cooling : {house.cooling ? "yes" : "no"}</p>
			<p>rooms : {house.rooms}</p>
			<p>caution : {house.caution}</p>
			<p>near by supermarkt distance : {house.supermarktDistance}m</p>
			<p>near by bus station distance : {house.busStationDistance}m</p>
			<LocationMap lat={house.lat} lng={house.lng} />
			<p>number of residents : {house.maxResident}</p>
			<p>furnished : {house.furnished ? "yes" : "no"}</p>
			<p>parking : {house.parking ? "yes" : "no"}</p>

		</>
	);
}

export default House;

export async function getServerSideProps(context) {
	const id = context.params.id

	const house = await prisma.houses.findUnique({
		where: {
			id: id
		}
	})

	return {
		props: { house }
	}
}