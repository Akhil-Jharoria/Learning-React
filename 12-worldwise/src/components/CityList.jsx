import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList({ cites, isloading }) {
  if (isloading) return <Spinner />;
  if (!cites.length)
    return <Message message="Add your first city by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {cites.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
