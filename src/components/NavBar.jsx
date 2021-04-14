import React from "react";

function NavBar({ totalCounters }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <a href="" className="nvbar-brand">
        Navbar
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
}

export default NavBar;
