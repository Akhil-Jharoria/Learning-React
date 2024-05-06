import { createContext, useContext, useReducer } from "react";

const Auth = createContext();
const initalState = {
  user: null,
  isAuthentciated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthentciated: true };
    case "logout":
      return { ...state, user: null, isAuthentciated: false };
    default:
      return new Error("unknown action for Authentcation ");
  }
}
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { user, isAuthentciated } = state;

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <Auth.Provider value={{ user, isAuthentciated, login, logout }}>
      {children}
    </Auth.Provider>
  );
}

function useAuth() {
  const context = useContext(Auth);
  if (context === undefined)
    return new Error("Context is used outside the AuthProvider");

  return context;
}
export { AuthProvider, useAuth };
