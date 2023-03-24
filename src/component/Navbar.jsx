import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo-pokemon.png'

function Nav() {
  return (
    <>
      <Navbar fixed='top' bg="dark">
        <Container>
            <Link to={`/`}>
          <Navbar.Brand >
            <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
              />
          </Navbar.Brand>
            </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;
