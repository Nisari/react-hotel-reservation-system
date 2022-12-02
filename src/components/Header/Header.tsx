import React, { useEffect, useState } from "react";

import { Button } from "components";
import { clearStoredValues } from "lib/scripts/utils";

import styleClasses from "./Header.module.scss";
import Modal from "react-bootstrap/Modal";
import { default as Button1 } from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { PersonCircle } from "react-bootstrap-icons";

type TypeHeader = {
  activeStep?: number;
  stepChangeHandler: (
    stepIndex: number,
    formState: TypeFormState,
    targetStep: number
  ) => void;
};
const Header: React.FC<TypeHeader> = (props: TypeHeader) => {
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setLogin();
    window.addEventListener("storage", () => {
      setLogin();
    });
  }, []);

  useEffect(() => {
    console.log("isloggedin", isLoggedIn);
  }, [isLoggedIn]);

  const setLogin = () => {
    const userName = localStorage.getItem("username");
    console.log(userName, !!userName);
    setLoggedIn(!!userName);
  };

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    setUserName("");
    setPassword("");
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setShow(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.setItem("username", "");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <header className={styleClasses["header"]}>
        <div className={styleClasses["header__logo"]}>
          <span className={styleClasses["header__logo__title"]}>
            Awesome Hotel
          </span>
          <span className={styleClasses["header__logo__slogan"]}>
            Reservation System
          </span>
        </div>
        <div className={`${styleClasses["header__actions"]} header-actions`}>
          {props.activeStep !== 0 && (
            <Button
              type="button"
              onClick={() => {
                props.stepChangeHandler(0, { isValid: false, inputs: {} }, 0);
                clearStoredValues();
              }}
            >
              Make a new reservation
            </Button>
          )}

          {!isLoggedIn && (
            <Button type="button" onClick={handleShow}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <>
              <Navbar
                variant="dark"
                className="user-header"
                bg="dark"
                expand="lg"
              >
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                  <Nav>
                    <PersonCircle
                      size={16}
                      className="user-icon"
                    ></PersonCircle>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={localStorage.getItem("username")}
                      menuVariant="dark"
                    >
                      <NavDropdown.Item onClick={(e) => handleLogout(e)}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </>
          )}
        </div>
      </header>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="form-modal"
        className="form-modal"
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUserName(e?.target?.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e?.target?.value)}
            />
          </Form.Group>

          <Button1
            variant="primary"
            type="submit"
            onClick={(e) => handleLogin(e)}
            disabled={!(username && password)}
          >
            Log In
          </Button1>

          <Button1
            variant="secondary"
            className="login-cancel-btn"
            type="button"
            onClick={handleClose}
          >
            Close
          </Button1>
        </Form>
      </Modal>
    </>
  );
};

export default Header;
