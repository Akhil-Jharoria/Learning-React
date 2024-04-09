import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";

const BASE_URL = `http://localhost:8000/`;
function App() {
  const [cites, setcites] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(function () {
    async function getCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        setcites(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsloading(false);
      }
    }
    getCities();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cites={cites} isloading={isLoading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cites={cites} isLoading={isLoading} />}
            />
            <Route path="form" element={<p>Form to fill</p>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
