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
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/beer/new">New Beer</Link>
            </li>
            <li>
              <Link to="/beer">Beers</Link>
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
