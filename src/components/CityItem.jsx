import React from "react";
import styles from "./CityItem.module.css";
import { ImCross } from "react-icons/im";
import { Link } from "react-router";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity } = useCities();
  const { cityName, emoji, date, position, id } = city;
  const isActive = currentCity && currentCity.id && id === currentCity.id;

  return (
    <Link
      className={`${styles.cityItem} ${
        isActive ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`} //query string
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>
        <ImCross size={10} />
      </button>
    </Link>
  );
};

export default CityItem;
