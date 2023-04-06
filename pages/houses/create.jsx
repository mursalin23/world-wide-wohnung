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

		const data = await fetch('https://api.cloudinary.com/v1_1/dxlbetitl/image/upload', {
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
				console.log("GeoCodingResponse", res)
				const location = res.data.results[0].geometry.location
				console.log("GeoCodeLocation:", location);
				setLat(location.lat)
				setLng(location.lng)
				setAddress({ ...address, lat: lat, lng: lng })
				console.log("Address", address)
				console.log("Lat", lat)
				console.log("Lan", lng)
			})
			.catch((err) => {
				console.log(err)
			})
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
		<>
			<Container>
				<Row>
					<h1>Fill up house info</h1>
					<h5>Photo of the house</h5>
				</Row>
				<form method="post" onChange={handleOnChangeImage}>
					<Form.Group>

						<Form.Control type="file" name="file" />
					</Form.Group>

					<Image src={imageSrc} />

					{imageSrc && !uploadData && (
						<p>
							<Button onSubmit={handleOnSubmitImage}>Upload photo</Button>
						</p>
					)}

					{/*{uploadData && (
						<code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
					)}*/}
					{uploadData && (<p>Now provide the following info</p>)}
				</form>

				<form onSubmit={handleAddressSubmit} action="" method="">
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
					<Button>Add Address</Button>
				</form>

				<form onSubmit={handleSubmit} action="" method="">
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
				</form>
			</Container>
		</>
	);
};

export default CreateHouse;