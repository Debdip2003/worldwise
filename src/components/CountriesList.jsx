import React from "react";
import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";

const CountriesList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length === 0) {
    return <Message message={"Add your first city by clicking on the map!"} />;
  }

  //checking whether the country already exist in the list or not , if not added then add it to the list
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country))
      return [...acc, { country: city.country, emoji: city.emoji }];
    else return acc;
  }, []);

  return (
    <ul className={styles.countriesList}>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
};

export default CountriesList;
