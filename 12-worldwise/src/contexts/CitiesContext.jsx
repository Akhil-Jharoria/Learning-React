import { createContext, useEffect, useContext, useReducer } from "react";

//   return <CitiesContext.Provider>{children}</CitiesContext.Provider>;

const BASE_URL = `http://localhost:8000/`;
const CitiesContext = createContext();
const initalState = {
  cites: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading/true":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cites: action.payload };
    case "currentcity/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cites: [...state.cites, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cites: state.cites.filter((city) => city.id !== action.payload),
      };
    case "error":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return new Error("Unknown Action");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { cites, isLoading, currentCity } = state;

  useEffect(
    function () {
      async function getCities() {
        try {
          dispatch({ type: "loading/true" });
          const res = await fetch(`${BASE_URL}cities`);
          const data = await res.json();
          dispatch({ type: "cities/loaded", payload: data });
        } catch (err) {
          dispatch({
            type: "error",
            paylaod: "Error is loading Cities for server",
          });
        }
      }
      getCities();
    },
    [dispatch]
  );

  async function getcurrentcity(id) {
    try {
      dispatch({ type: "loading/true" });
      const res = await fetch(`${BASE_URL}cities/${id}`);
      const data = await res.json();
      dispatch({ type: "currentcity/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "error", payload: "Error in loading current city" });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading/true" });
      const res = await fetch(`${BASE_URL}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "error", payload: "Error in loading current city" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading/true" });
      await fetch(`${BASE_URL}cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "error", payload: "Error in loading current city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cites,
        isLoading,
        currentCity,
        getcurrentcity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useData() {
  const data = useContext(CitiesContext);

  if (data === undefined)
    throw new Error("CitesContext are used out side the provider");

  return data;
}
export { CitiesProvider, useData };
