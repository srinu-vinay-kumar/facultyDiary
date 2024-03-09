import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlices";
import "../styles/main.scss";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const fullName = userInfo
    ? `${userInfo.firstName} ${userInfo.middleName} ${userInfo.lastName}`
    : ``;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar expand="lg" className="nav-bar" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="nav-text">Faculty Diary</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title="Diary">
                    <NavDropdown.Item href="/diary" className="nav-text">
                      Diary
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/schedule" className="nav-text">
                      Scheduler
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link href="/files" className="nav-text">
                    Files
                  </Nav.Link>

                  <NavDropdown title={fullName} id="username">
                    <NavDropdown.Item href="./home" className="nav-text">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="nav-text"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                ``
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
