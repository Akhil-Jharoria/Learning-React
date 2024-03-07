export default function List({ singleItem, handleDelete, handleToggle }) {
  return (
    <li>
      <input type="checkbox" onClick={() => handleToggle(singleItem.id)} />
      <span style={singleItem.packed ? { textDecoration: "line-through" } : {}}>
        {singleItem.quantity} {singleItem.description}
      </span>
      <button onClick={() => handleDelete(singleItem.id)}>❌</button>
    </li>
  );
}
