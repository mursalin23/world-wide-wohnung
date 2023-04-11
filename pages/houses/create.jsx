import { useState } from "react";
import Router from "next/router";
import { v4 as uuidv4 } from "uuid"
import axios from "axios";
import { Container, Row, Form, Image, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateHouse = () => {
	const [inputs, setInputs] = useState({})
	const [address, setAddress] = useState({})

	const [imageSrc, setImageSrc] = useState()
	const [uploadData, setUploadData] = useState()

	const [lat, setLat] = useState()
	const [lng, setLng] = useState()

	function handleOnChangeImage(changeEvent) {
		const reader = new FileReader();

		reader.onload = function (onLoadEvent) {
			setImageSrc(onLoadEvent.target.result)
			setUploadData(undefined)
		}

		reader.readAsDataURL(changeEvent.target.files[0])
	}

	async function handleOnSubmitImage(event) {
		event.preventDefault();

		const form = event.currentTarget
		const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')

		const formData = new FormData()

		for (const file of fileInput.files) {
			formData.append('file', file)
		}

		formData.append('upload_preset', 'yvhpeizk')

		const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLIENT_ID}/image/upload`, {
			method: 'POST',
			body: formData
		}).then(r => r.json())

		setImageSrc(data.secure_url)
		setUploadData(data)
	}

	const handleAddressChange = async (event) => {
		const name = event.target.name
		const value = event.target.value
		setAddress(address => ({ ...address, [name]: value }))
		console.log("Address Form Change", address)
	}

	const handleAddressSubmit = async (event) => {
		event.preventDefault()
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address.houseNumber}%20${address.streetName}%20${address.postalCode}%20${address.city}%20${address.country}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
		await axios.get(url)
			.then((res) => {
				//console.log("GeoCodingResponse", res)
				const location = res.data.results[0].geometry.location
				//console.log("GeoCodeLocation:", location);
				setLat(location.lat)
				setLng(location.lng)
				setAddress({ ...address, lat: lat, lng: lng })
				////console.log("Address", address)
				//console.log("Lat", lat)
				//console.log("Lan", lng)
			})
			.catch((err) => {
				console.log(err)
			})
		//console.log("newLocation", locationData)
		//setLat(locationData.lat)
		//setLng(locationData.lng)
		//console.log("Lat", lat)
		//console.log("Lag", lng)
	}

	const handleChange = async (event) => {
		const name = event.target.name
		const value = event.target.value
		setInputs(inputs => ({ ...inputs, [name]: value }))
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		const id = uuidv4()
		const body = { id: id, imageUrl: String(imageSrc), ...address, ...inputs }
		console.log("Create House Form Body:", body)

		try {
			const res = await fetch("/api/houses/create", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
			console.log("Database Response", res)
			if (res.ok) await Router.push(`/houses/${id}`)


		}
		catch (error) {
			console.log("Creating house failed with following error...")
			console.log(error.response.data)
		}
	}

	console.log("Image Source:", imageSrc)
	console.log("Upload Data:", uploadData)

	return (
		//<>
		//	<div className="createHouse">
		//		<h1>Fill up house info</h1>
		//	</div>
		//	<p>Photo of the house</p>
		//	<form method="post" onChange={handleOnChangeImage} onSubmit={handleOnSubmitImage}>
		//		<p>
		//			<input type="file" name="file" />
		//		</p>

		//		<img src={imageSrc} />

		//		{imageSrc && !uploadData && (
		//			<p>
		//				<button>Upload photo</button>
		//			</p>
		//		)}

		//		{/*{uploadData && (
		//			<code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
		//		)}*/}
		//	</form>

		//	<form onSubmit={handleAddressSubmit} action="" method="">
		//		<p>House address</p>
		//		<div>
		//			<label htmlFor="houseNumber">House number:</label>
		//			<input
		//				type="number"
		//				id="houseNumber"
		//				name="houseNumber"
		//				value={address.houseNumber || ""}
		//				onChange={handleAddressChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="streetName">Street name:</label>
		//			<input
		//				type="text"
		//				id="streetName"
		//				name="streetName"
		//				value={address.streetName || ""}
		//				onChange={handleAddressChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="postalCode">Postal code:</label>
		//			<input
		//				type="text"
		//				id="postalCode"
		//				name="postalCode"
		//				value={address.postalCode || ""}
		//				onChange={handleAddressChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="city">City:</label>
		//			<input
		//				type="text"
		//				id="city"
		//				name="city"
		//				value={address.city || ""}
		//				onChange={handleAddressChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="country">Country:</label>
		//			<input
		//				type="text"
		//				id="country"
		//				name="country"
		//				value={address.country || ""}
		//				onChange={handleAddressChange}
		//				required
		//			/>

		//		</div>
		//		<button>Add Address</button>
		//	</form>

		//	<form onSubmit={handleSubmit} action="" method="">
		//		<p>Detail info on the house</p>
		//		<div>
		//			<label htmlFor="title">Title:</label>
		//			<input
		//				type="text"
		//				id="title"
		//				name="title"
		//				value={inputs.title || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="owner">Owner:</label>
		//			<input
		//				type="text"
		//				id="owner"
		//				name="owner"
		//				value={inputs.owner || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="price">Price:</label>
		//			<input
		//				type="number"
		//				id="price"
		//				name="price"
		//				value={inputs.price || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="size">Size:</label>
		//			<input
		//				type="number"
		//				id="size"
		//				name="size"
		//				value={inputs.size || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="rooms">Rooms:</label>
		//			<input
		//				type="number"
		//				id="rooms"
		//				name="rooms"
		//				value={inputs.rooms || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="caution">Caution money:</label>
		//			<input
		//				type="number"
		//				id="caution"
		//				name="caution"
		//				value={inputs.caution || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="supermarktDistance">Near by supermarkt distance:</label>
		//			<input
		//				type="number"
		//				id="supermarktDistance"
		//				name="supermarktDistance"
		//				value={inputs.supermarktDistance || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="busStationDistance">Near by bus station distance:</label>
		//			<input
		//				type="number"
		//				id="busStationDistance"
		//				name="busStationDistance"
		//				value={inputs.busStationDistance || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="maxResident">Number of max resident:</label>
		//			<input
		//				type="number"
		//				id="maxResident"
		//				name="maxResident"
		//				value={inputs.maxResident || ""}
		//				onChange={handleChange}
		//				required
		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="heating">Heating:</label>
		//			<input
		//				type="text"
		//				id="heating"
		//				name="heating"
		//				value={inputs.heating || ""}
		//				onChange={handleChange}

		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="cooling">Cooling:</label>
		//			<input
		//				type="text"
		//				id="cooling"
		//				name="cooling"
		//				value={inputs.cooling || ""}
		//				onChange={handleChange}

		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="furnished">Furnished:</label>
		//			<input
		//				type="text"
		//				id="furnished"
		//				name="furnished"
		//				value={inputs.furnished || ""}
		//				onChange={handleChange}

		//			/>

		//		</div>
		//		<div>
		//			<label htmlFor="parking">Parking:</label>
		//			<input
		//				type="text"
		//				id="parking"
		//				name="parking"
		//				value={inputs.parking || ""}
		//				onChange={handleChange}

		//			/>

		//		</div>

		//		<div>
		//			<button type="submit">Create House</button>
		//		</div>
		//	</form>
		//</>

		<Container>
			<Row>
				<h1>Fill up house info</h1>
				<h5>Photo of the house</h5>
			</Row>
			<Form method="post" onChange={handleOnChangeImage} onSubmit={handleOnSubmitImage}>
				<Form.Group>

					<Form.Control type="file" name="file" />
				</Form.Group>

				<Image src={imageSrc} />




				{imageSrc && !uploadData && (
					<div>
						<Button type="submit" >Upload photo</Button>
					</div>
				)}

				{/*{uploadData && (
				<code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
			)}*/}
				{uploadData && (<p>Please house address</p>)}
			</Form>

			<Form onSubmit={handleAddressSubmit} action="" method="">
				<h5>House address</h5>
				<Form.Group>
					<Form.Label>House number</Form.Label>
					<Form.Control
						type="number"
						id="houseNumber"
						name="houseNumber"
						value={address.houseNumber || ""}
						onChange={handleAddressChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label>Street name</Form.Label>
					<Form.Control
						type="text"
						id="streetName"
						name="streetName"
						value={address.streetName || ""}
						onChange={handleAddressChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label >Postal code</Form.Label>
					<Form.Control
						type="text"
						id="postalCode"
						name="postalCode"
						value={address.postalCode || ""}
						onChange={handleAddressChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label >City</Form.Label>
					<Form.Control
						type="text"
						id="city"
						name="city"
						value={address.city || ""}
						onChange={handleAddressChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label >Country</Form.Label>
					<Form.Control
						type="text"
						id="country"
						name="country"
						value={address.country || ""}
						onChange={handleAddressChange}
						required
					/>

				</Form.Group>
				<Button type="submit">Add Address</Button>
				{lng && (<p>Now provide the following info</p>)}
			</Form>

			<Form onSubmit={handleSubmit} action="" method="">
				<h5>Detail info on the house</h5>
				<Form.Group>
					<Form.Label htmlFor="title">Title</Form.Label>
					<Form.Control
						type="text"
						id="title"
						name="title"
						value={inputs.title || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="owner">Owner</Form.Label>
					<Form.Control
						type="text"
						id="owner"
						name="owner"
						value={inputs.owner || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="price">Price</Form.Label>
					<Form.Control
						type="number"
						id="price"
						name="price"
						value={inputs.price || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="size">Size</Form.Label>
					<Form.Control
						type="number"
						id="size"
						name="size"
						value={inputs.size || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="rooms">Rooms</Form.Label>
					<Form.Control
						type="number"
						id="rooms"
						name="rooms"
						value={inputs.rooms || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="caution">Caution money</Form.Label>
					<Form.Control
						type="number"
						id="caution"
						name="caution"
						value={inputs.caution || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="supermarktDistance">Near by supermarkt distance</Form.Label>
					<Form.Control
						type="number"
						id="supermarktDistance"
						name="supermarktDistance"
						value={inputs.supermarktDistance || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="busStationDistance">Near by bus station distance</Form.Label>
					<Form.Control
						type="number"
						id="busStationDistance"
						name="busStationDistance"
						value={inputs.busStationDistance || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="maxResident">Number of max resident</Form.Label>
					<Form.Control
						type="number"
						id="maxResident"
						name="maxResident"
						value={inputs.maxResident || ""}
						onChange={handleChange}
						required
					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="heating">Heating</Form.Label>
					<Form.Control
						type="text"
						id="heating"
						name="heating"
						value={inputs.heating || ""}
						onChange={handleChange}

					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="cooling">Cooling</Form.Label>
					<Form.Control
						type="text"
						id="cooling"
						name="cooling"
						value={inputs.cooling || ""}
						onChange={handleChange}

					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="furnished">Furnished</Form.Label>
					<Form.Control
						type="text"
						id="furnished"
						name="furnished"
						value={inputs.furnished || ""}
						onChange={handleChange}

					/>

				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="parking">Parking</Form.Label>
					<Form.Control
						type="text"
						id="parking"
						name="parking"
						value={inputs.parking || ""}
						onChange={handleChange}

					/>

				</Form.Group>

				<div>
					<Button type="submit">Create House</Button>
				</div>
			</Form>
		</Container>
	);
};

export default CreateHouse;