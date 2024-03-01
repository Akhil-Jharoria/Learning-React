import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1> Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2> Menu</h2>
      <>
        <p>
          Authentic Italian cuisine. 6 creative dishes to choose from. All from
          our stone oven, all organic, all delicious.
        </p>
        <ul className="pizzas">
          {pizzaData.map((eachpizza) => (
            <Pizza singlepizza={eachpizza} key={eachpizza.name} />
          ))}
        </ul>
      </>
    </main>
  );
}
function Pizza({ singlepizza }) {
  return (
    <li className={`pizza ${singlepizza.soldOut ? "sold-out" : " "} `}>
      <img src={singlepizza.photoName} alt={singlepizza.name} />
      <div>
        <h3>{singlepizza.name}</h3>
        <p>{singlepizza.ingredients}</p>
        <span>{singlepizza.soldOut ? "SOLD OUT" : singlepizza.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  let openHour = 12;
  let closeHour = 22;
  let currentHour = new Date().getHours();
  let isOpen = currentHour > openHour && currentHour < closeHour;
  console.log(isOpen, currentHour);
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>
            We're open unilt {closeHour}:00.So, visit fast or Order online!{" "}
          </p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 And {closeHour}:00
        </p>
      )}
    </footer>
  );
  // return (React.createElement('footer',null,"We're currenrtly Open!"))
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
