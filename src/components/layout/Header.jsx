import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("user"));
    if (users) {
      setLoginUser(users);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Paisa<span className="text-success">Sakyo</span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mx-2">
            <li className="text-white my-1 mx-2">
              <p className="nav-link  ">{loginUser && loginUser.name}</p>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

// complete
export default Header;
