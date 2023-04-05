import { useState } from "react";
import Router from "next/router";

const Login = () => {
	const [inputs, setInputs] = useState({})

	const handleChange = event => {
		const name = event.target.name
		const value = event.target.value
		setInputs(inputs => ({ ...inputs, [name]: value }))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const body = { ...inputs }
			const response = await fetch("/api/users/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			})
			console.log(response.json())
			await Router.push("/")
		}
		catch (error) {
			console.log("login failed with following error...")
			console.log(error?.response?.data)
		}
	}

	const handleSingup = event => {
		Router.push("/account/signup")
	}

	return (
		<>
			<div className="login">
				<h1>Login to your W3 account</h1>
			</div>
			<form onSubmit={handleSubmit} action="">
				<div>
					<label htmlFor="email">Email: </label>
					<input
						type="email"
						name="email"
						id="email"
						value={inputs.email || ""}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">password: </label>
					<input
						type="password"
						name="password"
						id="password"
						value={inputs.password || ""}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<button type="submit" >Login</button>
				</div>
			</form>
			<div>
				<p>Not a user yet? Sign up here</p>
				<button onClick={handleSingup} >Sign-up</button>
			</div>
		</>
	);
}

export default Login;

















































//import { useState } from "react";
//import axios from "axios";


//const Login = () => {
//	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=140%20Einern%2042279%20Wuppertal%20Germany&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
//	const [lat, setLat] = useState();
//	const [lng, setLng] = useState();
//	axios.get(url)
//		.then((res) => {
//			//console.log(res)
//			const location = res.data.results[0].geometry.location;
//			console.log(location);
//			setLat(location.lat);
//			setLng(location.lng);

//		})
//		.catch((err) => {
//			console.log(err)
//		})
//	console.log(lat)
//	console.log(lat)


//	return (
//		<>
//			<h3>Get lat-lng from Geocoding API</h3>
//			<p>Latitude: {lat}</p>
//			<p>Longitude: {lng}</p>
//		</>
//	);


//}

//export default Login;





//const [error, setError] = useState(null);
//	const [isLoaded, setIsLoaded] = useState(false);
//	const [lat, setLat] = useState(null);
//	const [lng, setLng] = useState(null);
//	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=140%20Einern%2042279%20Wuppertal%20Germany&key=AIzaSyBrabdGxWWrEejtSVHgGw3qj_sh4QFEbQI`;

//	useEffect(() => {
//		fetch(url)
//			.then((res) => res.json())
//			.then(
//				(data) => {
//					const { dataLat, dataLng } = data?.results[0]?.geometry?.location;
//					setIsLoaded(true);
//					setLat(dataLat);
//					setLng(dataLng);
//				},

//				(error) => {
//					setIsLoaded(true);
//					setError(error);
//				}
//			);
//	}, []);

//	if (error) {
//		return <div>Error: {error.message}</div>;
//	} else if (!isLoaded) {
//		return <div>Loading...</div>;
//	} else {
//		return (
//			<>
//				<h3>Get lat-lng from Geocoding API</h3>
//				<p>{lat}</p>
//				<p>{lng}</p>
//			</>
//		);
//	}