import prisma from "../lib/prisma";

export default async (req, res) => {
	const { email, password } = req.body

	const result = await prisma.signup.findUnique({
		where: {
			email: email
		}
	})
	res.json(result)
}