import { useState } from "react";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems([...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClear() {
    const confirm = window.confirm("Are you sure to delete all items?");

    if (confirm) setItems([]);
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <>
      <Logo onAddItems={handleItems} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleClear={handleClear}
      />
      <Stats items={items} />
    </>
  );
}
