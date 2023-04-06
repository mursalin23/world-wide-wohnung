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