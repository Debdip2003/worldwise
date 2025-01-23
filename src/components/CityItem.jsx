import React from "react";
import styles from "./CityItem.module.css";
import { ImCross } from "react-icons/im";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { cityName, emoji, date } = city;
  return (
    <div className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>
        <ImCross size={10} />
      </button>
    </div>
  );
};

export default CityItem;
