import React from "react";
import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>
          <Logo />
        </li>

        <li>
          <NavLink
            to="/product"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pricing"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${styles.ctaLink} ${isActive ? styles.active : ""}`
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `${styles.ctaLink} ${isActive ? styles.active : ""}`
            }
          >
            Signup
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
