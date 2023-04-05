import prisma from "../lib/prisma"

export default async (req, res) => {
	const { firstName, lastName, email, password } = req.body

	const result = await prisma.signup.create({
		data: {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}
	})
	res.json(result)
}