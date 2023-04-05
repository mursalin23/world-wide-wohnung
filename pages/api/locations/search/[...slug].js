import prisma from "../../lib/prisma";

function getBoundsFromLatLng(lat, lng, radiusInMeter) {
  let latChange = radiusInMeter / 111200.0;
  let lngChange = Math.abs(Math.cos(lat * (Math.PI / 180)));

  let bounds = {
    latMin: lat - latChange,
    lngMin: lng - lngChange,
    latMax: lat + latChange,
    lngMax: lng + lngChange,
  };
  return bounds;
}

export default async (req, res) => {
  const { slug } = req.query;
  const data = JSON.parse(slug[0]);

  // console.log(data);

  const radius = parseFloat(data["radius"]);
  const lat = parseFloat(data["lat"]);
  const lng = parseFloat(data["lng"]);
  // console.log(radius);
  // console.log(lat);
  // console.log(lng);

  const searchBounds = getBoundsFromLatLng(lat, lng, radius);

  // console.log(searchBounds);

  try {
    const houses = await prisma.houses.findMany({
      where: {
        AND: [
          {
            lat: {
              gt: searchBounds.latMin,
            },
          },
          {
            lat: {
              lt: searchBounds.latMax,
            },
          },
          {
            lng: {
              gt: searchBounds.lngMin,
            },
          },
          {
            lng: {
              lt: searchBounds.lngMax,
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
