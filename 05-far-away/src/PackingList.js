import { useState } from "react";
import List from "./List";

export default function PackingList({
  items,
  handleDelete,
  handleToggle,
  handleClear,
}) {
  const [sortBy, setsortBy] = useState("input");

  function handleSelect(event) {
    setsortBy(() => event.target.value);
  }

  let sortedList = [];

  if (sortBy === "input") {
    sortedList = items;
  } else if (sortBy === "description") {
    sortedList = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packing") {
    sortedList = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  }
  return (
    <div className="list">
      {
        <ul>
          {sortedList.map((item) => (
            <List
              singleItem={item}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
              key={item.id}
            />
          ))}
        </ul>
      }

      <div className="actions">
        <select value={sortBy} onChange={handleSelect}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packing">Sort By Packing Status</option>
        </select>
        <button onClick={handleClear}>Clear All Items</button>
      </div>
    </div>
  );
}
