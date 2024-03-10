import Button from "./Button";

export default function SplitBill({
  selectedFriend,
  totalBill,
  yourBill,
  handleTotalBill,
  handleyourBill,
  billPayer,
  handleBillPayer,
  handleSplitSubmit,
}) {
  return (
    <form className="form-split-bill" onSubmit={handleSplitSubmit}>
      <h2>Split A Bill With {selectedFriend.name}</h2>
      <label>💰Bill Value :</label>
      <input type="number" value={totalBill} onChange={handleTotalBill}></input>
      <label>💸Your Expense :</label>
      <input type="number" value={yourBill} onChange={handleyourBill}></input>
      <label>👨🏼‍🤝‍👨🏻{selectedFriend.name}'s Expense :</label>
      <input type="number" disabled value={totalBill - yourBill}></input>
      <label>🤑Who is paying Bill?</label>
      <select value={billPayer} onChange={handleBillPayer}>
        <option value="you">You</option>
        <option value={`${selectedFriend.name}`}>{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
