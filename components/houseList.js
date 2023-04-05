import Compare from "@/pages/compare";
import { useState, useEffect } from "react";


const HouseList = ({ fetchUrl }) => {

	const [error, setError] = useState(null);
  	const [isLoaded, setIsLoaded] = useState(false);
  	const [houses, setHouses] = useState([]);

	const [compareList, setCompareList] = useState([])
	

	useEffect(() => {
		fetch(fetchUrl)
		.then((res) => res.json())
		.then(
			(result) => {
			const { houses } = result;
			setIsLoaded(true);
			setHouses(houses);
			},

			(error) => {
			setIsLoaded(true);
			setError(error);
			}
		);
	}, []);

	console.log(compareList)

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<h1>Houses near your search location</h1>
				<table>
					<tbody>
						{houses.map((house) => (
							<tr key={house.id}>
								<td>
									<a target="_blank" href={`/houses/${house.id}`} rel="noopener noreferrer">
										{house.title}
									</a>
								</td>
								<td>
									<button onClick={() => setCompareList([...compareList, house.id])} >select to compare</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				
				{compareList.length > 1 && <><button onClick={()=> window.open(`/compare?id1=${compareList[0]}&id2=${compareList[1]}", "_blank`)} >Compare</button></>}
			</>
		);
	}
}

export default HouseList;