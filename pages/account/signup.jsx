import { useState } from "react";
import Router from "next/router";

const Signup = () => {
	const [inputs, setInputs] = useState({})

	const handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		setInputs(inputs => ({ ...inputs, [name]: value }))
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const body = { ...inputs }
			console.log(body)
			await fetch("/api/users/signup", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
			await Router.push("/")
		}
		catch (error) {
			console.log("Logging signup fail error...")
			console.log(error.response.data)
		}
	}

	return (
		<>
			<div className="signup">
				<h1>Sign-up here</h1>
			</div>
			<form onSubmit={handleSubmit} action="" method="">
				<div>
					<label htmlFor="firstName">First Name:</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={inputs.firstName || ""}
						onChange={handleChange}
						required
					/>

				</div>
				<div>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={inputs.lastName || ""}
						onChange={handleChange}
						required
					/>

				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={inputs.email || ""}
						onChange={handleChange}
						required
					/>

				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={inputs.password || ""}
						onChange={handleChange}
						required
					/>

				</div>
				<div>
					<button type="submit">Sign-up</button>
				</div>
			</form>
		</>
	);
};

export default Signup;