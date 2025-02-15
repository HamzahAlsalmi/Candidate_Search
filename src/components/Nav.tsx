import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
      <ul style={{ listStyle: "none", display: "flex", padding: 0 }}>
        <li style={{ margin: "0 15px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            Home
          </Link>
        </li>
        <li style={{ margin: "0 15px" }}>
          <Link
            to="/saved-candidates"
            style={{ textDecoration: "none", color: "#000" }}
          >
            Saved Candidates
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
