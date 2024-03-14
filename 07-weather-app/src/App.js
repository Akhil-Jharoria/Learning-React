import InputFrom from "./InputForm";
import WeatherData from "./WeatherData";

export default function App() {
  return (
    <div className="weather-main-div">
      <h1>My Own Weather App</h1>
      <InputFrom />
      <WeatherData />
    </div>
  );
}
