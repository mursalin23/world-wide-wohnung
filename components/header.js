//const Header = () => {
//  return (
//    <>
//      <div>
//        <h1>Welcome to World Wide Wohnung</h1>
//      </div>
//    </>
//  );
//};

//export default Header;

import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
	return (
	  <Navbar bg="light" expand="lg">
		<Container>
		  <Navbar.Brand href="/">World Wide Wohnung</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
			  <Nav.Link href="/houses/create">House</Nav.Link>
			  <Nav.Link href="/houses/all">All</Nav.Link>
			  <NavDropdown title="More" id="basic-nav-dropdown">
				<NavDropdown.Item href="/about">About</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item href="/faq">FAQ</NavDropdown.Item>
			  </NavDropdown>
			</Nav>
		  </Navbar.Collapse>
		</Container>
	  </Navbar>
	);
  };

export default Header
