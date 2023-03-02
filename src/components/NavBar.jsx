import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="text-decoration-none text-reset col-8">
            <h2>ABM</h2>
          </NavLink>
        </Navbar.Brand>
        <Nav className="px-1 d-flex justify-content-between align-items-center col-4">
          <NavLink to="/" className="text-decoration-none text-reset p-1">
            <p>Lista Clientes</p>
          </NavLink>
          <NavLink
            to="/createClient"
            className="text-decoration-none text-reset p-1"
          >
            <p>Crear Cliente</p>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
