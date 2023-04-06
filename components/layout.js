//import Header from "./header";
//import Footer from "./footer";
//import Navbar from "./navbar";
//import { Container } from "react-bootstrap";

//const Layout = ({ children }) => {
//  return (
//    <div>
//      {/*<Header />*/}
//      <Navbar />
//	  <Container>
//      	{children}
//	  </Container>
//      {/*<Footer />*/}
//    </div>
//  );
//};

//export default Layout;


import { Container } from 'react-bootstrap';
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
