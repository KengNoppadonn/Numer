import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import NavDropdown from 'react-bootstrap/NavDropdown';
export const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" sticky="top" expand="md">
            <Container>
                <Navbar.Brand href="#Home">
                    React numer
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Root of Equation" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/Graphical"}>Graphical</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Bisection"}>Bisection</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/FalsePosition"}>FalsePosition</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Onepoint"}>Onepoint Iteration</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/NewtonR"}>NewtonRaphson</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Secant"}>Secant Method</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Linear algebra" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/Cramer"}>Cramer Rule</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Eliminate"}>Gauss elimination</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Cramer"}>MatricsInvertion</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Cramer"}>Jacobi Iteration</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Cramer"}>Gauss Seidel</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Cramer"}>Conjugate Gradient</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Interpolation" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/NewtonD"}>Newton's divided</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Lagrange"}>Lagrange</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Spline"}>Spline</NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown title="Regression" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/LinearREgression"}>Linear Regression</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/PoRegression"}>Polynomial Regression</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/MultiRegression"}>MultiRegression</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Multi"}>Multi</NavDropdown.Item>


                        </NavDropdown>

                        


                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}