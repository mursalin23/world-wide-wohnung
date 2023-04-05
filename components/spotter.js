// const inputLatlng = { lat: 52.5, lng: 13.4 };
const houseList = [
  {
    id: 1,
    place: "wuppertal",
    latlng: { lat: 51.256692, lng: 7.149697 },
  },
  {
    id: 2,
    place: "cologne",
    latlng: { lat: 50.936899, lng: 6.960917 },
  },
  {
    id: 3,
    place: "essen",
    latlng: { lat: 51.456051, lng: 7.010471 },
  },
  {
    id: 4,
    place: "wuppertal",
    latlng: { lat: 51.255907, lng: 7.150507 },
  },
  {
    id: 5,
    place: "dortmund",
    latlng: { lat: 51.513414, lng: 7.465631 },
  },
  {
    id: 6,
    place: "dortmund",
    latlng: { lat: 51.513718, lng: 7.464509 },
  },
  {
    id: 7,
    place: "cologne",
    latlng: { lat: 50.93816, lng: 6.958857 },
  },
  {
    id: 8,
    place: "berlin",
    latlng: { lat: 52.51961, lng: 13.403554 },
  },
  {
    id: 9,
    place: "essen",
    latlng: { lat: 51.455947, lng: 7.012842 },
  },
  {
    id: 10,
    place: "berlin",
    latlng: { lat: 52.521049, lng: 13.406402 },
  },
  {
    id: 11,
    place: "test",
    latlng: { lat: 52.451049, lng: 13.406402 },
  },
];

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

export function getSpots(center, radius) {
  const myLat = parseFloat(center.lat);
  const myLng = parseFloat(center.lng);
  const myRadius = parseFloat(radius);

  const myBounds = getBoundsFromLatLng(myLat, myLng, myRadius);
  // console.log(myBounds);

  let houses = [];
  houseList.map((house) => {
    if (
      parseFloat(house.latlng.lat) > parseFloat(myBounds.latMin) &&
      parseFloat(house.latlng.lat) < parseFloat(myBounds.latMax) &&
      parseFloat(house.latlng.lng) > parseFloat(myBounds.lngMin) &&
      parseFloat(house.latlng.lng) < parseFloat(myBounds.lngMax)
    ) {
      houses.push(house);
    }
  });
  // console.log(houses);
  return houses;
}

// console.log(getSpots(inputLatlng, 10000));
