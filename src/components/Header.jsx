import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

const Header = ({ token, setToken }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faVideoSlash} />
          StoryTime
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </Nav>

          {token ? (
            <Button
              variant="outline-info"
              className="me-2"
              onClick={() => {
                setToken("");
                localStorage.clear();
                navigate("/");
              }}
            >
              Log out
            </Button>
          ) : (
            <Link to={`/login`}>
              <Button variant="outline-info" className="me-2">
                Login
              </Button>
            </Link>
          )}
          <Link to={`/register`}>
            {token ? null : (
              <Button variant="outline-info" className="me-2">
                Register
              </Button>
            )}
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
