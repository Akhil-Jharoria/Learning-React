import { useState } from "react";
import Friend from "./Friend";
import SplitBill from "./SplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [selectedFriend, setselectedFriend] = useState(null);
  const [friendItem, setfriendItem] = useState(initialFriends);
  const [addFriendisOpen, setaddFriendisOpen] = useState(false);
  const [friendName, setfriendName] = useState("");
  const [imageURL, setimageURL] = useState("https://i.pravatar.cc/48");
  const [totalBill, settotalBill] = useState("");
  const [yourBill, setyourBill] = useState("");
  const [billPayer, setbillPayer] = useState("you");
  let friendBalance = totalBill - yourBill;

  function handleSubmit(event) {
    event.preventDefault();

    if (!friendName || !imageURL) return;

    let id = crypto.randomUUID();
    const newFriend = {
      id,
      name: friendName,
      image: `${imageURL}?u=${id}`,
      balance: 0,
    };
    setfriendItem((friendItem) => [...friendItem, newFriend]);
    setaddFriendisOpen(false);
    setfriendName("");
    setimageURL("https://i.pravatar.cc/48");
  }

  function handleName(event) {
    setfriendName(event.target.value);
  }

  function handleImage(event) {
    setimageURL(event.target.value);
  }

  function handleToggle() {
    setaddFriendisOpen((e) => !e);
  }

  function handleSelect(friend) {
    setselectedFriend((curr) => (curr?.id === friend?.id ? null : friend));
    setaddFriendisOpen(false);
  }

  function handleTotalBill(event) {
    settotalBill(Number(event.target.value));
  }

  function handleyourBill(event) {
    if (Number(event.target.value) <= totalBill)
      setyourBill(Number(event.target.value));
  }

  function handleBillPayer(event) {
    setbillPayer(event.target.value);
  }

  function handleSplitSubmit(event) {
    event.preventDefault();
    handleUpdate(billPayer);
    setselectedFriend(null);
  }

  function handleUpdate(name) {
    if (name === "you") {
      setfriendItem((friendItem) =>
        friendItem.map((friend) =>
          friend.name === selectedFriend.name
            ? { ...friend, balance: friend.balance + friendBalance }
            : friend
        )
      );
    } else {
      setfriendItem((friendItem) =>
        friendItem.map((friend) =>
          friend.name === name
            ? { ...friend, balance: friend.balance - yourBill }
            : friend
        )
      );
    }
  }
  return (
    <div className="app">
      <Friend
        friendItem={friendItem}
        friendName={friendName}
        imageURL={imageURL}
        selectedFriend={selectedFriend}
        addFriendisOpen={addFriendisOpen}
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleImage={handleImage}
        handleToggle={handleToggle}
        handleSelect={handleSelect}
      />
      {selectedFriend && (
        <SplitBill
          selectedFriend={selectedFriend}
          totalBill={totalBill}
          yourBill={yourBill}
          billPayer={billPayer}
          handleBillPayer={handleBillPayer}
          handleTotalBill={handleTotalBill}
          handleyourBill={handleyourBill}
          handleSplitSubmit={handleSplitSubmit}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
