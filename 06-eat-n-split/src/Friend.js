import AddFriend from "./AddFriend";
import Button from "./Button";
import FriendList from "./FriendList";
// import { useState } from "react";

export default function Friend({
  friendItem,
  friendName,
  imageURL,
  addFriendisOpen,
  selectedFriend,
  handleSubmit,
  handleName,
  handleImage,
  handleToggle,
  handleSelect,
}) {
  return (
    <div className="sidebar">
      <ul>
        {friendItem.map((friend) => (
          <FriendList
            friend={friend}
            handleSelect={handleSelect}
            selectedFriend={selectedFriend}
            key={friend.id}
          />
        ))}
      </ul>
      {addFriendisOpen && (
        <AddFriend
          handleSubmit={handleSubmit}
          friendName={friendName}
          imageUrl={imageURL}
          handleName={handleName}
          handleImage={handleImage}
        />
      )}

      <Button handleToggle={handleToggle}>
        {addFriendisOpen ? "Close" : "Add Friend"}
      </Button>
    </div>
  );
}
