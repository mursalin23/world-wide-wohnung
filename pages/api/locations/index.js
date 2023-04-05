import prisma from "../lib/prisma.js";

export default async (req, res) => {
  try {
    const houses = await prisma.houses.findMany({
      where: {
        AND: [
          {
            lat: {
              gt: 52.0,
            },
          },
          {
            lat: {
              lt: 53.0,
            },
          },
          {
            lng: {
              gt: 13.0,
            },
          },
          {
            lng: {
              lt: 13.5,
            },
          },
        ],
      },
    });
    console.log(houses.length);
    res.status(200).json({ houses });
  } catch (err) {
    res.status(500).json({ error: "failed to fetch houses" });
  } finally {
    await prisma.$disconnect();
  }
};
