import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav id="nav-section">
      <ul>
        <li>
          <Link to="/">My Beer List</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/beer">All Beers</Link>
            </li>
            <li>
              <Link to="/users">All Users</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogOut}>
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
