import { useState } from "react";
import Button from "./Button";

export default function Box({ children }) {
  const [isOpen, setisOpen] = useState(true);

  function handleOpen() {
    setisOpen((e) => !e);
  }
  return (
    <div className="box">
      <Button onClick={handleOpen}>{isOpen ? "-" : "+"}</Button>
      {isOpen && children}
    </div>
  );
}
