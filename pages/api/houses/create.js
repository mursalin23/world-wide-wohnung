import prisma from "../lib/prisma"

export default async (req, res) => {
	const { id, imageUrl, title, houseNumber, streetName, postalCode, city, country, lat, lng, owner, price, size, heating, cooling, rooms, caution, supermarktDistance, busStationDistance, maxResident, furnished, parking} = req.body

	const result = await prisma.houses.create({
		data: {
			id: id,
			imageUrl: imageUrl,
			title: title,
			houseNumber: parseInt(houseNumber),
			streetName: streetName,
			postalCode: parseInt(postalCode),
			city: city, 
			country: country,
			lat: parseFloat(lat), 
			lng: parseFloat(lng), 
			owner: owner, 
			price: parseFloat(price), 
			size: parseFloat(size), 
			heating: (heating === "true"), 
			cooling: (cooling === "true"), 
			rooms: parseInt(rooms), 
			caution: parseFloat(caution), 
			supermarktDistance: parseFloat(supermarktDistance), 
			busStationDistance: parseFloat(busStationDistance), 
			maxResident: parseInt(maxResident), 
			furnished: (furnished === "true"), 
			parking: (parking === "true")
		}
	})
	await res.json(result)
}