import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    if (id) getCity(id);
  }, [getCity, id]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log("Current city data:", currentCity); // Debugging line

  if (!currentCity) {
    return <div>No city found</div>;
  }

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      <div className={styles.row}>
        <h6>Notes</h6>
        <p>{notes}</p>
      </div>

      <div className={styles.row}>
        <h6>Website</h6>
        <p>
          Visit{" "}
          <a
            href={`https://en.wikipedia.org/wiki/${cityName.replace(
              / /g,
              "_"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cityName} on Wikipedia
          </a>
        </p>
      </div>

      <div>
        <BackButton>&larr;Back</BackButton>
      </div>
    </div>
  );
}

export default City;
