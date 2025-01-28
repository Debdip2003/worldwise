import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { toast } from "react-toastify";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        toast.error(`${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, currentCity, isLoading, setCurrentCity, getCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};

export { useCities, CitiesProvider };
