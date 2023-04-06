//const Footer = () => {
//  return (
//    <>
//      <div>&#169; World Wide Wohnung</div>
//    </>
//  );
//};

//export default Footer;

import { Container } from "react-bootstrap";

const Footer = () => {
	return (
	  <footer className="bg-light text-center">
		<Container>
		  <p>&copy; 2023 World Wide Wohnung</p>
		</Container>
	  </footer>
	);
  };

export default Footer