import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav >
      <div >
        <Link to="/">HomePage</Link>
      </div>
     

      <div>
        <Link to="/ViewList"> View List</Link>
      </div>
      
    </nav>
  );
}

export default NavBar;
