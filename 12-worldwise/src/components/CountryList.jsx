import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useData } from "../contexts/CitiesContext";

function CountryList() {
  const { cites, isLoading } = useData();
  if (isLoading) return <Spinner />;

  if (!cites.length)
    return <Message message="Add your first city by clicking on the map" />;

  const countries = cites.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
