// import { useState } from "react";
import Button from "./Button";
export default function AddFriend({
  handleSubmit,
  friendName,
  handleName,
  imageUrl,
  handleImage,
}) {
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨🏼‍🤝‍👨🏻Friend Name:</label>
      <input type="text" value={friendName} onChange={handleName}></input>
      <label> 💋Image URL :</label>
      <input type="text" value={imageUrl} onChange={handleImage}></input>
      <Button>Add</Button>
    </form>
  );
}
