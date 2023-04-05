import { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";

function MarkerHouse({ fetchUrl }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          const { houses } = result;
          setIsLoaded(true);
          setHouses(houses);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {houses?.map((house) => (
          <Marker
            key={house.id}
            position={{ lat: house?.lat, lng: house?.lng }}
          />
        ))}
      </>
    );
  }
}

export default MarkerHouse;

// import { QueryClient, QueryClientProvider, useQuery } from "react-query";
// import { Marker } from "@react-google-maps/api";

// const queryClient = new QueryClient();

// const fetchHouses = async (fetchUrl) => {
//   const res = await fetch(fetchUrl);

//   return await res.json();
// };

// const MarkerHouse = ({ fetchUrl }) => {
//   const { data, status } = useQuery("housesKey", fetchHouses);
//   const { houses } = data || {};

//   return (
//     <>
//       {
//         <div>
//           {houses?.map((house) => (
//             <>
//               {/* <Marker
//                 key={house?.id}
//                 position={{ lat: house?.lat, lng: house?.lng }}
//               /> */}
//               {console.log(fetchUrl)}
//             </>
//           ))}
//         </div>
//       }
//     </>
//   );
// };

// export default function Wraped() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <MarkerHouse />
//     </QueryClientProvider>
//   );
// }
