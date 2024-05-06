import styles from "./Form.module.css";
//css for the data picker
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useURLPosition } from "../hooks/useURLPosition";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";

import { useData } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + (char.charCodeAt(0) % 32))
    .map((n) => String.fromCodePoint(n))
    .join("");

  return codePoints;
}

const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
  //custom hooks
  const { createCity, isLoading } = useData();
  const [lat, lng] = useURLPosition();
  //react hooks
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isloadingcoding, setisloadingcoding] = useState(false);
  const [laodingError, setloadingError] = useState("");
  const [emoji, setemoji] = useState("");
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getcitydata() {
        if (!lat && !lng) return;
        try {
          setisloadingcoding(true);
          setloadingError("");
          const response = await fetch(
            `${URL}latitude=${lat}&longitude=${lng}`
          );
          const data = await response.json();

          if (!data.countryCode)
            throw new Error(
              "Seem this is not a City.Click somewhere else to correct city😊"
            );
          setCityName(data.city || data.locality);
          setCountry(data.countryName);
          setemoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setloadingError(err.message);
        } finally {
          setisloadingcoding(false);
        }
      }

      getcitydata();
    },
    [lat, lng]
  );

  async function handleSubmit(event) {
    event.preventDefault();

    if (!cityName || !country) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isloadingcoding) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by Clicking on the Map" />;
  if (laodingError) return <Message message={laodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
         
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
