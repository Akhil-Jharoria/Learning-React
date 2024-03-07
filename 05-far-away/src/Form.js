import { useState } from "react";

const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (description === "") return;

    const newItem = {
      id: Date.now(),
      quantity: quantity,
      description: description,
    };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }
  function handleChange(event) {
    setDescription(event.target.value);
  }
  function handleQuantity(event) {
    setQuantity(Number(event.target.value));
  }
  return (
    <div className="add-form">
      <h3>What you want to Pack for your😍 trip?</h3>
      <form name="itemsToPack" onSubmit={handleSubmit}>
        <input
          name="item"
          type="text"
          placeholder="Enter Items"
          value={description}
          onChange={handleChange}
        ></input>
        <select value={quantity} onChange={handleQuantity}>
          {numbers.map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
            // <Number nums={num} key={num} />
          ))}
        </select>
        <button>ADD</button>
      </form>
    </div>
  );
}
